import logo from './logo.svg';
import './Navbar.css';

function Navbar() {
    return (
        <nav>
            <img src={logo} className="App-logo" alt="logo" />
            <ul>
                <a href="">Sign in</a>
                <a href="">Roomates</a>
                <a href="">Post a listing</a>
                <a href="">Advertise</a>
                <a href="">Store</a>
                <a href="">Applications</a>
                <a href="">Listings</a>
            </ul>
        </nav>
    );
}

export default Navbar;
