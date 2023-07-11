import {
    Button, Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import ChakraTextField from "./ChakraTextField.tsx";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import socket from "../../../store/socketContext.ts";
import {useCallback, useContext, useState} from "react";
import {ConversationContext} from "../Messages.tsx";

const EmailValidationSchema = Yup.object({
    username: Yup.string().required("Username Required").min(2).max(28, "Username too long").email()
})

interface StartChatModelProps {
    isOpen: boolean,
    onClose: () => void
}

interface SocketResponse {
    error: string,
    done: boolean,
}

const StartChatModal = ({isOpen, onClose}: StartChatModelProps) => {
    const [error, setError] = useState("");
    const {setConversation} = useContext(ConversationContext);
    const closeModal = useCallback((): void => {
        setError("");
        onClose();
    }, [onClose]);
    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered={true}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Start a conversation</ModalHeader>
                <ModalCloseButton/>
                <Formik initialValues={{username: ""}}
                        onSubmit={(values) => {
                            console.log("ds")
                            socket.emit("start_conversation", values.username, ({error, done}: SocketResponse) => {
                                if (done) {
                                    setConversation(prevConversations => [{username: values.username, chatId: "", connected: false} ,...prevConversations]);
                                    closeModal();
                                    setError("");
                                    return;
                                } else {
                                    setError(error);
                                }
                            });

                           // alert(JSON.stringify(values, null, 2));
                           // actions.resetForm();
                        }}
                        validationSchema={EmailValidationSchema}
                >
                    <Form>
                        <ModalBody>
                            <Heading as="p" color="red" fontSize="md">{error}</Heading>
                            <ChakraTextField label="Enter user email" placeholder="danny@gmail.com" name="username"/>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' type="submit">
                                Add
                            </Button>
                        </ModalFooter>
                    </Form>
                </Formik>
            </ModalContent>
        </Modal>
    )
}

export default StartChatModal;