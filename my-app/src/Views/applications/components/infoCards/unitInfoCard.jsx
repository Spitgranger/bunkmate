import {  CardContent, Card, Typography, IconButton, Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles'
import { CardMedia } from "@mui/material/";
import Divider from "@mui/material/Divider";
import { AiFillQuestionCircle } from 'react-icons/ai';
import { DropDownMenu } from '../../../../Components/Utils/Form';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUnitIndex, setBunkmateCount, setPetCount } from '../../../../features/applications/applicationsSlice';

/**
 * @function UnitInfoCard
 * 
 * @brief This functional UI card component that always sits on the right side of the screen and reminds the user about unit key details and allows them to change some parameters
 *
 * @param {object} data this object stores data on the unit
 * @param {number} index this number represents the index within the listings page
 * @details 
 * - How UnitInfoCard is structured 
    * - UnitInfo (info about the unit in the topside of the card)
    * - ChangeDetails (interactive component that allows the user to make last minute modifications, found in the bottom side of the card)
 * @returns {React.ReactElement} a react element that contains information about the Unit as well as the ability to modify your application
 */
export default function UnitInfoCard({ data, index }) {

    const cardStyles = {
        padding: '5% 5% 10% 5%', margin: '2%', borderRadius: '20px', display: 'flex', flexDirection: 'column', minWidth: '350px',
    }

    return (
        <Card raised sx={cardStyles}>
            <UnitInfo data={data} index={index} />
            <Divider />
            <ChangeDetails data={data} index={index} />
        </Card>
    )

}


/**
 * @brief a functional UI component that displays information on the selected unit
 * 
 * @param {object} data this parameter stores data on the unit
 * @param {number} index this parameter represents the index within the listings page
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
function UnitInfo({ data, index }) {

    const unitInfoStyles = {
        topSide: {
            container: { padding: '10px 0px 10px 0px', display: 'flex', flexDirection: 'row' },
            rightSide: {
                container: { display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', padding: '5px 20px 0px 20px !important' },
                unitInfoContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }
            },
        },
        bottomSide: {
            display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '10px 0px 10px 0px', height: '100%',
        },
        unitPicture: { width: '150px', height: '110px', borderRadius: '10px' },
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

    //extract unit data from listing data
    const unitData = data.listing_details.units[index]

    return (
        <>
            <div style={unitInfoStyles.topSide.container}>
                <CardMedia
                    component={"img"}
                    image={data.listing_details.units[index].listing_img[0]}
                    sx={unitInfoStyles.unitPicture}
                />
                <CardContent sx={unitInfoStyles.topSide.rightSide.container}>
                    <div style={unitInfoStyles.topSide.rightSide.unitInfoContainer}>
                        <Typography variant={"h5"} color={'text.primary'} sx={unitInfoStyles.unitNumber}>{unitData.title}</Typography>
                        <Typography variant={"h5"} color={'text.secondary'} sx={unitInfoStyles.unitPrice}>{`$${unitData.price}`}</Typography>
                        <Typography variant={"h6"} color={'text.secondary'} sx={unitInfoStyles.unitType}>{unitData.type}</Typography>
                    </div>
                </CardContent>
            </div >
            <div style={unitInfoStyles.bottomSide}>
                <UnitStats number={unitData.beds} units={"Beds"} />
                <Divider orientation='vertical' />
                <UnitStats number={unitData.baths} units={"Baths"} />
                <Divider orientation='vertical' />
                <UnitStats number={unitData.sqft} units={"Sqft"} />
            </div>
        </>
    )
}

/**
 * @brief This functional UI component is the interactive portion of the card
 * 
 * @param {object} data this parameter stores data on the unit
 * @param {number} index this parameter represents the index within the listings page
 * @details 
 * - How ChangeDetails component is structured
    * - A dropdown menu that allows the user to change the Unit they selected
    * - Addon fields that allow the user to add roommates or pets
 * @returns {React.ReactElement} a react element that contains a unit selector, and ability to add additional entities to the property 
 */
