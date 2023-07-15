import {Avatar, Menu, MenuItem, Divider, Tooltip, IconButton, ListItemIcon} from '@mui/material';
import React, {useState, useContext} from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LoginIcon from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import {SignInContext} from "../../../globalContext/SignInContext";
import {Profile} from 'MapTypes'

interface AccountDropdownProps {
    handleLogout: () => void
    user: string
    userProfile: Profile
}

/**
 * @constructor
 *
 * @brief an avatar component that when clicked displays a dropdown menu
 *
 * @param {Function} handleLogout
 * @param {string} user
 * @param {object} userProfile
 * @returns {JSX.Element} an avatar component and dropdown menu
 */
const AccountDropdown = ({handleLogout, user, userProfile}: AccountDropdownProps) => {
    console.log(user)
    //controls the tethered and untethered state drop down menu
    const [currentTarget, setCurrentTarget] = useState(null)
    //open close state of dropdown menu
    const open = Boolean(currentTarget)
    //used to manage the open close state of the modal window as well as the modal window content
    const {handleSignInEmail, handleSignUpEmail} = useContext(SignInContext);


    //controls what react element the dropdown menu is tethered to
    const handleClick = (event): void => {
        setCurrentTarget(event.currentTarget);
    }

    //un-tethers the dropdown menu to the React element
    const handleClose = () => {
        setCurrentTarget(null)
    }

    return (
        <>
            <Tooltip className="userAccount" title={user ? `My Account` : 'Sign in or Sign up'}>
                <label>
                    <a style={{display: 'flex', alignItems: 'center', height: '21px'}}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{padding: '0px'}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <div className="avatar-container"
                                 style={{backgroundColor: 'white', padding: '3px', borderRadius: '50%'}}>
                                <Avatar src={userProfile?.picture} className="Avatar"
                                        alt={user?.result?.email}>{user?.result?.email?.charAt(0)}</Avatar>
                            </div>

                        </IconButton>
                    </a>
                </label>
            </Tooltip>
            <AccountDropDownMenu open={open} handleClose={handleClose} currentTarget={currentTarget}>
                {user
                    ? <>
                        <StyledMenuItem icon={<AssignmentIndIcon/>}
                                        pageName={`${user?.result?.name}'s account`}/>
                        <Divider/>
                        <StyledMenuItem handleAction={handleLogout} icon={<Logout/>} pageName={"Logout"}/>
                    </>
                    : <>
                        <StyledMenuItem handleAction={handleSignUpEmail}
                                        icon={<AssignmentIndIcon/>}
                                        pageName={"Sign Up"}/>
                        <Divider/>
                        <StyledMenuItem handleAction={handleSignInEmail}
                                        icon={<LoginIcon/>}
                                        pageName={"Sign In"}/>
                    </>
                }
                {/*
                <StyledMenuItem icon={<ConnectWithoutContactIcon/>} pageName={"Contact"}/>
                <StyledMenuItem icon={<SettingsApplications/>} pageName={"Settings"}/>
                <StyledMenuItem icon={<HelpCenterIcon/>} pageName={"Help"}/>
                */}
            </AccountDropDownMenu>
        </>)
}
export default AccountDropdown;


/**
 * @brief The drop-down menu component
 *
 * @param {JSX.Element} children the menu items that will be inside the dropdown menu
 * @param {boolean} open opens when the referenced target is clicked
 * @param {Function} handleClose clicking away from referenced target closes the drop-down menu
 * @param {HTMLElement | null} currentTarget the component to which the dropdown menu is anchored to
 *
 * @details
 * - if the user has an account it will display their name and the option to logout
 * - if the user doesn't have an account the dropdown menu will allow them to sign up or sign in
 *
 * @returns {JSX.Element} the entire drop-down menu with its menu items
 */
const AccountDropDownMenu = ({children, open, handleClose, currentTarget}) => {

    const dropDownStyles = {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32, height: 32, ml: -0.5, mr: 1,
        }, '&:before': {
            content: '""', display: 'black', position: 'absolute',
            top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)', zIndex: 99999,
        },
    }

    return (
        <>
            <Menu
                anchorEl={currentTarget}
                id="account-menu"
                open={open}
                onClose={handleClose}
                MenuListProps={{sx: {display: 'flex', flexDirection: 'column'}}}
                PaperProps={{
                    elevation: 0,
                    sx: {dropDownStyles},
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                {children}
            </Menu>
        </>
    )
}

interface StyledMenuItemProps {
    pageName: string
    icon: React.ReactElement
    handleAction: () => void
}

/**
 * @brief component for a single menu item within the drop-down menu
 *
 * @param pageName the name of the page
 * @param icon the associated icon
 * @param handleAction event handler for on click event listener
 * @returns {JSX.Element} a styled menu item for the account drop down menu component
 */
const StyledMenuItem = ({pageName, icon, handleAction}: StyledMenuItemProps) => {

    return (
        <MenuItem sx={{padding: '10px', color: 'black'}} onClick={handleAction}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            {pageName}
        </MenuItem>
    )
}
