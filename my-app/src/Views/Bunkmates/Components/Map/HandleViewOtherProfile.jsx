import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
const capitalizedName = (name) => {
    return `${name.charAt(0).toUpperCase() + name.slice(1)}`
};

//stores the request and profile data in parent component, it also navigates and provides data to OtherProfile.jsx 
const HandleViewOtherProfile = ({ data, content }) => {
    //data prop is referencing user's request, profiles, and posts to make nested map card profile viewer, createPost and postCard compatible as well
    if (data && content) {
        return (
            <Tooltip title={`View ${capitalizedName(data.firstName ?? data.profile[0].firstName)}'s profile`} arrow>
                <Link
                    to={"/otherprofile"}
                    state={data}
                    style={{ textDecoration: 'none' }}
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