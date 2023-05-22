import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, Card, TextField, InputAdornment, Typography, Avatar, Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getProfile } from '../../../../api';
import { AiFillQuestionCircle } from 'react-icons/ai';

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
    * - BunkmateAllocation (contaisn an input field for linking roommates and another to enter the desired amount of rent to be distributed)
 * @returns {React.ReactElement} a react element that contains the ability to assign rent costs to your roommates
 */
export default function AddBunkmatesCard({ data, index }) {

    const cardStyles = {
        padding: '5%', margin: '2%', borderRadius: '20px', display: 'flex', flexDirection: 'column', minWidth: '350px',
    }

    //the current unit price that's dependent on the unit selection
    const unitPrice = data.listing_details.units[index].price

    //retrieved from global state, can be changed by incrementing or decrementing the bunkmate Addon component  
    const bunkmateCount = useSelector(state => state.applications.bunkmateCount)

    //the rent cost split across the number of roommates you have
    //add one to compensate for the user themself, restrict to whole numbers
    const splitRentCost = (unitPrice / (bunkmateCount + 1)).toFixed(0);


    //define state variable for managing the number of fields added and removed and the content within each field
    //bunkmate fields has one empty string by default to compensate for the the user's own allocation
    const [bunkmateFields, setBunkmateFields] = useState([""]);

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

    /**
     * @brief event handler for adding values to an index within the array
     * 
     * @param {number} index the index within the array of input fields
     * @param {number} value the data retrieved from the input field
     * @see setBunkmateFields sets bunkmateFields
     * @see setUnallocatedRent sets unallocatedRent
     */
    const handleRentChange = (index, value) => {
        const newBunkmateFields = [...bunkmateFields];
        newBunkmateFields[index] = value;

        let newUnallocatedAmount = unitPrice; // Reset unallocatedRent to default value
        //Goes through each value in the array and only stores integers
        newBunkmateFields.forEach(input => {
            const parsedValue = parseFloat(input);
            if (!isNaN(parsedValue)) {
                newUnallocatedAmount -= parsedValue; // Add valid input values to the unallocatedRent 
            }
        });
        setBunkmateFields(newBunkmateFields);
        setUnallocatedRent(newUnallocatedAmount);
    };

    /**
     * @brief event handler for adding an extra place holder (empty string) within the array for a new field (adding an input field)
     * 
     * @see setBunkmateFields sets the bunkmate fields
     */
    const handleAddInput = () => {
        setBunkmateFields([...bunkmateFields, ""]);
    };

    /**
     * @brief event handler for removing an element at a specific index within the array (removing an input field)
     * 
     * @param {number} index the index within the array of input fields
     * @see setBunkmateFields sets bunkmateFields
     * @see setUnallocatedRent sets unallocatedRent
     */
    const handleRemoveInput = (index) => {
        const newInputs = [...bunkmateFields];
        /*newInputs.splice(index, 1);*/
        newInputs.pop();

        let newCounter = unitPrice; // Reset unallocatedRent to default value
        newInputs.forEach(input => {
            const parsedValue = parseFloat(input);
            if (!isNaN(parsedValue)) {
                newCounter -= parsedValue; // Add valid input values to theunallocatedRent 
            }
        });

        setBunkmateFields(newInputs);
        setUnallocatedRent(newCounter);
    };

    //useEffect hook depends on global bunkmateCount chaging to add or remove input fields
    useEffect(() => {
        //if index (unit selection) changes, bunkmateCount will be set to 0 and bunkmateFields array and unallocatedRent is set to default state as well
        if (bunkmateCount === 0) {
            setBunkmateFields([""])
            setUnallocatedRent(unitPrice)
        }
        //if bunkmateCount has decreased then remove an input field
        //subtract 1 because bunkmateFields initially has an extra empty string to compensate for User's Own Allocation
        else if (bunkmateCount < bunkmateFields.length - 1) {
            handleRemoveInput();
        }
        //if bunkmateCount has increased then add an input field
        //subtract 1 because bunkmateFields initially has an extra empty string to compensate for User's Own Allocation
        else if (bunkmateCount > bunkmateFields.length - 1) {
            handleAddInput();
        }
    }, [bunkmateCount])

    {/* Only display the card if bunkmateCount is 1 or greater */ }
    return (
        bunkmateCount >= 1
            ?
            <Card sx={cardStyles} raised>
                <TopInfoContainer
                    unallocatedRent={unallocatedRent}
                />
                {bunkmateFields.map((_, index) => {
                    return (
                        index === 0
                            ? <UserOwnAllocation
                                userProfile={userProfile}
                                index={index}
                                handleRentChange={handleRentChange}
                                bunkmateFields={bunkmateFields}
                                splitRentCost={splitRentCost}
                            />
                            : <BunkmateAllocation
                                index={index}
                                handleRentChange={handleRentChange}
                                bunkmateCount={bunkmateCount}
                                bunkmateFields={bunkmateFields}
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
 * @param {number} unallocatedRent is the rounded amount of rent that still needs to be distributed
 * @returns {React.ReactElement}
 * 
 * @example
 * <TopInfoContainer unallocatedRent={500}/>
 */
function TopInfoContainer({ unallocatedRent }) {

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
                    {`$${Math.round(unallocatedRent)}`}
                </Typography>

            </div>
        </>
    )
}

/**
 * @brief This functional UI component takes up a single row and showcases the amount of rent cost that the user themself has to take on
 * 
 * @param {number} index is the index within the bunkmatesField
 * @param {function} handleRentChange is an event handler function that handles the records the value from an input field
 * @param {object} userProfile stored profile data on the user
 * @param {array} bunkmateFields the values of each input stored in an array
 * @param {number} splitRentCost the cost of rent split across numerous bunkmates
 * @returns {React.ReactElement} a react element that contains the user's profile information and an input field to declare rent paying amount
 * 
 * @example
 * <UserOwnAllocation 
    * index={0} 
    * handleRentChange={handleRentChange} 
    * userProfile={userProfile} 
    * bunkmateFields={["", "240", "", "500"]
 * />
 */
function UserOwnAllocation({ index, handleRentChange, userProfile, bunkmateFields, splitRentCost }) {

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
                    value={bunkmateFields[index]}
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
 * @param {number} index is the index within the bunkmatesField
 * @param {function} handleRentChange is an event handler function that handles the records the value from an input field
 * @param {array} bunkmateFields the values of each input stored in an array
 * @param {number} splitRentCost the cost of rent split across numerous bunkmates
 * @returns {React.ReactElement} a react element that contains an input field for linking a roommate and another for declaring rent payment amount
 * 
 * @example
 * <BunkmateAllocation 
    * index={1}
    * handleRentChange={handleRentChange}
    * bunkmateFields={["", 243, "", 500]}
 * /> 
 */
function BunkmateAllocation({ index, handleRentChange, bunkmateFields, splitRentCost }) {

    const styles = {
        divider: { margin: '10px' },
        container: { display: 'flex', flexDirection: 'row' },
        profileContainer: { display: 'flex', alignItems: 'center', margin: '3%', width: '200px' },
        firstName: { fontSize: '18px', fontWeight: 550, padding: '0px 20px 0px 20px' },
        linkBunkmateField: { margin: '3%', width: '200px' },
        allocateRentField: { margin: '3%', width: '150px' }
    }

    return (
        <>
            <Divider sx={styles.divider} />
            <div style={styles.container}>
                <TextField
                    sx={styles.linkBunkmateField}
                    label={`Bunkmate ${index} `}
                    placeholder="@name or email"
                    type="text"
                    size="small"
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
                    value={bunkmateFields[index]}
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

