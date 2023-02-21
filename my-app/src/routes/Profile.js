import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import './Profile.css'
import SignInProvider from '../Components/GlobalStateManagement/SignInContext';



//This is the component that handles the user profile, displaying the user details and other things.
const Profile = () => {

  return (

    <div className='page-container'>
      <SignInProvider>
        <Navbar />
      </SignInProvider>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;