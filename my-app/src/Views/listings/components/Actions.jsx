import React, { useState } from "react"
import { CardContent, Typography, IconButton, } from "@mui/material"
import { BsFillBookmarksFill, BsBookmarks } from "react-icons/bs";
import { IoShareSocialOutline, IoShareSocial } from "react-icons/io5";

/**
 * @function Actions 
 *
 * @brief A functional UI component for the Top Bar and static info box that allows the user to save and share the post
 *
 * @details
 * How Actions is structured
 * 1. Save (save the listing)
 * 2. Share (share the listing)
 * @returns {React.ReactElement} A react element that contains a share and save button with their respective logos
 */
export default function Actions() {

    const styles = {
        container: { display: 'flex', flexDirection: 'row', alignItems: 'center', },
        action: { padding: '0px 5px 0px 5px', fontSize: '15px' },

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
        <div style={styles.container}>
            <IconButton onClick={handleShareListing}>
                {shareListing ? <IoShareSocial /> : <IoShareSocialOutline />}
            </IconButton>
            <Typography color="text.primary" variant="h6" sx={styles.action}>
                Share
            </Typography>
            <IconButton onClick={handleSaveListing}>
                {saveListing ? <BsFillBookmarksFill /> : <BsBookmarks />}
            </IconButton>
            <Typography color="text.primary" variant="h6" sx={styles.action}>
                Save
            </Typography>
        </div>
    )
}
