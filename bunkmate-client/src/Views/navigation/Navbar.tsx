import bunkmate_logo from '../../assets/bunkmate_logo.png'
import './styles/Navbar.css';
import {Link, useResolvedPath, useMatch} from 'react-router-dom';
import RenderWhich from '../account/SignIn.jsx';
import {Tooltip} from '@mui/material';
import {useState, useContext, useEffect, memo} from 'react';
import {useNavigate} from 'react-router-dom';
import decode from 'jwt-decode';
import {getProfile} from '../../api';
import {SignInContext} from '../../globalContext/SignInContext.js';
import AccountDropdown from "./components/accountDropdown.tsx";
import debounce from 'lodash/debounce'
import {JSX} from 'react'

const Navbar = memo(({chooseStyle}: { chooseStyle: string }) => {

    //define state management for managing the styles of the navbar
    const [navStyle, setNavStyle] = useState("nav")
    //used to manage the open close state of the modal window as well as the modal window content
    const {setIsOpen, setMode, setMessage} = useContext(SignInContext);
    //used to for accessing and managing user data from local storage
    const RetrievedData: string | null = localStorage.getItem("profile")
    const [user, setUser] = useState(RetrievedData ? JSON.parse(RetrievedData) : "")
    //Used to handle retrieving user data from api
    const [userProfile, setUserProfile] = useState("")

    interface CheckActiveProps {
        to: string
        page: string | JSX.Element
        props?: object
    }

    /**
     * @brief checks if current page is the active page, if so then underline page in aqua
     *
     * @param {string} to the page to go to
     * @param {string} page the name of the page
     * @param {object} props the props object
     * @returns {JSX.Element}
     */
    const CheckActive = ({to, page, ...props}: CheckActiveProps) => {
        //check if the page is the currently active page, if so then highlight it
        const fullPath = useResolvedPath(to)
        const isActive = useMatch({path: fullPath.pathname, end: true})
        return (
            <Link to={to} className={isActive ? `${navStyle}CurrentPage` : ""} {...props}>
                {page}
            </Link>
        )
    }

    interface NavbarPageProps {
        linkTo: string
        page: string | JSX.Element
        toolTipTitle: string
    }

    /**
     * @brief calls CheckActive function and surrounds each page with a tooltip
     *
     * @param {string} linkTo route to the page
     * @param {string} pageName name that's displayed in navbar
     * @param {string} toolTipTitle message that's shown when hovering over a page
     * @returns {JSX.Element[]} A navbar page with tooltip component
     * @see CheckActive
     */
    const NavbarPage = ({linkTo, page, toolTipTitle}: NavbarPageProps) => [
        <Tooltip className={`${navStyle}PageContainer`} title={toolTipTitle} arrow>
            <div><CheckActive to={linkTo} page={page}/></div>
        </Tooltip>

    ]

    //useEffect for navbar style configuration
    useEffect(() => {
        //transparent navbar for bunkmates page
        if (chooseStyle === "glass") {
            setNavStyle("glass")
        } else {
            //normal opaque navbar for all other pages
            setNavStyle("nav")
        }
    }, [CheckActive])

    const debouncedHandleProfile = debounce(async () => {
        await getProfile;
    }, 1000, {leading: true});

    /*This will component will display the profile maker if the user's account exists but
    a profile doesn't
    TODO come up with better implementation to show the user profile
    */
    useEffect(() => {
        if (user) {
            debouncedHandleProfile()
                .then((profile) => setUserProfile(profile.data))
                .catch(() => {
                    setMessage("Get Matched With Bunkmates!");
                    setMode('profileMakerForm');
                    setIsOpen(true)
                });
        }
    }, []);

    //upon logout navigate to the home page
    const navigate = useNavigate()
    /**
     * @brief if JWT is expired then setUser object to null, clear local storage, navigate to home page and finally reload
     */
    const handleLogout = () => {
        localStorage.clear()
        setUser("");
        navigate("/");
        document.location.reload();
    }

    //useEffect to check if user's JWT is expired, if it is logout.
    useEffect(() => {
        if (user) {
            const token = user.token;
            if (token) {
                const decodedToken: { exp: number } = decode(token);
                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    handleLogout();
                }
            }
        }
    }, [user])


    return (
        <nav className={`${navStyle}Bar`}>
            <NavbarPage toolTipTitle={"Find Roommates"} linkTo={"/bunkmates"} page={
                <img src={bunkmate_logo} className="App-logo" alt="logo"/>
            }/>
            <ul className={`${navStyle}Pages`}>
                <NavbarPage toolTipTitle={"Message Bunkmates"} linkTo={"/messages"} page="Messages"/>
                <NavbarPage toolTipTitle={"Create Or Edit Profile"} linkTo={"/profile"} page="My Profile"/>
                {/*hidden, used for Sign in pages*/}
                <RenderWhich/>
                <AccountDropdown
                    handleLogout={handleLogout}
                    user={user}
                    userProfile={userProfile}
                />
            </ul>
        </nav>
    );
})

export default Navbar;
