import {SessionSocket} from "../server";
import redisClient from "../redis";

export const initializeUser = async (socket: SessionSocket) => {
    console.log("User connected to messaging");
    socket.join(socket.user.chatId);
    await redisClient.hset(`chatid:${socket.user.email}`, "userid", socket.user.chatId, "connected", "true");
    const conversations = await redisClient.lrange(`conversation:${socket.user.email}`, 0, -1);
    const otherConversationRooms = await parseConversations(conversations)
    const otherConversationRoomIds = otherConversationRooms.map(conversation => {
        return conversation.chatId
    });
    otherConversationRoomIds.length > 0 && socket.to(otherConversationRoomIds).emit("connected", true, socket.user.email);
    socket.emit("conversations", otherConversationRooms);
    const messagesQuery = await redisClient.lrange(`chat:${socket.user.chatId}`, 0, -1);
    const messages = messagesQuery.map((message) => {
        const parsedString = message.split("/")
        return {to: parsedString[0], from: parsedString[1], message: parsedString[2]}
    })
    if (messages && messages.length > 0) {
        socket.emit("initializeMessages", messages);
    }

}

export const onDisconnect = async (socket: SessionSocket) => {
    console.log("User Disconnected from messaging");
    await redisClient.hset(`chatid:${socket.user.email}`, "connected", "false");
    const conversations: string[] = await redisClient.lrange(`conversation:${socket.user.email}`, 0, -1);
    const otherConversationRooms: string[] = await parseConversations(conversations)
        .then(conversations => conversations.map(conversation => conversation.chatId));
    socket.to(otherConversationRooms).emit("connected", false, socket.user.email);
}

export const startConversation = async (socket: SessionSocket, username: string, callback: ({}) => void) => {
    if (username === socket.user.email) {
        callback({done: false, error: "Cannot start conversation with yourself"});
        return;
    }
    //Gets the users current list of active conversations
    const currentConversations = await redisClient.lrange(`conversation:${socket.user.email}`, 0, -1);
    const otherUser = await redisClient.hgetall(`chatid:${username}`);
    if (Object.keys(otherUser).length === 0) {
        callback({done: false, error: "User not found"});
        return;
    }

    if (currentConversations && currentConversations.indexOf(`${username}/${otherUser.chatid}`) !== -1) {
        callback({done: false, error: "Active conversation exits with user"});
        return;
    }
    await redisClient.lpush(`conversation:${socket.user.email}`, [username, otherUser.chatid].join("/"));
    callback({done: true});
}

const parseConversations = async (conversations: string[]) => {
    const newList = [];
    for (let conversation of conversations) {
        const parsedConversation: string[] = conversation.split("/");
        const userStatus: string | null = await redisClient.hget(`chatid:${parsedConversation[0]}`, "connected");
        newList.push({username: parsedConversation[0], chatId: parsedConversation[1], connected: userStatus});
    }
    return newList;
}

export const receiveMessage = async (socket: SessionSocket, message: { message: string, from: string, to: string }) => {
    const messages: { message: string, from: string, to: string } = {
        ...message,
        from: socket.user.chatId
    };
    const messageString = [messages.to, messages.from, messages.message].join("/")
    await redisClient.lpush(`chat:${messages.to}`, messageString);
    await redisClient.lpush(`chat:${messages.from}`, messageString);
    socket.to(message.to).emit("sendMessage", messages);
}