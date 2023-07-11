"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveMessage = exports.startConversation = exports.onDisconnect = exports.initializeUser = void 0;
const redis_1 = __importDefault(require("../redis"));
const initializeUser = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User connected to messaging");
    socket.join(socket.user.chatId);
    yield redis_1.default.hset(`chatid:${socket.user.email}`, "userid", socket.user.chatId, "connected", "true");
    const conversations = yield redis_1.default.lrange(`conversation:${socket.user.email}`, 0, -1);
    const otherConversationRooms = yield parseConversations(conversations);
    const otherConversationRoomIds = otherConversationRooms.map(conversation => {
        return conversation.chatId;
    });
    otherConversationRoomIds.length > 0 && socket.to(otherConversationRoomIds).emit("connected", true, socket.user.email);
    socket.emit("conversations", otherConversationRooms);
    const messagesQuery = yield redis_1.default.lrange(`chat:${socket.user.chatId}`, 0, -1);
    const messages = messagesQuery.map((message) => {
        const parsedString = message.split("/");
        return { to: parsedString[0], from: parsedString[1], message: parsedString[2] };
    });
    if (messages && messages.length > 0) {
        socket.emit("initializeMessages", messages);
    }
});
exports.initializeUser = initializeUser;
const onDisconnect = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User Disconnected from messaging");
    yield redis_1.default.hset(`chatid:${socket.user.email}`, "connected", "false");
    const conversations = yield redis_1.default.lrange(`conversation:${socket.user.email}`, 0, -1);
    const otherConversationRooms = yield parseConversations(conversations)
        .then(conversations => conversations.map(conversation => conversation.chatId));
    socket.to(otherConversationRooms).emit("connected", false, socket.user.email);
});
exports.onDisconnect = onDisconnect;
const startConversation = (socket, username, callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (username === socket.user.email) {
        callback({ done: false, error: "Cannot start conversation with yourself" });
        return;
    }
    //Gets the users current list of active conversations
    const currentConversations = yield redis_1.default.lrange(`conversation:${socket.user.email}`, 0, -1);
    const otherUser = yield redis_1.default.hgetall(`chatid:${username}`);
    if (Object.keys(otherUser).length === 0) {
        callback({ done: false, error: "User not found" });
        return;
    }
    if (currentConversations && currentConversations.indexOf(`${username}/${otherUser.chatid}`) !== -1) {
        callback({ done: false, error: "Active conversation exits with user" });
        return;
    }
    yield redis_1.default.lpush(`conversation:${socket.user.email}`, [username, otherUser.chatid].join("/"));
    callback({ done: true });
});
exports.startConversation = startConversation;
const parseConversations = (conversations) => __awaiter(void 0, void 0, void 0, function* () {
    const newList = [];
    for (let conversation of conversations) {
        const parsedConversation = conversation.split("/");
        const userStatus = yield redis_1.default.hget(`chatid:${parsedConversation[0]}`, "connected");
        newList.push({ username: parsedConversation[0], chatId: parsedConversation[1], connected: userStatus });
    }
    return newList;
});
const receiveMessage = (socket, message) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = Object.assign(Object.assign({}, message), { from: socket.user.chatId });
    const messageString = [messages.to, messages.from, messages.message].join("/");
    yield redis_1.default.lpush(`chat:${messages.to}`, messageString);
    yield redis_1.default.lpush(`chat:${messages.from}`, messageString);
    socket.to(message.to).emit("sendMessage", messages);
});
exports.receiveMessage = receiveMessage;
