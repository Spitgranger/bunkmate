import React, {useRef,  useEffect, useState, useContext } from 'react';
import Navbar from '../Components/Navbar';
import './Profile.css'
import { getProfile } from '../api';
import { SignInContext } from '../Components/GlobalStateManagement/SignInContext';
import { ActionButton } from '../Components/SubComponents/Form';
import Divider from '@mui/material/Divider'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Tooltip from "@mui/material/Tooltip";
import { SavedListingItem } from '../Components/SubComponents/Bunkmates/SavedListingItem';
import { HiMapPin } from 'react-icons/hi2'
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OVERLAY_LAYER, InfoWindow } from "@react-google-maps/api";
import { CardHeader, Avatar, Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent, CardActions, IconButton } from "@mui/material/"
import { TbMessages, TbMessagesOff } from 'react-icons/tb';
import { InfoWindowF } from '@react-google-maps/api';
import { ValuesObjectContext } from '../Components/GlobalStateManagement/ValidationContext';
import { GrInstagram, GrFacebook, GrLinkedin, GrTwitter  } from 'react-icons/gr'
import { MdVerified, MdPets, MdCleaningServices, MdHandshake } from 'react-icons/md';
import { BsFillClockFill, BsInfinity, BsBriefcaseFill, BsPencilFill, BsAlarmFill } from 'react-icons/bs';
import {FaSmoking, FaCannabis,  FaWineGlassAlt, FaRegHandshake, FaDog} from 'react-icons/fa'


