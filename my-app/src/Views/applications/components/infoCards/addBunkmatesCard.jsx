import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Alert,
    Divider,
    Card,
    TextField,
    InputAdornment,
    Typography,
    Avatar,
    Tooltip,
    tooltipClasses,
    AlertTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getProfile } from '../../../../api';
import { AiFillQuestionCircle } from 'react-icons/ai';
import {setContinueDisabled, setBunkmateField} from "../../../../features/applications/applicationsSlice";
import {bunkmateFieldValidation} from "../../utils/validationUtils";

/**
 * @function AddBunkmatesCard
 * 
 * @brief this functional UI component allows users to link bunkmates and divide up the rent cost amongst everyone
 * 
 * @param {object} data this object stores data on the unit
 * @param {number} index this number represents the index within the listings page
 * @details
 * How this component is structured
    * - TopInfoContainer (contains information about the remaining rent cost that needs to be allocated)
    * - UserOwnAllocation (contains the user's profile information and an input field to enter the desired amount of rent to be distributed)
    * - BunkmateAllocation (contains an input field for linking roommates and another to enter the desired amount of rent to be distributed)
 * @returns {React.ReactElement} a react element that contains the ability to assign rent costs to your roommates
 */
export default function AddBunkmatesCard({ data, index }) {

    const cardStyles = {
        padding: '5%', margin: '2%', borderRadius: '20px', display: 'flex', flexDirection: 'column', minWidth: '350px',
    }

    const dispatch = useDispatch();
    //retrieved from global state, can be changed by incrementing or decrementing the bunkmate Addon component
    const bunkmateCount = useSelector(state => state.applications.bunkmateCount)

    //the current unit price that's dependent on the unit selection
    const unitPrice = data.listing_details.units[index].price

    //the rent cost split across the number of roommates you have
    //add one to compensate for the user themself, restrict to 2 decimal places
    const splitRentCost = (unitPrice / (bunkmateCount + 1)).toFixed(2);

    //define state variable for managing the number of rent fields added and removed and the rent amount within each field
    //bunkmateRent has one empty string by default to compensate for the user's own allocation
    const [bunkmateRent, setBunkmateRent] = useState([""]);

    //define state variable for managing the bunkmate fields added and removed and the contact info within each field
    //bunkmate field has one empty string by default to compensate for the user's own allocation
    //retrieve from global store
    const bunkmateField = useSelector(state => state.applications.bunkmateField);

    //retrieve error messages from global store
    const globalErrorMessages = useSelector(state => state.applications.globalErrorMessages);

    //define state variable for managing the unallocated rent that still needs to be divided
    const [unallocatedRent, setUnallocatedRent] = useState(0);
    //Changing the index (unit selection) sets the unallocated rent counter to the new unit's rent price
    useEffect(() => {
        setUnallocatedRent(data.listing_details.units[index].price)
    }, [index])

    //define state variable for storing user profile
    const [userProfile, setUserProfile] = useState({})
    //get data from backend
    const handleProfile = async () => {
        const profile = await getProfile();
        return profile
    }
    //get data from backend when the component first loads works
    useEffect(() => {
        handleProfile().then((profile) => setUserProfile(profile.data));
    }, []);

    //the amount of unallocated rent rounded to 2 decimal places
    const roundedUnallocatedRent = Math.round(unallocatedRent * 100) / 100;
    //Validation: useEffect hook used for managing the enabled / disabled state of the continue button
    useEffect(() => {
        //check if bunkmateCount is 0, if so then enable continue button
        if (bunkmateCount === 0){
            dispatch(setContinueDisabled(false));
        }
        //check if bunkmateCount is greater than 0
        else if (bunkmateCount > 0) {
            //check if unallocated rent is 0 and all bunkmate fields are filled, if so then enable continue button
            const isFieldFilled = bunkmateField.slice(1).every(field => field !== '');
            if (isFieldFilled && roundedUnallocatedRent === 0 && bunkmateField.slice(1).length > 0) {
                dispatch(setContinueDisabled(false));
            } else {
                dispatch(setContinueDisabled(true));
            }
        }
    },[bunkmateCount, unallocatedRent, bunkmateField])


    /**
     * @brief event handler for adding rent amount to an index within the array
     * 
     * @param {number} index the index within the array of input fields
     * @param {number} value the data retrieved from the input field
     * @see setBunkmateRent sets the bunkmate Rent
     * @see setUnallocatedRent sets unallocatedRent
     */
    const handleRentChange = (index, value) => {
        const newBunkmateRent = [...bunkmateRent];
        newBunkmateRent[index] = value;

        let newUnallocatedAmount = unitPrice; // Reset unallocatedRent to default value
        //Goes through each value in the array and only stores integers
        newBunkmateRent.forEach(input => {
            const parsedValue = parseFloat(input);
            if (!isNaN(parsedValue)) {
                newUnallocatedAmount -= parsedValue; // Add valid input values to the unallocatedRent 
            }
        });
        setBunkmateRent(newBunkmateRent);
        setUnallocatedRent(newUnallocatedAmount);
    };

    /**
     * @brief event handler for adding an extra placeholder (empty string) within the array for a new field (adding an input field)
     * 
     * @see setBunkmateRent sets the bunkmate fields
     */
    const handleAddInput = () => {
        setBunkmateRent([...bunkmateRent, ""]);
        dispatch(setBunkmateField([...bunkmateField, ""]))
    };

    /**
     * @brief event handler for removing an element at a specific index within the array (removing an input field)
     * 
     * @param {number} index the index within the array of input fields
     * @see setBunkmateRent sets bunkmateRent
     * @see setUnallocatedRent sets unallocatedRent
     */
    const handleRemoveInput = (index) => {

        //recording the name or email values within the array
        const newFieldAmount = [...bunkmateField];
        newFieldAmount.pop();
        dispatch(setBunkmateField(newFieldAmount))

        //recording the rent values within the array
        const newRentAmount = [...bunkmateRent];
        /*newInputs.splice(index, 1);*/
        newRentAmount.pop();
        //changing the unallocated rent counter
        let newCounter = unitPrice; // Reset unallocatedRent to default value
        newRentAmount.forEach(input => {
            const parsedValue = parseFloat(input);
            if (!isNaN(parsedValue)) {
                newCounter -= parsedValue; // Add valid input values to the unallocated rent amount
            }
        });
        setBunkmateRent(newRentAmount);
        setUnallocatedRent(newCounter);
    };

    //useEffect hook depends on global bunkmateCount changing to add or remove input fields
    useEffect(() => {
        //if index (unit selection) changes, bunkmateCount will be set to 0 and bunkmateRent array and unallocatedRent is set to default state as well
        //set global continueDisabled state to false
        if (bunkmateCount === 0) {
            setBunkmateRent([""])
            dispatch(setBunkmateField([""]))
            setUnallocatedRent(unitPrice)
        }
        //if bunkmateCount has decreased then remove an input field
        //subtract 1 because bunkmateRent initially has an extra empty string to compensate for User's Own Allocation
        else if (bunkmateCount < bunkmateRent.length - 1) {
            handleRemoveInput(index);
        }
        //if bunkmateCount has increased then add an input field
        //subtract 1 because bunkmateRent initially has an extra empty string to compensate for User's Own Allocation
        else if (bunkmateCount > bunkmateRent.length - 1) {
            handleAddInput();
        }
    }, [bunkmateCount])

    {/* Only display the card if bunkmateCount is 1 or greater */ }
    return (
        bunkmateCount >= 1
            ?
            <Card sx={cardStyles} raised>
                <TopInfoContainer
                    roundedUnallocatedRent={roundedUnallocatedRent}
                />
                {/*
                <Alert severity={"error"}>
                    <AlertTitle>
                        <strong>Error</strong>
                    </AlertTitle>
                    {globalErrorMessages.map( errorMessage => {
                            return (<li>{errorMessage}</li>)})}
                </Alert>
                */}
                {bunkmateRent.map((_, index) => {
                    return (
                        index === 0
                            ? <UserOwnAllocation
                                userProfile={userProfile}
                                index={index}
                                handleRentChange={handleRentChange}
                                bunkmateRent={bunkmateRent}
                                splitRentCost={splitRentCost}
                            />
                            : <BunkmateAllocation
                                index={index}
                                handleRentChange={handleRentChange}
                                bunkmateCount={bunkmateCount}
                                bunkmateRent={bunkmateRent}
                                bunkmateField={bunkmateField}
                                splitRentCost={splitRentCost}
                            />
                    )
                })}
            </Card >
            : null
    );
};


