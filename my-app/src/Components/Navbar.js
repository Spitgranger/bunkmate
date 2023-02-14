import logo from './Assets/logo.svg';
import './Navbar.css';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import RenderWhich from '../routes/SignIn'
import { Avatar, Typography, Button, Menu, MenuItem, Divider, Tooltip, IconButton, Icon, Box } from '@mui/material';
import { useState, useId, useContext } from 'react';
import { SignInOpenContext } from './GlobalStateManagement/SignInContext';
import { SignInModeContext } from './GlobalStateManagement/SignInContext';
import { SignInModalMessage } from './GlobalStateManagement/SignInContext';



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

    const id = useId()

    const logout = () => {
        localStorage.clear();
        setUser(null);
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
        padding: '15px',
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
                <Tooltip title={"Find Roomates"}>
                    <div>
                        <CheckActive to="/bunkmates" page="Bunkmates"></CheckActive>
                    </div>
                </Tooltip>
                <Tooltip title={"Get Matched"}>
                    <div>
                        <CheckActive to="/applications" page="Applications"></CheckActive>
                    </div>
                </Tooltip>
                <Tooltip title={"Message Roomates"}>
                    <div>
                        <CheckActive to="/messages" page="Messages"></CheckActive>
                    </div>
                </Tooltip>
                <Tooltip title={"Work on Profile"}>
                    <div>
                        <a>Profile</a>
                    </div>
                </Tooltip>
                {/*hidden*/}
                <RenderWhich />
                {user ? (
                    <>
                        <Tooltip title={`${user?.response?.result?.email}'s account`}>
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
                        </Tooltip>
                        <DropDownMenu>
                            <Button sx={{ padding: '15px', color: 'black' }} >My Account</Button>
                            <Divider />
                            <Button sx={MenuItemsStyles} >Contact</Button>
                            <Button sx={MenuItemsStyles} >Settings</Button>
                            <Button sx={MenuItemsStyles} >Help</Button>
                            <Button sx={MenuItemsStyles} onClick={logout}>Logout</Button>
                        </DropDownMenu>
                    </>
                ) :
                    <>
                        <Tooltip title={'Sign in or Sign up'}>
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
                            <Button sx={MenuItemsStyles} onClick={handleSignIn}>Sign in</Button>
                            <Button sx={MenuItemsStyles} onClick={handleSignUp}>Sign up</Button>
                            <Divider />
                            <Button sx={MenuItemsStyles} >Contact</Button>
                            <Button sx={MenuItemsStyles} >Settings</Button>
                            <Button sx={MenuItemsStyles} >Help</Button>
                        </DropDownMenu>
                    </>
                }
            </ul >
        </nav >
    );
}

export default Navbar;
