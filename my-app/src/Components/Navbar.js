import logo from './logo.svg';
import './Navbar.css';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';

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
            <img src={logo} className="App-logo" alt="logo" />
            <ul>
                <CheckActive to="/" page="Listings"></CheckActive>
                <CheckActive to="/create" page="Post a Listing"></CheckActive>
                <CheckActive to="/applications" page="Applications"></CheckActive>
                <a href="">Roomates</a>
                <a href="">Advertise</a>
                <a href="">Live Feed</a>
                <CheckActive to="/signin" page="Sign in"></CheckActive>
            </ul>
        </nav>
    );
}

export default Navbar;
