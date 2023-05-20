import React, { useState } from "react"
import { CardContent, Typography, IconButton, } from "@mui/material"
import { BsFillBookmarksFill, BsBookmarks } from "react-icons/bs";
import { IoShareSocialOutline, IoShareSocial } from "react-icons/io5";
import Actions from "./Actions";

/**
 * @function TopInfoBar
 *
 * @brief A functional UI component for the Top Bar of the listing details page
 *
 * @details
 * How the TopInfoBar is structured
 * 1. The Name of the property
 * 2. The Address of the property
 * 3. Share button
 * 4. Save button
 * @param {object} data stores listing info that will be used to populate the listing details page
 * @returns {React.ReactElement} A react element that contains the header content
 */
export default function TopInfoBar({ data }) {

    const topInfoBarStyles = {
        container: { display: 'flex', alignItems: 'flex-start', flexDirection: 'column', padding: '0px 20px 0px 20px' },
        developerName: { padding: '20px 0px 0px 0px', fontWeight: 800, },
        subBar: {
            container: { display: 'flex', justifyContent: 'space-between', width: '100%', },
            address: { padding: '5px' },
        }
    }
    return (

        <CardContent sx={topInfoBarStyles.container}>
            <Typography color="text.primary" variant="h4" sx={topInfoBarStyles.developerName}>
                {data.listing_details.developerName}
            </Typography>
            <div style={topInfoBarStyles.subBar.container}>
                <Typography color="text.secondary" variant="h5" sx={topInfoBarStyles.subBar.address}>
                    {data.listing_details.address}
                </Typography>
                <Actions />
            </div>
        </CardContent>
    )
}
