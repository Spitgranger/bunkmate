import {Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import React from 'react'
import {Profile, Request} from 'MapCardTypes'

interface HandleViewOtherProfileProps {
    data: Profile | Request
    content: React.ReactNode
}

/**
 * @brief navigation wrapper used to navigate to other people's profiles
 *
 * @param {Profile | Request} data can use either the Profile or Request object
 * @param {React.ReactNode} content component usually has an event listener or is designed to be clicked
 *
 * @returns {React.ReactNode} tooltip and wrapper link to other profile page
 */
const HandleViewOtherProfile = ({data, content}: HandleViewOtherProfileProps): React.ReactNode | string => {
    //data prop is referencing user's request, profiles, and posts to make nested map card profile viewer, createPost and postCard compatible as well
    if (data && content) {
        //use type predicates for explicit type assertion
        return (
            <Tooltip title={`View ${(data as Profile).firstName ?? (data as Request).profile[0].firstName}'s profile`}
                     arrow>
                <Link
                    to={"/otherprofile"}
                    state={data}
                    style={{textDecoration: 'none'}}
                >
                    {content}
                </Link>
            </Tooltip>
        )
    } else {
        return ""
    }
}
export default HandleViewOtherProfile;