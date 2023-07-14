import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/form-control";
import {Input} from '@chakra-ui/input';
import {Field, useField} from "formik";

interface ChakraTextFieldProps {
    label: string,
    [p: string]: any; name: string,
}

const ChakraTextField = ({label, ...props}: ChakraTextFieldProps) => {
    const [field, meta] = useField(props);
    return (
        <FormControl isInvalid={(meta.touched && meta.error) as boolean}>
            <FormLabel>{label}</FormLabel>
            <Input as={Field} {...field} {...props} ></Input>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}

export default ChakraTextField;