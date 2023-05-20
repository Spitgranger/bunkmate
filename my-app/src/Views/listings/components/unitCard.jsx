import React from "react"
import { Card, CardMedia, CardContent, Typography, CardActionArea, Divider, } from "@mui/material"
import { ActionButton } from "../../../Components/Utils/Form";
import { Link, useNavigate } from "react-router-dom";

/**
 * @function UnitCard
 * 
 * @brief This functional UI component contains key details about all units and individual units as well
 * @details
    * Structure of this UI component
        * 1. Price Range of the units 
        * 2. Sqft Range of the units 
        * 3. Individual Unit details
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @returns {React.ReactElement} a react element that contains price and sqft range of all units and contains details of individual units within the property
 */
export default function UnitCard({ data }) {

    const unitCardStyles = {
        cardContainer: { width: '85%', padding: '30px', borderRadius: '10px', margin: '20px' },
        priceRange: { padding: '5px', fontWeight: 600 },
        sqftRange: { padding: '5px', fontWeight: 600 },
        actionButtonContainer: {
            display: 'flex', justifyContent: 'row',
            applyNowContainer: { textDecoration: 'none', width: '100%', },
            bookTourContainer: { width: '100%', margin: '0px 10px 0px 10px' },
        },
    }


    return (
        <Card sx={unitCardStyles.cardContainer} raised={true}>
            <Typography color="text.primary" variant="h5" sx={unitCardStyles.priceRange} >
                {`$${data.listing_details.priceRange[0]} - $${data.listing_details.priceRange[1]}`}
            </Typography>
            <Typography color="text.secondary" variant="h6" sx={unitCardStyles.sqftRange} >
                {`${data.listing_details.sqftRange[0]} Sqft - ${data.listing_details.sqftRange[1]} Sqft`}
            </Typography>
            {data.listing_details.units.map((unitData, index) => {
                return (<Unit data={data} unitData={unitData} index={index} />)
            })}
        </Card>
    )
}


/**
 * @brief This functional UI component contains key details about individual units
 * @details
    * Structure of this UI component
        * 1. Interior floorplan layout diagram
        * 2. Unit Number
        * 3. Unit Type
        * 4. Unit Price
        * 5. Number of Beds
        * 6. Number of Baths
        * 7. Square Footage
        * 8. Date Available
 * @param {object} unitData stores unit info
 * @param {number} index stores index of unit from list of units
 * @returns {React.ReactElement} a react element that contains information on the individual units in a propertyj
 */
export function Unit({ data, unitData, index }) {

    const unitStyles = {
        container: { borderRadius: '10px', padding: '10px', width: '100%', display: 'flex', justifyContent: 'flex-start' },
        unitImage: { width: "30%", height: '100%', borderRadius: '5%' },
        unitContainer: {
            width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100px', padding: '0px 10px 0px 10px !important',
            firstRow: {
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%',
                title: { fontWeight: 600, paddingRight: '2px', fontSize: '18px' },
                type: { fontWeight: 600, paddingLeft: '2px' }
            },
            price: { fontWeight: 600, fontSize: '20px' },
            beds: { display: 'flex', flexDirection: 'row' },
            divider: { margin: '0px 5px 0px 5px' }
        },
    }

    //Define the state variable for managing the open and close state for viewing more details about a unit (modal window)
    const navigate = useNavigate();

    /**
     * @brief This event handler navigates to l2Details
     */
    const handleOpenViewUnit = () => {
        navigate('/l2Details', { state: { data: data, index: index } })
    }

    return (
        <>
            <CardActionArea sx={unitStyles.container} onClick={handleOpenViewUnit}>
                <CardMedia sx={unitStyles.unitImage} component="img" image={unitData.coverImage} />
                <CardContent sx={unitStyles.unitContainer}>
                    <div style={unitStyles.unitContainer.firstRow}>
                        <Typography color="text.secondary" sx={unitStyles.unitContainer.firstRow.title}>
                            {unitData.title}
                        </Typography>
                        <Typography color="text.secondary" sx={unitStyles.unitContainer.firstRow.type}>
                            {unitData.type}
                        </Typography>
                    </div>
                    <Typography color="text.primary" variant="h4" sx={unitStyles.unitContainer.price}>
                        {`$${unitData.price}`}
                    </Typography>
                    <div style={unitStyles.unitContainer.beds}>
                        <Typography color="text.secondary">
                            {`${unitData.beds} Beds`}
                        </Typography>
                        <Divider orientation="vertical" sx={unitStyles.unitContainer.divider} />
                        <Typography color="text.secondary">
                            {`${unitData.baths} Baths`}
                        </Typography>
                        <Divider orientation="vertical" sx={unitStyles.unitContainer.divider} />
                        <Typography color="text.secondary">
                            {`${unitData.sqft} Sqft`}
                        </Typography>
                    </div>
                    <Typography color="text.secondary">
                        {`Available: ${unitData.dateAvailable}`}
                    </Typography>
                </CardContent>
            </CardActionArea >
            <div style={{ width: '100%', padding: '10px' }}>
                <Divider sx={{ width: '100%' }} />
            </div>
        </>
    )
}
