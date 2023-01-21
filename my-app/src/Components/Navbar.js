import logo from './logo.svg';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <img src={logo} className="App-logo" alt="logo" />
            <ul>
                <a href="">Sign in</a>
                <a href="">Roomates</a>
                <Link to="/create">Post a listing</Link>
                <a href="">Advertise</a>
                <a href="">Store</a>
                <a href="">Applications</a>
                <Link to='/'>Listings</Link>
            </ul>
        </nav>
    );
}

export default Navbar;
