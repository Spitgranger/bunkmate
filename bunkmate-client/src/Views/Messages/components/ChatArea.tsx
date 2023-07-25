import {TabPanel, TabPanels, VStack, Text} from "@chakra-ui/react";
import {ConversationContext, MessagesContext} from "../Messages.tsx";
import {useContext, useEffect, useRef} from "react";
import ChatBox from "./ChatBox.tsx";

interface ChatAreaProps {
    chatid: string
}

const ChatArea = ({chatid}: ChatAreaProps) => {
    const {conversation} = useContext(ConversationContext);
    const {messages} = useContext(MessagesContext);
    const bottomDiv = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        bottomDiv.current?.scrollIntoView();
    })

    return conversation !== null && conversation!.length > 0 ? (
        <VStack h="100%" justify="end">
            <TabPanels overflowY="scroll">
                {conversation && conversation.map(conversation => (
                    <VStack flexDir="column-reverse" as={TabPanel} key={`chat:${conversation.username}`}>
                        <div ref={bottomDiv}/>
                        {messages && messages.filter(message => message.to === conversation.chatId || message.from === conversation.chatId)
                            .map((message, index) => (
                                <Text
                                    key={`msg:${conversation.username}.${index}`}
                                    fontSize="lg"
                                    color="white"
                                    bg={message.to === conversation.chatId ? "blue.400" : "grey"}
                                    borderRadius="10px" p="0.5rem 1rem"
                                    m={message.to === conversation.chatId ? "1rem 0 0 auto !important" : "1rem auto 0 0 !important"}
                                    maxW="50%">
                                    {message.message}
                                </Text>
                            ))}
                    </VStack>
                ))}
            </TabPanels>
            <ChatBox chatid={chatid}/>
        </VStack>) : (
        <VStack justify="center" pt="5rem" w="100%">
            <TabPanels>
                <TabPanel>
                    <Text textAlign="center" fontSize="lg">No Active Conversations</Text>
                </TabPanel>
            </TabPanels>
        </VStack>
    )
}

export default ChatArea;