function ChangeDetails({ data, index }) {

    const changeDetailsStyles = {
        policyStatement: { fontSize: '12px', width: '300px', padding: '15px 10px 15px 10px' },
        dropDownContainer: { display: 'flex', justifyContent: 'center' },
    }

    const dispatch = useDispatch();

    //stores the dropdown menu items
    const dropDownItems = data.listing_details.units.map(unit => {
        return unit.title
    })

    /**
     * @brief this event handler uses the unit title to get the index within the array which is then stored in the global store
     * 
     * @param {object} e event
     * @see setUnitIndex global state for indexing unit data
     */
    const handleListChange = (e) => {
        dispatch(setUnitIndex(dropDownItems.indexOf(e.target.value)))
    }

    return (
        <>
            <Typography variant="h6" color="text.secondary" sx={changeDetailsStyles.policyStatement}>
                This person doesn't allow pets and a maximum of 2 people per bedroom
            </Typography>
            <div style={changeDetailsStyles.dropDownContainer}>
                <DropDownMenu
                    required={true}
                    label="Unit Selection"
                    menuItem={dropDownItems}
                    onChange={handleListChange}
                    value={data.listing_details.units[index].title}
                />,
            </div>
            <Addons field={"Bunkmates"} data={data} index={index} />
            <Addons field={"Pets"} data={data} index={index} />
        </>
    )
}

/**
 * @brief A functional UI component that returns counters for the number of bunkmates and pets you're bringing into the unit
 * 
 * @param {string} field this parameter determines which addon to increment and decrement
 * @param {object} data this parameter stores data on the unit
 * @param {number} index this parameter represents the index within the listings page
 * @details Child component of ChangeDetails
 * @returns {React.ReactElement} a react element that contains an addition to the property
 * 
 * @example 
 * <Addons field={"Pets"} data={data} index={index} />
 */
function Addons({ field, data, index }) {

    const addonStyles = {
        container: {
            display: 'flex', justifyContent: 'space-between', flexDirection: 'row', padding: '0px 10px 0px 10px', alignItems: 'center'
        },
        field: { fontWeight: '550', fontSize: '16px', padding: '0px', margin: '0px' },
        subField: { fontSize: '12px', },
        actionContainer: { display: 'flex', flexDirection: 'row', alignItems: 'center', },
        addonCount: { fontSize: '18px', padding: '5px 10px 0px 10px', minWidth: '45px', display: 'flex', justifyContent: 'center' },
        serviceAnimal: { position: 'absolute', paddingTop: '35px', fontSize: '12px', borderBottom: '1px solid grey' },
        title: { fontSize: '18px', fontWeight: '600' },
        description: { fontSize: '15px' },
    }

    //Limit of addons set by landlord
    const bunkmateLimit = data.listing_details.units[index].bunkmateLimit;
    const petLimit = data.listing_details.units[index].petLimit

    //retrieve state from global store
    const dispatch = useDispatch();
    const bunkmateCount = useSelector(state => state.applications.bunkmateCount)
    const petCount = useSelector(state => state.applications.petCount)

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
            dispatch(setBunkmateCount(bunkmateCount + 1));
        } else if (field === "Pets" && petCount < petLimit) {
            dispatch(setPetCount(petCount + 1));
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
            dispatch(setBunkmateCount(bunkmateCount - 1));
        } else if (field === "Pets" && petCount > 0) {
            dispatch(setPetCount(petCount - 1));
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

    }, [bunkmateCount, petCount, bunkmateLimit, petLimit]);

    //useEffect hook resets count whenever new item from dropdownmenu is selected
    useEffect(() => {
        dispatch(setBunkmateCount(0));
        dispatch(setPetCount(0));
    }, [bunkmateLimit, petLimit])


    //styled tooltip
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(15),
            border: '1px solid #dadde9',
            padding: '20px',
            borderRadius: '10px'
        },
    }));

    return (
        <div style={addonStyles.container}>
            <div>
                <Typography variant='h6' color="text.secondary" sx={addonStyles.field}>
                    {field}
                </Typography>
            </div>
            {field === "Pets"
                ? <HtmlTooltip placement="left" arrow title={
                    <>
                        <Typography varaint="text.primary" variant="h6" sx={addonStyles.title}>
                            Bringing a Service Animal?
                        </Typography>
                        <Typography varaint="text.secondary" variant="h6" sx={addonStyles.description}>
                            Service animals aren’t pets, so there’s no need to add them here.
                        </Typography>
                    </>
                }>
                    <Typography color="text.secondary" variant="div" sx={addonStyles.serviceAnimal}>
                        Service animal?
                    </Typography>
                </HtmlTooltip>
                : null
            }
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
        </div >
    )

}
