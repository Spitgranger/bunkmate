import { CardContent, Card, Typography, IconButton, } from '@mui/material';
import { CardMedia } from "@mui/material/";
import Divider from "@mui/material/Divider";
import { AiFillQuestionCircle } from 'react-icons/ai';
import { DropDownMenu } from '../../../Components/Utils/Form';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';

/**
 * @brief This functional UI card component that always sits on the right side of the screen and reminds the user about unit key details and allows them to change some parameters
 * 
 * @details 
 * - How UnitInfoCard is structured 
    * - UnitInfo (info about the unit in the topside of the card)
    * - ChangeDetails (interactive component that allows the user to make last minute modifications, found in the bottom side of the card)
 * @returns {React.ReactElement} a react element that contains information about the Unit as well as the ability to modify your application
 */
export default function UnitInfoCard() {

    const cardStyles = {
        padding: '1.5%', margin: '3vw', borderRadius: '20px', display: 'flex', flexDirection: 'column', height: '450px', minWidth: '320px'
    }

    return (
        <Card raised sx={cardStyles}>,
            <UnitInfo />
            <Divider />
            <ChangeDetails />
        </Card>
    )
}

/**
 * @brief a functional component that displays information on the selected unit
 * @details 
 * - How this component is structured
    * - Unit Number
    * - Price
    * - Unit Type
    * - Number Beds
    * - Number Baths 
    * - Square footage
 * @returns {JSX.Element} a jsx element that contains keyUnit details
 */
function UnitInfo() {

    const unitInfoStyles = {
        topSide: {
            container: { padding: '10px 0px 10px 0px', display: 'flex', flexDirection: 'row' },
            rightSide: {
                container: { display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', padding: '10px 10px 0px 10px' },
                unitInfoContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }
            },
        },
        bottomSide: {
            display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '10px 0px 10px 0px'
        },
        unitPicture: { width: '150px', height: '110px', borderRadius: '5px' },
        unitNumber: { fontSize: '27px', fontWeight: 600 },
        unitPrice: { fontSize: '25px', fontWeight: 600 },
        unitType: { fontSize: '17px', },

    }

    /**
     * @brief A functional UI component that will be used to display the number of beds, baths and sqft of the home
     * 
     * @param {number} number this parameter is used to showcase the number of units
     * @param {units} string this parameter is used to showcase the unit type
     * @returns {JSX.Element} a react element that stores some key stats about the property unit
     * 
     * @example
     * <UnitStats number={5} units={"Beds"} />
     */
    const UnitStats = ({ number, units }) => {
        return (
            <Typography variant={"h6"} color={'text.secondary'} sx={{ padding: '5px 0px 5px 0px' }}>
                {`${number} ${units}`}
            </Typography>
        )
    }
    return (
        <>
            <div style={unitInfoStyles.topSide.container}>
                <CardMedia
                    component={"img"}
                    image={"https://www.bankrate.com/2015/06/19095912/low-apprasials-and-condo-associations-can-trip-up-mortgages.jpg?auto=webp&optimize=high&crop=16:9"}
                    sx={unitInfoStyles.unitPicture}
                />
                <div style={unitInfoStyles.topSide.rightSide.container}>
                    <div style={unitInfoStyles.topSide.rightSide.unitInfoContainer}>
                        <Typography variant={"h5"} color={'text.primary'} sx={unitInfoStyles.unitNumber}>Unit 405</Typography>
                        <Typography variant={"h5"} color={'text.secondary'} sx={unitInfoStyles.unitPrice}>$1405</Typography>
                        <Typography variant={"h6"} color={'text.secondary'} sx={unitInfoStyles.unitType}>Studio</Typography>
                    </div>
                </div>
            </div >
            <div style={unitInfoStyles.bottomSide}>
                <UnitStats number={5} units={"Beds"} />
                <Divider orientation='vertical' />
                <UnitStats number={6} units={"Baths"} />
                <Divider orientation='vertical' />
                <UnitStats number={2560} units={"Sqft"} />
            </div>
        </>
    )
}

/**
 * @brief This functional UI component is the interactive portion of the card
 * 
 * @details 
 * - How ChangeDetails component is structured
    * - A dropdown menu that allows the user to change the Unit they selected
    * - Addon fields that allow the user to add roommates or pets
 * @returns {React.ReactElement} a react element that contains a unit selector, and ability to add additional entities to the property 
 */
