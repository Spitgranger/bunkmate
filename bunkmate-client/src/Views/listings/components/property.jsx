import React, { useEffect, useState } from "react"
import { Avatar, CardContent, Typography, Divider, } from "@mui/material"

/**
 * @function Property
 *
 * @brief A functional UI component that displays information on the property
 *
 * @details
 * How Property is structured
 * 1. Property Management Avatar
 * 2. Property Management Name
 * 3. Property Management Address
 * 4. Property Management Phone Number
 * 5. Property Description
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @returns {React.ReactElement} a react element that contains information on the property management team and description of the property itself
 */
export default function Property({ data }) {

    const propertyStyles = {
        container: { margin: '20px 0px 20px 0px' },
        title: { padding: '10px 0px 10px 0px ', fontWeight: 600, },
        propertyContainer: { padding: '5px' },
        viewMore: {
            container: { width: '100%' },
            viewMoreButton: { color: 'grey', cursor: 'pointer' }
        }
    }

    const maxCharacterLength = 300
    //state management for how many characters of the overview is seen at any given time
    const [overviewLength, setOverviewLength] = useState(maxCharacterLength)
    //state management for checking if the character count is over the limit
    const [overflow, setOverflow] = useState(false)
    //State management for viewing more or less of the property description
    const [viewMore, setViewMore] = useState(false)
    //state management for text overflow ellipsis
    const [textOverflowEllipsis, setTextOverflowEllipsis] = useState("...")

    /**
     * @brief //Used on initial render to determine if view more functionality is needed
     *
     * @details
     * logical Flow
     * 1. if the listing details is less than a certain character length then the text overflow ellipsis isn't needed and the text isn't considered to be overflowing
     * 2. else if listing details is more than a certain character length then the text overflow ellipsis is added, the text is considered to be overflowing and the character length allotted is increased
     * @see setOverflow true / false overflow
     * @see textOverflowEllipsis true / false text overflow ellipsis
     * @see overViewLength number of characters seen
     */
    const PropertyDescription = () => {
        if (data.listing_details.overview.length <= maxCharacterLength) {
            setOverflow(false)
            return (data.listing_details.overview)
        } else if (data.listing_details.overview.length > maxCharacterLength) {
            setOverflow(true)
            return (data.listing_details.overview.substring(0, overviewLength) + textOverflowEllipsis)
        }
    }

    /**
     * @brief This event handler uses the setSaveListing state to toggle the saveListing state between true and false.
     *
     * @details If setViewMore is currently false then set to true and vice versa
     * @see setViewMore View More / View Less state
     */
    const handleViewMore = () => {
        setViewMore(!viewMore)
    }

    //useEffect hook for Changing character limit and showing text overflow ellipsis depending on view more state
    useEffect(() => {
        if (viewMore) {
            setOverviewLength(data.listing_details.overview.length)
            setTextOverflowEllipsis("")
        } else if (!viewMore) {
            setOverviewLength(300)
            setTextOverflowEllipsis("...")
        }
    }, [handleViewMore])


    return (
        <div style={propertyStyles.container}>
            <Typography color="text.primary" variant="h5" sx={propertyStyles.title}>
                Property
            </Typography>
            <Typography color="text.secondary" sx={propertyStyles.propertyContainer}>
                <PropertyManagementInfo data={data} />
                <PropertyDescription />
            </Typography>
            {overflow
                ? <div style={propertyStyles.viewMore.container}>
                    <Divider sx={propertyStyles.viewMore.viewMoreButton}
                        onClick={handleViewMore}>{viewMore ? "View Less" : "View More"}</Divider>
                </div>
                : ""}
        </div>
    )
}

/**
 * @brief This functional UI component returns some key info on the property management company
 * @param {object} data this parameter stores data about the unit
 * @details
 * How PropertyManagementInfo component is structured
 * - Company Name
 * - Company Address
 * - Company Phone Number
 * @returns {React.ReactElement} a react element that returns some information about the property management team
 */
export function PropertyManagementInfo({ data }) {

    const propertyManagementStyles = {
        managementInfo: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '10px 0px 10px 0px',
            padding: '10px 0px 10px 0px !important'
        },
        Avatar: { width: '65px', height: '65px', margin: '0px 20px 0px 10px' },
        textInfo: {
            container: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
            place: { fontWeight: 700, fontSize: '17px' },
            address: { fontWeight: 700, fontSize: '15px' },
            number: { fontWeight: 700, fontSize: '15px' }
        },
    }
    return (
        <CardContent sx={propertyManagementStyles.managementInfo}>
            <Avatar sx={propertyManagementStyles.Avatar}
                src={'https://thumbs.dreamstime.com/b/b-letter-boutique-logo-design-159417325.jpg'} />
            <div style={propertyManagementStyles.textInfo.container}>
                <Typography color="text.primary" variant="h6" sx={propertyManagementStyles.textInfo.place}>
                    {data.listing_details.developerName}
                </Typography>
                <Typography color="text.secondary" variant="h6" sx={propertyManagementStyles.textInfo.address}>
                    {data.listing_details.address}
                </Typography>
                <Typography color="text.secondary" variant="h6" sx={propertyManagementStyles.textInfo.number}>
                    {data.listing_details.phoneNumber}
                </Typography>

            </div>
        </CardContent>
    )
}