/**
 * @brief This functional UI component showcases the amount of rent cost that hasn't been distributed yet
 * 
 * @param {number} roundedUnallocatedRent is the rounded amount of rent that still needs to be distributed
 * @returns {React.ReactElement}
 * 
 * @example
 * <TopInfoContainer unallocatedRent={500}/>
 */
function TopInfoContainer({ roundedUnallocatedRent }) {

    const styles = {
        title: { fontWeight: 600 },
        unAllocatedContainer: { width: '100%', display: 'flex', flexDirection: 'row', },
        questionMarkIconContainer: { display: 'flex', alignItems: 'center' },
        questionMarkIcon: { cursor: 'pointer', height: '100%', margin: '0px 0px 5px 5px', color: 'grey' },
        text: { fontSize: '16px', fontWeight: 600 },
        tooltipText: { fontSize: '15px' },
    }

    //styled tooltip
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
            padding: '20px',
            borderRadius: '10px'
        },
    }));


    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Typography color="text.primary" variant="h6" sx={styles.title}>
                    Invite Bunkmates
                </Typography>
                <HtmlTooltip placement="right-start" arrow title={
                    <Typography style={styles.tooltipText}>
                        We’ll send an email invitation to each
                        bunkmate so you can split the deposit and rent payments.
                        They’ll have 72 hours to join your group.
                    </Typography>
                }>
                    <div style={styles.questionMarkIconContainer}>
                        <AiFillQuestionCircle style={styles.questionMarkIcon} />
                    </div>
                </HtmlTooltip>
            </div >
            <div style={styles.unAllocatedContainer}>
                <Typography color="text.secondary" variant="h6" sx={styles.text}>
                    Unallocated Monthly Rent:
                </Typography>
                <Typography color="text.primary" variant="h6" sx={styles.text}>
                    {`$${roundedUnallocatedRent}`}
                </Typography>

            </div>
        </>
    )
}