//This is the component that handles the user profile, displaying the user details and other things.
const Profile = () => {
  const pageStyles = {
    leftColumn: { flex: 1, height: '100%', margin: '30px',borderRadius: '15px', padding: '10px'},
    rightColumn: { flex: 1, height: '100%', margin: '30px',borderRadius: '15px', padding: '10px'},
    middleColumn: {flex: 2, height: '100%', margin: '30px', borderRadius: '15px', padding: '10px'},
    name:{fontSize: '30px', fontWeight: 600},
    socialLinks: { padding: '15px', display: 'flex', justifyContent: 'space-around', },
    profilePicture:{borderRadius: '15px', maxHeight: '400px', maxWidth: '100%'},
    divider: {fontSize: '20px', padding: '10px'},
    fieldWrapper: {width: '100%', display: 'flex',  alignItems: 'center', flexDirection: 'column'},

  }

  const { values } = useContext(ValuesObjectContext)
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

  /*
  {profile.data}
  {profile.firstName}
  {profile.lastName}
  {profile.gender}
  {profile.email}
  {profile.employment}
  {profile.address}
  {profile.province}
  {profile.city}
  {profile.education}
  {profile.picutre}
  {profile.about}
  {profile.province}
  {profile.city}
  */

  const capitalizedName = (name) => {
    return `${name.charAt(0).toUpperCase() + name.slice(1)} `
  }

 
 console.log(values, profile)

  const Fields = ({iconStart, fieldTitle, fieldValue, primaryStyles, bodyStyles}) => {
    //disable display flex to have values appear below keys
    return(
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'}}>
      <div style={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
        {iconStart}
        <Typography sx={{...primaryStyles, paddingLeft: '15px', fontSize:"17px"}} variant="h6" color="text.primary">{`${fieldTitle}: `}</Typography>
      </div>
        <div style={{width: '50%'}}>
          <Typography sx={{...bodyStyles, padding: '5px', display: 'flex', justifyContent: 'flex-start'}} variant="body1" color="text.secondary">{fieldValue}</Typography>
        </div>
    </div>
    )
  }

  if (profile) {
    return(
      <div>
        <div style={{height: '9vh'}} />
        <Navbar />
    <div style={{display: 'flex', flexFLow: 'row wrap'}}>
    <Card sx={pageStyles.leftColumn}>
      <CardMedia sx={pageStyles.profilePicture} component="img" image={profile.picture}/>
      <CardContent>
        <div style={pageStyles.socialLinks}>
          <IconButton >
            <GrInstagram />
          </IconButton>
          <IconButton >
            <GrFacebook/>
          </IconButton>
          <IconButton >
            <GrLinkedin />
          </IconButton>
          <IconButton >
            <GrTwitter />
          </IconButton>
        </div>
        <Divider sx={pageStyles.divider} flexItem={true} textAlign='center' >Description</Divider>
        <Fields iconStart={<BsFillClockFill />}fieldTitle="Age" fieldValue={'24'}/>      
        <Fields iconStart={<BsInfinity />}fieldTitle="Gender" fieldValue={profile.gender}/>      
        <Fields iconStart={<BsBriefcaseFill />}fieldTitle="Occupation" fieldValue={profile.employment}/>      
        <Fields iconStart={<BsPencilFill />} fieldTitle="Current Education"  fieldValue={profile.education}/>      
      </CardContent>
    </Card>
    <Card sx={pageStyles.middleColumn}>
      <CardHeader sx={{padding: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} titleTypographyProps={pageStyles.name} subheader={profile.email} color="text.primary" title={[capitalizedName(profile.firstName), capitalizedName(profile.lastName), <MdVerified style={{ color: 'aqua'}} /> ]}/>
      <Divider sx={pageStyles.divider} textAlign='left'>Biography</Divider>
      <CardContent sx={{height: '100%'}}>      
          <Typography sx={{ marginBottom:'20px', padding: '5px', display: 'flex', justifyContent: 'flex-start'}} variant="body1" color="text.secondary">{profile.about}</Typography>
      <Divider sx={pageStyles.divider} textAlign='left'>Habits and Lifestyles</Divider>
          <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <div style={pageStyles.fieldWrapper}>
                <div style={{width: '100%'}}>
                  <Fields iconStart={<MdPets />}fieldTitle="Own Pets" fieldValue={'Yes'}/>      
                  <Fields iconStart={<BsAlarmFill />}fieldTitle="Sleep Schedule" fieldValue={'Early Bird'}/>      
                </div>
              </div>
              <div style={pageStyles.fieldWrapper}>
                <div style={{width: '100%'}}>
                  <Fields iconStart={<MdCleaningServices />}  fieldTitle="Cleanliness" fieldValue={'Clean Freak'}/>      
                  <Fields   iconStart={<FaWineGlassAlt/>}fieldTitle="Drinking" fieldValue={"Don't Drink"}/>      
                </div>
              </div>
            </section>
            <section style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <div style={pageStyles.fieldWrapper}>
                <div style={{width: '100%'}}>
                  <Fields iconStart={<FaSmoking />} fieldTitle="Smoking" fieldValue={'Moderate Smoker'}/>      
                  <Fields iconStart={<FaCannabis />}fieldTitle="Cannabis" fieldValue={'Light Cannabis Use'}/>      
                </div>
              </div>
              <div style={pageStyles.fieldWrapper}>
                <div style={{width: '100%'}}>
                  <Fields iconStart={<FaRegHandshake /> }  fieldTitle="Ok With Guests" fieldValue={'Ok With it'}/>      
                  <Fields  iconStart={<FaDog />}fieldTitle="Ok With Pets" fieldValue={"Ok With it"}/>      
                </div>
              </div>
            </section>
          </div>
      </CardContent>
    </Card>
    {/* 
    <Card sx={pageStyles.rightColumn}>
      <CardHeader title="Saved Listing"/>
      <CardContent>      
        <Fields fieldTitle="Bingham Condos" fieldKey=""/>      
        <Fields fieldTitle="Bingham Condos" fieldKey=""/>      
        <Fields fieldTitle="Bingham Condos" fieldKey=""/>      
      </CardContent>
    </Card>
    */}
    </div>  
      </div>
    )

  }
};

export default Profile;


    /*
    return (
      <div className='page-container'>
        <div style={{ height: '9vh' }} />
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
              <header style={{ display: 'flex', flexFlow: 'row nowrap' }}>
                <h1>Personal Information</h1>
                <button onClick={handleProfile}>Edit Profile</button>
              </header>
              <div className='content'>
                {Object.entries(profile).map((entry) => {
                  if (entry[0] !== "picture" && entry[0] !== "_id" && entry[0] !== "about") {
                    return <div className='info-field'>
                      <h2>{entry[0]}:</h2>
                      <h3>{entry[1]}</h3>
                    </div>
                  }
                  return null;
                })}
              </div>
            </Paper>
          </div>
        </div>
      </div >
    );
  }
  else {
    return (
      <div className='page-container'>
        <div style={{ height: '9vh' }} />
        <Navbar />
        <div className="error-content">
          <h1>No profile associated with this account</h1>
        </div>
      </div>
    )
*/