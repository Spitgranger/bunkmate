import logo from './Assets/logo.svg';
import './Navbar.css';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import SignIn from '../routes/SignIn'
import { Avatar, Typography, Button } from '@mui/material';
import { useState } from 'react';

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
    const logout = () => {
        localStorage.clear();
        setUser(null);
    }
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    return (
        <nav>
            <CheckActive to="/" page={
                <img src={logo} className="App-logo" alt="logo" />}>
            </CheckActive>
            <ul>
                {/*<CheckActive to="/" page="Listings"></CheckActive> */}
                {/*<CheckActive to="/create" page="Post a Listing"></CheckActive>*/}
                <CheckActive to="/bunkmates" page="Bunkmates"></CheckActive>
                <CheckActive to="/applications" page="Applications"></CheckActive>
                <CheckActive to="/messages" page="Messages"></CheckActive>
                <a>Profile</a>
                <a>Account</a>
                {user ? (
                    <div className="profile-wrapper">
                        <Avatar alt={user.response.result.email}>{user.response.result.email.charAt(0)}</Avatar>
                        <Typography variant='h6'>{user.response.result.email}</Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) :
                    <label>
                        <a><SignIn openModalName="Sign In" /></a>
                    </label>
                }
            </ul>
        </nav>
    );
}

export default Navbar;
