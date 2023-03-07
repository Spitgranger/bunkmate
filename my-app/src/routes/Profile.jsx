import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import './Profile.css'
import SignInProvider from '../Components/GlobalStateManagement/SignInContext';
import { getProfile } from '../api';
import { Avatar, Paper, TextField, Typography } from '@mui/material';


//This is the component that handles the user profile, displaying the user details and other things.
const Profile = () => {
  const [profile, setProfile] = useState("");
  //function to handle fetching the profile data from back end
  const handleLoad = async () => {
    const profile = await getProfile();
    console.log(profile);
    return profile;
  }



  //get data from backend when the component first loads works
  useEffect(() => {
    handleLoad().then((profile) => setProfile(profile.data)).catch(error => console.log(error))
  }, []);
  if (profile) {
    return (
      <div className='page-container'>
        <SignInProvider>
          <div style={{ height: '9vh' }} />

          <Navbar />
        </SignInProvider>
        <div className='profile-wrapper'>
          <div className='profile-name'>
            <h1>{profile.firstName}'s Profile</h1>
            <Avatar src={profile.picture} alt={`${profile.firstName}-profile-picture`} sx={{ width: 300, height: 300 }}></Avatar>
            <div className='about-me'>
              <h1>About me</h1>
              <h4>{profile.about}</h4>

            </div>
          </div>
          <div className="profile-information">
            <Paper>
              <h1>Personal Information</h1>
              <div className='content'>
                {Object.entries(profile).map((entry) => {
                  if (entry[0] !== "picture" && entry[0] !== "_id" && entry[0] !== "about") {
                    return <div className='info-field'>
                      <h2>{entry[0]}:</h2>
                      <h3>{entry[1]}</h3>
                      <a>Edit</a>
                    </div>
                  }
                  return null;
                })}
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className='page-container'>
        <SignInProvider>
          <Navbar />
        </SignInProvider>
        <div className="error-content">
          <h1>No profile associated with this account</h1>
          <h3>Login or sign up First</h3>
        </div>
      </div>
    )
  }
};

export default Profile;