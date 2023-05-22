import React, { useEffect } from "react"
import { CardContent } from "@mui/material"
import Property from "./components/property"
import Policies from "./components/policies"
import Overview from "./components/overview"
import Amenities from "./components/amenities"
import Gallery from "./components/gallery"
import StaticInfoBox from "./components/staticInfoBox"
import { useLocation } from "react-router"
import Navbar from "../../Components/Navbar"

/**
 * @function L2Details
 *
 * @brief (Child Component of Unit function) Renders the L2Details component, which displays information about the lowest level of a property listing (building).
 *
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @param {number} index stores the index of the unit details (parent component is in unitCard.jsx)
 * @details
 * How L2Details is structured
    * - Gallery
    * - StaticInfoBox
    * - Bedrooms (situational)
    * - Overview
    * - Property
    * - Amenities
    * - Policies
 * @returns {React.ReactElement} a react element that contains a wealth of information about the property
 */
export default function L2Details() {

    const l2DetailsStyles = {
        page: { width: '100%', display: 'flex', justifyContent: 'center' },
        container: {
            display: 'flex', justifyContent: 'center', flexDirection: "row", width: '75vw', padding: '40px',
            rightSide: {
                margin: '10px',
                width: '40%',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
            },
            keyInfo: {
                margin: '10px',
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                overflowY: 'scroll'
            },
        },
    }

    const { state } = useLocation();
    const { data, index } = state
    const images = data.listing_details.units[index]

    //useEffect used to render the top of the page instead of the bottom
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [state]);

    return (
        <>
            <Navbar />
            <div style={{ height: '9vh' }} />
            <div style={l2DetailsStyles.page}>
                <div style={l2DetailsStyles.container}>
                    <Gallery data={images} orientation={"vertical"} />
                    <CardContent sx={l2DetailsStyles.container.rightSide}>
                        <StaticInfoBox data={data} index={index} />
                        <div style={l2DetailsStyles.container.keyInfo}>
                            <Overview />
                            <Property data={data} />
                            <Amenities />
                            <Policies />
                        </div>
                    </CardContent>
                </div>
            </div>
        </>
    )
}