/**
 * @brief This functional UI component takes up a single row and showcases the amount of rent cost that the user themself has to take on
 * 
 * @param {number} index is the index within the bunkmatesField
 * @param {function}  handleRentChange is an event handler function that records the value from an input field
 * @param {object} userProfile stored profile data on the user
 * @param {array} bunkmateRent the values of each input stored in an array
 * @param {number} splitRentCost the cost of rent split across numerous bunkmates
 * @returns {React.ReactElement} a react element that contains the user's profile information and an input field to declare rent paying amount
 * 
 * @example
 * <UserOwnAllocation 
    * index={0} 
    * handleRentChange={handleRentChange} 
    * userProfile={userProfile} 
    * bunkmateRent={["", "240", "", "500"]
 * />
 */
function UserOwnAllocation(
    {index,
    handleRentChange,
    userProfile,
    bunkmateRent,
    splitRentCost,
    }) {

    const styles = {
        divider: { margin: '10px' },
        container: { display: 'flex', flexDirection: 'row' },
        profileContainer: { display: 'flex', alignItems: 'center', margin: '3%', width: '200px' },
        firstName: { fontSize: '18px', fontWeight: 550, padding: '0px 20px 0px 20px' },
        inputField: { margin: '3%', width: '150px' },
    }

    return (
        <>
            <Divider sx={styles.divider} />
            <div style={styles.container} >
                <div style={styles.profileContainer}>
                    <Avatar src={userProfile?.picture} alt={`${userProfile?.firstName}'s avatar`} />
                    <Typography color="text.secondary" variant="h6" sx={styles.firstName}>
                        {userProfile?.firstName}
                    </Typography>
                </div>
                <TextField
                    sx={styles.inputField}
                    label="Rent"
                    size="small"
                    inputAdornment={true}
                    onChange={(e) => handleRentChange(index, e.target.value)}
                    type="number"
                    placeholder={splitRentCost}
                    value={bunkmateRent[index]}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                        ),
                    }}
                />
            </div >
        </>
    )
}