function ChangeDetails() {

    const changeDetailsStyles = {
        unitSummary: { fontSize: '12px', width: '300px', padding: '10px 0px 10px 0px' },
        questionMarkIcon: { fontSize: "15px", margin: '0px 5px 0px 5px' },
        dropDownContainer: { display: 'flex', justifyContent: 'center' },
    }

    return (
        <>
            <Typography variant="h6" color="text.secondary" sx={changeDetailsStyles.unitSummary}>
                This person doesn't allow pets and a maximum of 2 people per bedroom
                <AiFillQuestionCircle style={changeDetailsStyles.questionMarkIcon} />
            </Typography>
            <div style={changeDetailsStyles.dropDownContainer}>
                <DropDownMenu
                    required="true"
                    label="Unit Selection"
                    menuItem={["Unit 405", "Unit 523", "Unit 242"]}
                />,
            </div>
            <Addons field={"Bunkmates"} />
            <Addons field={"Pets"} />
        </>
    )
}

/**
 * @brief This functional UI component allows users to add additional entities that will be joining them in the property
 * 
 * @details Child component of ChangeDetails
 * @param {string} field this parameter determines which addon to increment and decrement
 * @returns {React.ReactElement} a react element that contains an addition to the property
 * 
 * @example 
 * <Addons field={"Bunkmates"} />
 */
function Addons({ field }) {

    const addonStyles = {
        container: {
            display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: '0px 10px 0px 10px', alignItems: 'center'
        },
        field: { fontWeight: '550', fontSize: '16px' },
        actionContainer: { display: 'flex', flexDirection: 'row', alignItems: 'center', },
        addonCount: { fontSize: '18px', padding: '5px 10px 0px 10px', minWidth: '45px', display: 'flex', justifyContent: 'center' },
    }

    //Limit of addons set by landlord
    const bunkmateLimit = 2
    const petLimit = 0;

    //define state variable for keeping track of number of roommates
    const [bunkmateCount, setBunkmateCount] = useState(0);
    //define state variable for keeping track of number of pets
    const [petCount, setPetCount] = useState(0);
    //define state variable for disabling increment button
    const [incrementDisabled, setIncrementDisabled] = useState(false);
    //define state variable for disabling decrement button
    const [DecrementDisabled, setDecrementDisabled] = useState(false);

    /**
     * @brief This event handler increments the count
     * @details 
     * - can be used for different fields
        * - if the count is less than the limit then increment by 1
     * @see setBunkmateCount set state for number
     * @see setPetCount set state for number
     */
    const handleIncrement = () => {
        if (field === "Bunkmates" && bunkmateCount < bunkmateLimit) {
            setBunkmateCount(bunkmateCount + 1);
        } else if (field === "Pets" && petCount < petLimit) {
            setPetCount(petCount + 1);
        }
    };

    /**
     * @brief This event handler decrements the count
     * @details 
     * - can be used for different fields
        * - if the count is greater than 0 then decrement by 1
     * @see setBunkmateCount set state for number
     * @see setPetCount set state for number
     */
    const handleDecrement = () => {
        if (field === "Bunkmates" && bunkmateCount > 0) {
            setBunkmateCount(bunkmateCount - 1);
        } else if (field === "Pets" && petCount > 0) {
            setPetCount(petCount - 1);
        }
    };

    //useEffect hook is dependent on bunkmateCount and petCount
    useEffect(() => {
        /** 
         * @brief function only disables increment hook when limit is reached and when count reaches 0
         * @see setIncrementDisabled increment disabled / increment not disabled state
         * @see setDecrementDisabled decrement disabled / decrement not disabled state
         */
        const buttonDisabled = () => {
            if (field === "Bunkmates") {
                setIncrementDisabled(bunkmateCount === bunkmateLimit);
                setDecrementDisabled(bunkmateCount === 0);
            } else if (field === "Pets") {
                setIncrementDisabled(petCount === petLimit);
                setDecrementDisabled(petCount === 0);
            }
        }

        buttonDisabled();

    }, [bunkmateCount, petCount]);


    return (
        <div style={addonStyles.container}>
            <Typography variant='h6' color="text.secondary" sx={addonStyles.field}>
                {field}
            </Typography>
            <div style={addonStyles.actionContainer}>
                <IconButton onClick={handleDecrement} disabled={DecrementDisabled}>
                    <AiFillMinusCircle size={20} />
                </IconButton>
                <Typography style={addonStyles.addonCount}>
                    {field === "Bunkmates" ? bunkmateCount : petCount}
                </Typography>
                <IconButton onClick={handleIncrement} disabled={incrementDisabled}>
                    <AiFillPlusCircle size={20} />
                </IconButton>
            </div>
        </div>
    )

}
