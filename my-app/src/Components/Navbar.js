import logo from './logo.svg';
import './Navbar.css';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import SignIn from '../routes/SignIn'
import { FormSingleLineInput, ActionButton } from './Form';
import { FcGoogle } from 'react-icons/fc'
import { IoLogoFacebook } from 'react-icons/io'
import { BsApple } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

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
    return (
        <nav>
            <CheckActive to="/" page={
                <img src={logo} className="App-logo" alt="logo" />}>
            </CheckActive>
            <ul>
                <CheckActive to="/" page="Listings"></CheckActive>
                <CheckActive to="/create" page="Post a Listing"></CheckActive>
                <CheckActive to="/applications" page="Applications"></CheckActive>
                <a>Roomates</a>
                <a>Advertise</a>
                <a>Live Feed</a>
                <label>
                    <a><SignIn
                        openModalMessage={'Sign In'}
                        content={
                            <>
                                <FormSingleLineInput 
                                field1="Region" 
                                field2="Phone Number" 
                                placeHolder1="Canada" 
                                placeHolder2= "ex. +1 (XXX) XXX XXXX" />
                                <h6>
                                We’ll call or text you to confirm your number. 
                                Standard message and data rates apply.  
                                <u>Privacy Policy</u>
                                </h6>
                                <div className="button" style={{borderBottom: "1px solid lightgrey"}}>
                                    <ActionButton title="Submit" />
                                </div>
                                <div className="socials" >
                                    <div style={{alignItems: 'center'}}>
                                        <FcGoogle/>
                                        Sign in with Google
                                    </div>
                                    <div style={{alignItems: 'center'}}>
                                        <IoLogoFacebook color="blue"/>
                                        Sign in with Facebook 
                                    </div>
                                    <div style={{alignItems: 'center'}}>
                                        <BsApple/>
                                        Sign in with Apple 
                                    </div>
                                    <div style={{alignItems: 'center'}}>
                                        <MdEmail/>
                                        Sign in with Email
                                    </div>
                                </div>
                        </>
                    }
                    /></a>
                </label>
            </ul>
        </nav>
    );
}

export default Navbar;
