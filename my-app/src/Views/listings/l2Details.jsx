import React from "react"
import { CardContent, Typography } from "@mui/material"
import Property from "./components/property"
import Policies from "./components/policies"
import Overview from "./components/overview"
import Ammenities from "./components/ammenities"
import Gallery from "./components/gallery"
import StaticInfoBox from "./components/staticInfoBox"
import { Unit } from "./components/unitCard"

/**
 * @function L2Details
 * 
 * @brief (Child Component of Unit function) Renders the L2Details component, which displays information about the lowest level of a property listing (building).
 * 
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @param {number} index stores the index of the unit details (parent component is in unitCard.jsx) 
 * @details 
    * How L2Details is structured
        * Gallery
        * StaticInfoBox
        * Bedrooms (situational)
        * Overview
        * Property
        * Ammenities
        * Policies
 * @returns {React.ReactElement} a react element that contains a wealth of information about the property
 */
export default function L2Details({ data, index }) {

    const images = data.listing_details.units[index]

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "row", width: '1200px', height: '80vh', overflowY: 'scroll', }}>
            <Gallery data={images} orientation={"vertical"} />
            <CardContent sx={{ margin: '10px', width: '40%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', }}>
                <StaticInfoBox data={data} index={index} />

                <div style={{ margin: '10px', width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', overflowY: 'scroll' }}>
                    <Typography color="text.primary" variant="h5" sx={{ padding: '10px 0px 10px 0px ', fontWeight: 600 }} >
                        Bedrooms
                    </Typography>
                    {data.listing_details.units.map((unitData) => {
                        return (<Unit unitData={unitData} data={data} index={index} />)
                    })}
                    <Overview />
                    <Property data={data} />
                    <Ammenities />
                    <Policies />
                </div>
            </CardContent>
        </div >
    )
}
