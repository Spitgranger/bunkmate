import logo from './Assets/logo.svg';
import './Navbar.css';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import RenderWhich from '../routes/SignIn'
import { Avatar, Typography, Button, Menu, MenuItem, Divider, Tooltip, IconButton, ListItemIcon } from '@mui/material';
import { useState, useId, useContext, useEffect } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SettingsApplications from '@mui/icons-material/SettingsApplications';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { getProfile } from '../api';
import { SignInContext } from './GlobalStateManagement/SignInContext';


function Navbar({ chooseStyle }) {

    const id = useId()
    const [navStyle, setNavStyle] = useState("nav")

    const CheckActive = ({ to, page, ...props }) => {
        //check if the page is the currently active page, if so then highlight it
        const fullPath = useResolvedPath(to)
        const isActive = useMatch({ path: fullPath.pathname, end: true })
        console.log(fullPath)
        return (
            <Link to={to} className={isActive ? `${navStyle}CurrentPage` : ""} {...props}>
                {page}
            </Link>
        )
    }
    useEffect(() => {
        if (chooseStyle === "glass") {
            setNavStyle("glass")
        } else {
            setNavStyle("nav")
        }
    }, [CheckActive])

    const NavbarPage = ({ linkTo, pageName, toolTipTitle }) => [
        <Tooltip className={`${navStyle}PageContainer`} title={toolTipTitle}>
            <div>
                <CheckActive to={linkTo} page={pageName}></CheckActive>
            </div>
        </Tooltip>

    ]


    //used to manage the open close state of the modal window as well as the modal window content
    const { setIsOpen, setMode, setMessage, handleSignInEmail, handleSignUpEmail } = useContext(SignInContext);
    //used to for accessing and managing user data from local storage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    //used to manage focused element state


    //Used to handle retrieving user data from api
    const [userProfile, setUserProfile] = useState("")

    //get data from backend
    const handleProfile = async () => {
        const profile = await getProfile();
        return profile
    }
    //get data from backend when the component first loads works
    useEffect(() => {
        if (user) {
            handleProfile().then((profile) => setUserProfile(profile.data)).catch(() => {
                setMessage("Get Matched With Bunkmates!");
                setMode('profileMakerForm');
                setIsOpen(true)
            });
        }
    }, []);

    //upon logout navigate to the home page
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        setUser(null);
        navigate("/");
        document.location.reload();
    }

    //useEffect to check if user's JWT is expired, if it is logout.
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }
    }, [user])


    //controls the tehtered and untethered state drop down menu
    const [currentTarget, setCurrentTarget] = useState(null)

    //controls what react element the dropdown menu is tethered to
    const handleClick = (event) => {
        setCurrentTarget(event.currentTarget);
    }

    //untethers the dropdown menu to the react element
    const handleClose = (event) => {
        setCurrentTarget(null)
    }

    const open = Boolean(currentTarget)

    function AccountDropDownMenu({ children }) {
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
                    MenuListProps={{ sx: { display: 'flex', flexDirection: 'column' } }}
                    PaperProps={{
                        elevation: 0,
                        sx: { dropDownStyles },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {children}
                </Menu>
            </>
        )
    }
    const menuItemsStyles = {
        padding: '10px',
        color: 'black'
    }

    const StyledMenuItem = ({ pageName, icon, handleAction }) => {
        //styled menu item for account drop down menu
        return (
            <MenuItem sx={menuItemsStyles} onClick={handleAction ?? handleClose}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                {pageName}
            </MenuItem>
        )
    }



    return (
        <nav className={`${navStyle}Bar`}>
            <Tooltip title={"Return Home"}>
                <div>
                    <CheckActive to="/" page={
                        <img src={logo} className="App-logo" alt="logo" />}>
                    </CheckActive>
                </div>
            </Tooltip>
            <ul className={`${navStyle}Pages`}>
                {/*<CheckActive to="/" page="Listings"></CheckActive> */}
                {/*<CheckActive to="/create" page="Post a Listing"></CheckActive>*/}
                <NavbarPage toolTipTitle={"Find Roomates"} linkTo={"/bunkmates"} pageName="Bunkmates" />
                <NavbarPage toolTipTitle={"Apply For Rental Units"} linkTo={"/apply_to_listings"} pageName="Apply to Listings" />
                <NavbarPage toolTipTitle={"Message Bunkmates"} linkTo={"/messages"} pageName="Messages" />
                <NavbarPage toolTipTitle={"Create Or Edit Profile"} linkTo={"/profile"} pageName="My Profile" />
                {/*hidden, used for Sign in pages*/}
                <RenderWhich />
                {user ? (
                    <>
                        <Tooltip className="userAccount" title={`My Account`}>
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
                                        <div className="avatar-container" style={{ backgroundColor: 'white', padding: '3px', borderRadius: '50%' }}>
                                            <Avatar src={userProfile?.picture} className="Avatar" alt={user?.result?.email}>{user?.result?.email?.charAt(0)}</Avatar>
                                        </div>

                                    </IconButton>
                                </a>
                            </label>
                        </Tooltip>
                        <AccountDropDownMenu>
                            <StyledMenuItem icon={<AssignmentIndIcon />} pageName={`${user?.result?.name}'s Account`} />
                            <Divider />
                            <StyledMenuItem icon={<ConnectWithoutContactIcon />} pageName={"Contact"} />
                            <StyledMenuItem icon={<SettingsApplications />} pageName={"Settings"} />
                            <StyledMenuItem icon={<HelpCenterIcon />} pageName={"Help"} />
                            <StyledMenuItem handleAction={handleLogout} icon={<Logout />} pageName={"Logout"} />

                        </AccountDropDownMenu>
                    </>
                ) :
                    <>
                        <Tooltip className="userAccount" title={'Sign in or Sign up'}>
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
                                        <Avatar src={userProfile?.picture} alt={user?.result?.email}>{user?.result?.email?.charAt(0)}</Avatar>
                                    </IconButton>
                                </a>
                            </label>
                        </Tooltip>
                        <AccountDropDownMenu>
                            <StyledMenuItem handleAction={handleSignUpEmail} icon={<AssignmentIndIcon />} pageName={"Sign Up"} />
                            <StyledMenuItem handleAction={handleSignInEmail} icon={<LoginIcon />} pageName={"Sign In"} />
                            <Divider />
                            <StyledMenuItem icon={<ConnectWithoutContactIcon />} pageName={"Contact"} />
                            <StyledMenuItem icon={<SettingsApplications />} pageName={"Settings"} />
                            <StyledMenuItem icon={<HelpCenterIcon />} pageName={"Help"} />
                        </AccountDropDownMenu>
                    </>
                }
            </ul >
        </nav >
    );
}

export default Navbar;
