import React from "react"
import { Typography } from "@mui/material"
import { FaSwimmingPool } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { TbElevator } from "react-icons/tb";
import { RiParkingBoxLine } from "react-icons/ri";
import { IoMdBasketball } from "react-icons/io";
import { BiParty } from "react-icons/bi";

/**
 * @function Ammenities
 * 
 * @brief This functional UI component returns the ammenities offered by the property 
 * 
 * @returns {React.ReactElement} a react element that contains the key ammenities found on the property 
 */
export default function Ammenities() {

    const ammenitiesStyles = {
        title: { marginTop: '20px', padding: '10px 0px 10px 0px ', fontWeight: 600, },
        container: { display: 'flex', justifyContent: 'space-between', width: '100%' },
        column: { width: '100%', margin: '10px 0px 10px 0px', flexFlow: 'column wrap', height: '130px', display: 'flex', justifyContent: 'flex-start' },
        viewAll: { borderBottom: '1px solid black', cursor: 'pointer' }
    }


    return (
        <>
            <Typography color="text.primary" variant="h5" sx={ammenitiesStyles.title}>
                Ammenities
            </Typography>
            <div style={ammenitiesStyles.container}>
                <div style={ammenitiesStyles.column}>
                    <Ammenity icon={<CgGym />} ammenity={"Gym"} />
                    <Ammenity icon={<FaSwimmingPool size={20} />} ammenity={"Pool"} />
                    <Ammenity icon={<TbElevator size={20} />} ammenity={"Elevator"} />
                </div>
                <div style={ammenitiesStyles.column}>
                    <Ammenity icon={<BiParty size={20} />} ammenity={"Party Room"} />
                    <Ammenity icon={<IoMdBasketball size={20} />} ammenity={"Games Room"} />
                    <Ammenity icon={<RiParkingBoxLine size={20} />} ammenity={"Parking"} />
                </div>
            </div>
            <Typography color="text.secondary" sx={ammenitiesStyles.viewAll}>View All</Typography>
        </>
    )
}

/**
 * @brief This functional UI component returns an ammenity offered by the property accompanied by an Icon 
 * 
 * @param {React.ReactElement} icon the icon that's used to complement ammenity listed
 * @param {string} ammenity an ammenity offered by the property
 * @returns {React.ReactElement} a react element that contains one the ammenities that's offered by the property with an icon of the ammenity
 * 
 * @example
 * <Ammenity icon={<MdFillAlarm />} ammenity={"Smoke Alarm"}/>
 */
export function Ammenity({ icon, ammenity }) {

    const ammenityStyle = {
        ammenityContainer: {
            display: 'flex', flexDirection: 'row', padding: '10px 5px 10px 5px',
            ammenity: { fontWeight: 600, fontSize: '17px', margin: '0px 10px 0px 10px' }
        },
    }
    return (
        <div style={ammenityStyle.ammenityContainer}>
            {icon}
            <Typography noWrap color="text.secondary" variant="h5" sx={ammenityStyle.ammenityContainer.ammenity} >
                {ammenity}
            </Typography>
        </div>
    )
}