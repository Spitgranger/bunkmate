import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useContext} from "react";
import {Input} from "@chakra-ui/input";
import {Button, HStack} from "@chakra-ui/react";
import socket from "../../../store/socketContext.ts";
import {MessagesContext} from "../Messages.tsx";


const ChatBox = ({chatid}: {chatid: string}) => {
    const {setMessages} = useContext(MessagesContext);
    return <Formik
        initialValues={{message: ""}}
        validationSchema={Yup.object({
            message: Yup.string().min(1).max(255)
        })}
        onSubmit={(values, actions) => {
            const message = {to: chatid, from: "", message: values.message}
            console.log(JSON.stringify(message));
            socket.emit("sendMessage", message);
            setMessages(prevMessages => [message, ...prevMessages]);
            actions.resetForm();
        }}>
        <HStack as={Form} w="100%" pb="1.4rem" px="1.4rem">
            <Input as={Field} name="message" placeholder="Send a message" size="lg" autoComplete="off" />
            <Button type="submit" size="lg" colorScheme="teal">
                Send Message
            </Button>
        </HStack>
    </Formik>
}

export default ChatBox;