/**
 * @brief This functional UI component takes up a single row and allows you to link bunkmates and showcases the amount of rent cost that the other bunkmates will have to take on
 *
 * @param {function}  handleRentChange is an event handler function that records the value from an input field
 * @param {number} index is the index within the bunkmatesField
 * @param {array} bunkmateRent the values of each input stored in an array
 * @param {number} splitRentCost the cost of rent split across numerous bunkmates
 * @param {array} bunkmateField each index within the array stores the user's name or email
 * @returns {React.ReactElement} a react element that contains an input field for linking a roommate and another for declaring rent payment amount
 * 
 * @example
 * <BunkmateAllocation 
    * index={1}
    * handleRentChange={handleRentChange}
    * bunkmateRent={["", 243, "", 500]}
 * /> 
 */
function BunkmateAllocation(
    {index,
    handleRentChange,
    bunkmateRent,
    splitRentCost,
    bunkmateField,}
) {

    const styles = {
        divider: { margin: '10px' },
        container: { display: 'flex', flexDirection: 'row' },
        profileContainer: { display: 'flex', alignItems: 'center', margin: '3%', width: '200px' },
        firstName: { fontSize: '18px', fontWeight: 550, padding: '0px 20px 0px 20px' },
        linkBunkmateField: { margin: '3%', width: '200px' },
        allocateRentField: { margin: '3%', width: '150px' }
    }

    const dispatch = useDispatch();

    //Validation: define state variable for managing local error message displayed in helperText
    const [localErrorMessage, setLocalErrorMessage] = useState("");
    //Validation: define state variable for managing error state for text fields
    const [error, setError] = useState(false);

    /**
     * @brief event handler for adding contact information to an index within the array
     *
     * @param {number} index the index within the array of input fields
     * @param {string} value the data retrieved from the input field
     * @param {function} validation the validation function used to validate the field
     * @see setBunkmateField sets the bunkmate contact info
     */
    const handleBunkmateChange = (index, value, validation) => {
        const isValid = validation(value)
        const newBunkmateField = [...bunkmateField];
        if (isValid){
            setError(false)
            setLocalErrorMessage("")
            newBunkmateField[index] = value;
            dispatch(setBunkmateField(newBunkmateField));
        } else {
            setError(true)
            setLocalErrorMessage("Please Enter a valid name or email")
            newBunkmateField[index] = "";
            dispatch(setBunkmateField(newBunkmateField));
        }
    }
    //retrieve from global store
    const continueDisabled = useSelector(state => state.applications.continueDisabled);


    return (
        <>
            <Divider sx={styles.divider} />
            <div style={styles.container}>
                <TextField
                    sx={styles.linkBunkmateField}
                    label={`Bunkmate ${index} `}
                    placeholder="@name or email"
                    onChange={(e) => handleBunkmateChange(index, e.target.value, bunkmateFieldValidation)}
                    type="text"
                    size="small"
                    error={error}
                    helperText={localErrorMessage}
                    required
                />
                <TextField
                    id="outlined-basic"
                    label="Rent"
                    variant="outlined"
                    sx={styles.allocateRentField}
                    type="number"
                    size="small"
                    onChange={(e) => handleRentChange(index, e.target.value)}
                    placeholder={splitRentCost}
                    value={bunkmateRent[index]}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                $
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </>
    )
}

