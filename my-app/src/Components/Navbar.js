import logo from './Assets/logo.svg';
import './Navbar.css';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import RenderWhich from '../routes/SignIn'
import { Avatar, Typography, Button, Menu, MenuItem, Divider, Tooltip, IconButton, ListItemIcon } from '@mui/material';
import { useState, useId, useContext } from 'react';
import { SignInOpenContext } from './GlobalStateManagement/SignInContext';
import { SignInModeContext } from './GlobalStateManagement/SignInContext';
import { SignInModalMessage } from './GlobalStateManagement/SignInContext';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SettingsApplications from '@mui/icons-material/SettingsApplications';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


function CheckActive({ to, page, ...props }) {
    const fullPath = useResolvedPath(to)
    const isActive = useMatch({ path: fullPath.pathname, end: true })

    return (
        <Link to={to} className={isActive ? "current" : ""} {...props}>
            {page}
        </Link>
    )
}



function Navbar() {
    const navigate = useNavigate()
    const id = useId()

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate("/");
        document.location.reload();

    }
    //used to manage user state
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    //used to manage modal window open close state
    const { setIsOpen } = useContext(SignInOpenContext)
    //used to manage content that is displayed in modal window
    const { setMode } = useContext(SignInModeContext)
    //used to manage the title within the modal window
    const { setMessage } = useContext(SignInModalMessage)
    //used to manage focused element state
    const [currentTarget, setCurrentTarget] = useState(null)

    const open = Boolean(currentTarget)

    const handleClick = (event) => {
        setCurrentTarget(event.currentTarget);
    }

    const handleClose = (event) => {
        setCurrentTarget(null)
    }

    const handleSignIn = () => {
        setMessage("Sign In With Email")
        setMode('signInEmail')
        setIsOpen(true)
    }

    const handleSignUp = () => {
        setMessage("Sign Up Now!")
        setMode('signUpEmail')
        setIsOpen(true)
    }

    const MenuItemsStyles = {
        padding: '10px',
        color: 'black'
    }



    function DropDownMenu({ children }) {
        return (
            <>
                <Menu
                    anchorEl={currentTarget}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ sx: { display: 'flex', flexDirection: 'column' } }}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'black',
                                position: 'absolute',

                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {children}
                </Menu>
            </>
        )
    }


    return (
        <nav>
            <Tooltip title={"Return Home"}>
                <div>
                    <CheckActive to="/" page={
                        <img src={logo} className="App-logo" alt="logo" />}>
                    </CheckActive>
                </div>
            </Tooltip>
            <ul>
                {/*<CheckActive to="/" page="Listings"></CheckActive> */}
                {/*<CheckActive to="/create" page="Post a Listing"></CheckActive>*/}
                <Tooltip className={"pageContainer"} title={"Find Roomates"}>
                    <div>
                        <CheckActive className="page" to="/bunkmates" page="Bunkmates"></CheckActive>
                    </div>
                </Tooltip>
                <Tooltip className={"pageContainer"} title={"Get Matched"}>
                    <div >
                        <CheckActive className="page" to="/applications" page="Applications"></CheckActive>
                    </div>
                </Tooltip>
                <Tooltip className={"pageContainer"} title={"Message Roomates"}>
                    <div>
                        <CheckActive className="page" to="/messages" page="Messages"></CheckActive>
                    </div>
                </Tooltip>
                <Tooltip className={"pageContainer"} title={"Message Roomates"}>
                    <div>
                        <CheckActive className="page" to="/" page="Profile"></CheckActive>
                    </div>
                </Tooltip>
                {/*hidden, used for Sign in pages*/}
                <RenderWhich />
                {user ? (
                    <>
                        <Tooltip className="Account" title={`My Account`}>
                            <label>
                                <a style={{ display: 'flex', alignItems: 'center', height: '21px' }}>
                                    <IconButton
                                        onClick={handleClick}
                                        id={`${id}-account`}
                                        size="small"
                                        sx={{ padding: '0px' }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar className="Avatar" alt={user?.response?.result?.email}>{user?.response?.result?.email?.charAt(0)}</Avatar>
                                    </IconButton>
                                </a>
                            </label>
                        </Tooltip>
                        <DropDownMenu>
                            <MenuItem sx={MenuItemsStyles} onClick={handleClose}>
                                <ListItemIcon>
                                    <AssignmentIndIcon />
                                </ListItemIcon>
                                {user?.response?.result?.email}
                            </MenuItem>
                            <Divider />
                            <MenuItem sx={MenuItemsStyles} onClick={handleClose}>
                                <ListItemIcon>
                                    <ConnectWithoutContactIcon />
                                </ListItemIcon>
                                Contact
                            </MenuItem>
                            <MenuItem sx={MenuItemsStyles} onClick={handleClose}>
                                <ListItemIcon>
                                    <SettingsApplications />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem sx={MenuItemsStyles} onClick={handleClose}>
                                <ListItemIcon>
                                    <HelpCenterIcon />
                                </ListItemIcon>
                                Help
                            </MenuItem>
                            <MenuItem sx={MenuItemsStyles} onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                Logout
                            </MenuItem>

                        </DropDownMenu>
                    </>
                ) :
                    <>
                        <Tooltip className="Account" title={'Sign in or Sign up'}>
                            <label>
                                <a style={{ display: 'flex', alignItems: 'center', height: '21px' }}>
                                    <IconButton
                                        onClick={handleClick}
                                        id={`${id}-account`}
                                        size="small"
                                        sx={{ padding: '0px' }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar alt={user?.response?.result?.email}>{user?.response?.result?.email?.charAt(0)}</Avatar>
                                    </IconButton>
                                </a>
                            </label>
                        </Tooltip>
                        <DropDownMenu>
                            <MenuItem sx={MenuItemsStyles} onClick={handleSignUp}>
                                <ListItemIcon>
                                    <AssignmentIndIcon />
                                </ListItemIcon>
                                Sign Up
                            </MenuItem>
                            <MenuItem sx={MenuItemsStyles} onClick={handleSignIn}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                Sign In
                            </MenuItem >
                            <Divider />
                            <MenuItem sx={MenuItemsStyles} onClick={handleClose}>
                                <ListItemIcon>
                                    <ConnectWithoutContactIcon />
                                </ListItemIcon>
                                Contact
                            </MenuItem>
                            <MenuItem sx={MenuItemsStyles} onClick={handleClose}>
                                <ListItemIcon>
                                    <SettingsApplications />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem sx={MenuItemsStyles} onClick={handleClose}>
                                <ListItemIcon>
                                    <HelpCenterIcon />
                                </ListItemIcon>
                                Help
                            </MenuItem>
                        </DropDownMenu>
                    </>
                }
            </ul >
        </nav >
    );
}

export default Navbar;
