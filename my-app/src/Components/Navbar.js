import logo from './Assets/logo.svg';
import './Navbar.css';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import SignIn from '../routes/SignIn'

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
                {/*<CheckActive to="/" page="Listings"></CheckActive> */}
                {/*<CheckActive to="/create" page="Post a Listing"></CheckActive>*/}
                <a>Bunkmates</a>
                <CheckActive to="/applications" page="Applications"></CheckActive>
                <a>Messages</a>
                <a>Profile</a>
                <a>Account</a>
                <label>
                    <a><SignIn openModalName="Sign In" /></a>

                </label>
            </ul>
        </nav>
    );
}

export default Navbar;
