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
                <a href="">Sign in</a>
                <a href="">Roomates</a>
                <a href="">Advertise</a>
                <CheckActive to="/create" page="Post a Listing"></CheckActive>
                <a href="">Store</a>
                <CheckActive to="/applications" page="Applications"></CheckActive>
                <CheckActive to="/" page="Listings"></CheckActive>
            </ul>
        </nav>
    );
}

export default Navbar;
