import logo from './logo.svg';
import './Navbar.css';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import SignIn from '../routes/SignIn'
import { FormSingleLineInput } from './Form';

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
                                <FormSingleLineInput field1="Region" field2="Phone Number" placeHolder1="Canada" placeHolder2="ex. +1 (XXX) XXX XXXX" />
                            </>
                        }
                    /></a>
                </label>
            </ul>
        </nav>
    );
}

export default Navbar;
