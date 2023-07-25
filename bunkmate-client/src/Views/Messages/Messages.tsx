import {createContext, useEffect, useState} from 'react';
import {ChakraProvider, Grid, GridItem, Tabs} from "@chakra-ui/react";
import React from "react";
import MessagingSidebar from "./components/MessagingSidebar.tsx";
import ChatArea from "./components/ChatArea.tsx";
import useSocket from "../../Utils/hooks/useSocket.tsx";

export type Conversations = { username: string, chatId: string, connected: string }[];
export type Messages = { message: string, to: string, from: string }[];

interface ConversationContextType {
    conversation: Conversations;
    setConversation: React.Dispatch<React.SetStateAction<Conversations>>;
}

interface MessagesContextType {
    messages: Messages;
    setMessages: React.Dispatch<React.SetStateAction<Messages>>;
}

const defaultConversationContext = {
    conversation: [{username: "", chatId: "", connected: ""}],
    setConversation: () => undefined,
}

const defaultMessagesContext = {
    messages: [{message: "", to: "", from: ""}],
    setMessages: () => undefined,

}

export const ConversationContext = createContext<ConversationContextType>(defaultConversationContext);
export const MessagesContext = createContext<MessagesContextType>(defaultMessagesContext);

const Message = () => {
    const user = JSON.parse(localStorage.getItem('profile') as string);
    //TODO data needs to be retrieved from server, this is a placeholder for the conversations that a user will have
    const [conversation, setConversation] = useState<Conversations>([]);
    const [messages, setMessages] = useState<Messages>([]);
    const [conversationIndex, setConversationIndex] = useState(0);


    useEffect(() => {
        console.log(messages);
    }, [messages]);

    const handleTabChange = (index: number) => {
        setConversationIndex(index);
    }

    user && useSocket(setConversation, setMessages);
    return (
        <ChakraProvider>
            <div style={{height: '9vh'}}/>
            <ConversationContext.Provider value={{conversation, setConversation}}>
                <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs} onChange={handleTabChange as any}>
                    <GridItem colSpan={3} borderRight="1px solid grey">
                        <MessagingSidebar/>
                    </GridItem>
                    <GridItem colSpan={7} maxH="100vh">
                        <MessagesContext.Provider value={{messages, setMessages}}>
                            <ChatArea chatid={conversation![conversationIndex]?.chatId}/>
                        </MessagesContext.Provider>
                    </GridItem>
                </Grid>
            </ConversationContext.Provider>
        </ChakraProvider>
    )
}
export default Message;