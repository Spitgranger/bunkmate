import {useDispatch, useSelector} from "react-redux";
import {setGlobalErrorMessages} from "../../../features/applications/applicationsSlice.js";

/**
 * @brief function checks whether bunkmate field has the correct syntax
 * @param {string} value this parameter contains the inputted contents
 * @returns {boolean} this function returns true if valid syntax else false
 */
export function bunkmateFieldValidation(value) {
    //regex for attaching bunkmate email
    const isValidEmailSyntax = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    //regex for attaching bunkmate names (must start with @)
    const usedSpecialCharacter = /^@/.test(value)

    const errorMessages = []
    if (isValidEmailSyntax) {
        return true
    } else if (usedSpecialCharacter) {
        return true
    } else if (!usedSpecialCharacter || !isValidEmailSyntax) {
        errorMessages.push(
            "Inputs must start with '@' symbol",
            "Emails must have valid syntax: example@gmail.com"
        )
        return false
    }

}

/*
export function passwordValidation(value) {
    const isValueZero = !(value === 0);
    const hasSpecialCharacterRegex = /[\W_]/.test(value);
    const isWithinLengthRange = value>5 && value <= 16;

    //retrieve state and set state from global store
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.applications.errorMessage);

    if (!isValueZero){
       dispatch(setErrorMessages([...errorMessages, "Password must contain at least one uppercase letter."]));
       return false;
    } if (!hasSpecialCharacterRegex) {
           dispatch(setErrorMessages([...errorMessages, "Password must contain at least one special character"]));
           return false;
    } if (!isWithinLengthRange) {
           dispatch(setErrorMessages([...errorMessages, "Password must be between 6 and 15 characters in length."]));
           return false;
    }
    else{
        return true;
    }
}

const [field, setField] = useState({}}
const handleFormChange = ({e, field, validation}) => {
    const isValid = validation(e.target.value);
    //only record field if validation function returns true (satisfies regex testing)
    if (isValid){
        setError(false) // error state used on error param in textfield
        setErrorMessage("") //error message state used on helperText param in textfield
        setField({field: e.target.value}) // record values
    } else if (!isValid){
        setError(true) // error state used on error param on textField
        setErrorMessage(field, "is in invalid!") //error message state used on helperText param in textfield
    }
}

if there are no empty fields in "field" object then set continue button disabled to false
*/
