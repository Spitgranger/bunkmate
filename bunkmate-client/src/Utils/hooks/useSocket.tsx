import socket from "../../store/socketContext.ts";
import React, {SetStateAction, useEffect} from 'react';
import {Conversations} from "../../Views/Messages/Messages.tsx";
import {Messages} from "../../Views/Messages/Messages.tsx"

const useSocket = (setConversation: React.Dispatch<React.SetStateAction<Conversations>>, setMessages: React.Dispatch<SetStateAction<Messages>>) => {
    useEffect(() => {
        socket.connect();
        // socket.on("connect_error", () => {
        //     //localStorage.clear();
        // })
        const connected = (status: string, username: string) => {
            console.log(status, username);
            setConversation(conversations => {
                return conversations.map(conversation => {
                    if (conversation.username === username) {
                        conversation.connected = status;
                    }
                    return conversation;
                });
            })
        };

        const conversations = (conversations: Conversations) => {
            setConversation(conversations);
            console.log(conversations)
        }
        const messages = (messages: Messages) => {
            setMessages(messages);
            console.log(messages)
        };
        const sendMessage = (message: { message: string, to: string, from: string }) => {
            setMessages(prevMessages => [message, ...prevMessages])
        };
        const initializeMessages = (messages: Messages) => {
            setMessages(messages)
        };

        socket.on("connected", connected);
        socket.on("conversations", conversations);
        socket.on("messages", messages);
        socket.on("sendMessage", sendMessage);
        socket.on("initializeMessages", initializeMessages);

        return () => {
            //socket.off("connect_error");
            console.log("Componente unmounterddddd")
            socket.off("conversations", conversations);
            socket.off("messages", messages);
            socket.off("sendMessage", sendMessage);
            socket.off("connected", connected);
            socket.off("initializeMessages", initializeMessages);
            socket.disconnect();
        }
    }, [setConversation, setMessages, socket])
}

export default useSocket;