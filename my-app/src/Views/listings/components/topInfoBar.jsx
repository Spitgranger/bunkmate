import React, {useState} from "react"
import {CardContent, Typography, IconButton,} from "@mui/material"
import {BsFillBookmarksFill, BsBookmarks} from "react-icons/bs";
import {IoShareSocialOutline, IoShareSocial} from "react-icons/io5";

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
export default function TopInfoBar({data}) {

    const topInfoBarStyles = {
        container: {display: 'flex', alignItems: 'flex-start', flexDirection: 'column', padding: '0px 20px 0px 20px'},
        developerName: {padding: '20px 0px 0px 0px', fontWeight: 800,},
        subBar: {
            container: {display: 'flex', justifyContent: 'space-between', width: '100%',},
            address: {padding: '5px'},
            actions: {
                container: {display: 'flex', flexDirection: 'row', alignItems: 'center',},
                action: {padding: '0px 5px 0px 5px', fontSize: '15px'},
            },

        }
    }

    // Define state variable for tracking whether the user has saved a listing
    const [saveListing, setSaveListing] = useState(false)
    // Define state variable for tracking whether the user has shared a listing
    const [shareListing, setShareListing] = useState(false)


    /**
     * @brief This event handler uses the setSaveListing hook to toggle the saveListing state between true and false.
     *
     * @details If saveListing is currently true, this function sets it to false. If it's false, this function sets it to true.
     * @see setSaveListing save / unsaved state
     */
    const handleSaveListing = () => {
        setSaveListing(!saveListing)
    }

    /**
     * @brief This event handler uses the setShareListing hook to toggle the saveListing state between true and false.
     *
     * @details If shareListing is currently true, this function sets it to false. If it's false, this function sets it to true.
     * @see setShareListing share / unshared state
     */
    const handleShareListing = () => {
        setShareListing(!shareListing)
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
                <div style={topInfoBarStyles.subBar.actions.container}>
                    <IconButton onClick={handleShareListing}>
                        {shareListing ? <IoShareSocial/> : <IoShareSocialOutline/>}
                    </IconButton>
                    <Typography color="text.primary" variant="h6" sx={topInfoBarStyles.subBar.actions.action}>
                        Share
                    </Typography>
                    <IconButton onClick={handleSaveListing}>
                        {saveListing ? <BsFillBookmarksFill/> : <BsBookmarks/>}
                    </IconButton>
                    <Typography color="text.primary" variant="h6" sx={topInfoBarStyles.subBar.actions.action}>
                        Save
                    </Typography>
                </div>
            </div>
        </CardContent>
    )
}
