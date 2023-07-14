import {VStack, HStack, Heading, Divider, TabList, Tab, Text, Circle, useDisclosure} from "@chakra-ui/react";
import {Button} from "@chakra-ui/react";
import {ChatIcon} from "@chakra-ui/icons";
import {ConversationContext} from "../Messages.tsx";
import {useContext} from "react";
import StartChatModal from "./StartChatModal.tsx";

const MessagingSidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {conversation} = useContext(ConversationContext);
    return (
        <>
            <VStack py="1rem">
                <HStack justify="space-evenly" width="100%">
                    <Heading size="lg">
                        Conversations
                    </Heading>
                    <Button onClick={onOpen}>
                        <ChatIcon/>
                    </Button>
                </HStack>
                <Divider/>
                <VStack as={TabList}>
                    {conversation && conversation.map((conversation) => {
                        return (
                            <HStack as={Tab}>
                                <Circle bg={conversation.connected ? "green" : "red"} size="15px"/>
                                <Text>{conversation.username}</Text>
                            </HStack>
                        )
                    })}
                </VStack>
            </VStack>
            <StartChatModal isOpen={isOpen} onClose={onClose}/>
        </>

    )
}

export default MessagingSidebar;