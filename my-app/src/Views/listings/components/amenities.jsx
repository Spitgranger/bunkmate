import React from "react"
import {Typography} from "@mui/material"
import {FaSwimmingPool} from "react-icons/fa";
import {CgGym} from "react-icons/cg";
import {TbElevator} from "react-icons/tb";
import {RiParkingBoxLine} from "react-icons/ri";
import {IoMdBasketball} from "react-icons/io";
import {BiParty} from "react-icons/bi";

/**
 * @function Amenities
 *
 * @brief This functional UI component returns the amenities offered by the property
 *
 * @returns {React.ReactElement} a react element that contains the key amenities found on the property
 */
export default function Amenities() {

    const amenitiesStyles = {
        title: {marginTop: '20px', padding: '10px 0px 10px 0px ', fontWeight: 600,},
        container: {display: 'flex', justifyContent: 'space-between', width: '100%'},
        column: {
            width: '100%',
            margin: '10px 0px 10px 0px',
            flexFlow: 'column wrap',
            height: '130px',
            display: 'flex',
            justifyContent: 'flex-start'
        },
        viewAll: {borderBottom: '1px solid black', cursor: 'pointer'}
    }


    return (
        <>
            <Typography color="text.primary" variant="h5" sx={amenitiesStyles.title}>
                Amenities
            </Typography>
            <div style={amenitiesStyles.container}>
                <div style={amenitiesStyles.column}>
                    <Amenity icon={<CgGym/>} amenity={"Gym"}/>
                    <Amenity icon={<FaSwimmingPool size={20}/>} amenity={"Pool"}/>
                    <Amenity icon={<TbElevator size={20}/>} amenity={"Elevator"}/>
                </div>
                <div style={amenitiesStyles.column}>
                    <Amenity icon={<BiParty size={20}/>} amenity={"Party Room"}/>
                    <Amenity icon={<IoMdBasketball size={20}/>} amenity={"Games Room"}/>
                    <Amenity icon={<RiParkingBoxLine size={20}/>} amenity={"Parking"}/>
                </div>
            </div>
            <Typography color="text.secondary" sx={amenitiesStyles.viewAll}>View All</Typography>
        </>
    )
}

/**
 * @brief This functional UI component returns an amenity offered by the property accompanied by an Icon
 *
 * @param {React.ReactElement} icon the icon that's used to complement amenity listed
 * @param {string} amenity an amenity offered by the property
 * @returns {React.ReactElement} a react element that contains one the amenities that's offered by the property with an icon of the amenity
 *
 * @example
 * <Amenity icon={<MdFillAlarm />} amenity={"Smoke Alarm"}/>
 */
export function Amenity({icon, amenity}) {

    const amenityStyle = {
        amenity: {
            container: {display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px',},
            amenityPoint: {fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px'}
        },
    }
    return (
        <div style={amenityStyle.amenity.container}>
            {icon}
            <Typography noWrap color="text.secondary" variant="h5" sx={amenityStyle.amenity.amenityPoint}>
                {amenity}
            </Typography>
        </div>
    )
}