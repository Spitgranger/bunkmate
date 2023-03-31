import React, { useRef, useEffect, useState, useContext } from 'react';
import { formatContext } from '../Components/GlobalStateManagement/FormatContext';
import Navbar from '../Components/Navbar';
import { getProfile, getRequests } from '../api';
import { SignInContext } from '../Components/GlobalStateManagement/SignInContext';
import { ActionButton } from '../Components/Utils/Form';
import Divider from '@mui/material/Divider'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Tooltip from "@mui/material/Tooltip";
import { SavedListingItem } from './Bunkmates/Components/SavedListingItem';
import { HiMapPin } from 'react-icons/hi2'
import './Profile.css'
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OVERLAY_LAYER, InfoWindow } from "@react-google-maps/api";
import { CardHeader, Avatar, Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent, CardActions, IconButton } from "@mui/material/"
import { TbMessages, TbMessagesOff } from 'react-icons/tb';
import { InfoWindowF } from '@react-google-maps/api';
import { ValuesObjectContext } from '../Components/GlobalStateManagement/ValidationContext';
import { GrInstagram, GrFacebook, GrLinkedin, GrTwitter } from 'react-icons/gr'
import { MdVerified, MdPets, MdCleaningServices } from 'react-icons/md';
import { BsBookmarks, BsBookmarksFill, BsFillClockFill, BsInfinity, BsBriefcaseFill, BsPencil, BsAlarmFill, BsPen } from 'react-icons/bs';
import { FaBook, FaSmoking, FaCannabis, FaWineGlassAlt, FaRegHandshake, FaDog } from 'react-icons/fa'
import { BiMessageDetail } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import { BunkmatesContext } from '../Components/GlobalStateManagement/UserContext';
import { MapProfile } from './Bunkmates/Bunkmates';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';



/*
'@media (max-width: 1000px)':{
  backgroundColor: 'red'
}
*/
//This is the component that handles the user profile, displaying the user details and other things.


const Profile = () => {

  const pageStyles = {
    page: { display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%' },
    profileContainer: { display: 'flex', flexFLow: 'row wrap', width: '75%', height: '91vh' },
    leftColumn: { flex: 1, margin: '30px', borderRadius: '15px', padding: '15px', minWidth: '350px', },
    rightColumn: { flex: 1, margin: '30px', borderRadius: '15px', padding: '10px' },
    middleColumn: { flex: 2, margin: '30px', borderRadius: '15px', padding: '10px', minWidth: '680px' },
    cardHeader: { whiteSpace: 'nowrap', margin: '0px', padding: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    name: { fontSize: '30px', fontWeight: 600, display: 'flex', alignItems: 'center' },
    socialLinks: { padding: '15px', display: 'flex', justifyContent: 'space-around', },
    profilePicture: { borderRadius: '15px', maxHeight: '400px', maxWidth: '100%' },
    header: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    actionCenter: { height: '100%', padding: '25px', display: 'flex', alignItems: 'center' },
    biography: { marginBottom: '20px', padding: '5px', display: 'flex', justifyContent: 'flex-start', },
    divider: { fontSize: '20px', padding: '10px' },
    habitsAndLifestyle: { padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    fields: { width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' },
    fieldsWrapper: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' },
    loadingUi: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100wh', height: '100vh' }
  };

  const { capitalizedName, calculateAge } = useContext(formatContext);
  const { setIsOpen, setMode, setMessage } = useContext(SignInContext);
  const { values } = useContext(ValuesObjectContext);
  //state to manage the profile data retrieved from the backend
  const [profile, setProfile] = useState("");
  //state to manage the bookmark icon that is shown
  const [bookmark, setBookmark] = useState(false);
  //state management just for the requestbutton
  const [requestButtonMessage, setRequestButtonMessage] = useState("Inactive")
  const [showIcon, setShowIcon] = useState(null)
  const [textColor, setTextColor] = useState('red')
  const { mapProfileCard, setMapProfileCard } = useContext(BunkmatesContext)
  const [userRequest, setUserRequest] = useState(null)
  const { setCenter } = useContext(BunkmatesContext)
  const [loading, setLoading] = useState(<CircularProgress size={50} />)


  //query localStorage whenever mapProfileCard changes (primarily used to update the state of the "view request button")
  useEffect(() => {
    //get request data from backend
    async function handleRequest() {
      const request = await getRequests();
      return request
    }
    const userId = (JSON.parse(localStorage.getItem("profile"))?.result?._id)

    //store user request data
    handleRequest().then((request) => {
      const requestDict = {}
      request.data.map(
        (user) => {
          requestDict[user.user] = user;
        });
      const userOwnId = requestDict[userId]
      setUserRequest(userOwnId);
    });

  }, [mapProfileCard])



  //function to handle fetching the profile data from back end
  const handleLoad = async () => {
    const profile = await getProfile();
    return profile;
  };

  //get data from backend when the component first loads works
  useEffect(() => {
    handleLoad().then((profile) => setProfile(profile.data)).finally(() => setLoading(null))
  }, []);

  const handleEditProfile = () => {
    setMessage("Edit Your Profile")
    setMode("profileMakerForm")
    setIsOpen(true)
  }




  const Fields = ({ iconStart, fieldTitle, fieldValue, primaryStyles, bodyStyles }) => {
    //Note: disable display flex to have values appear below keys
    const fieldStyles = {
      fieldContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' },
      keyContainer: { display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }
    };

    return (
      <div style={fieldStyles.fieldContainer}>
        <div style={fieldStyles.keyContainer}>
          {iconStart}
          <Typography sx={{ ...primaryStyles, paddingLeft: '15px', fontSize: "17px" }} variant="h6" color="text.primary">{`${fieldTitle}: `}</Typography>
        </div>
        <div style={{ width: '50%' }}>
          <Typography sx={{ ...bodyStyles, padding: '5px', display: 'flex', justifyContent: 'flex-start' }} variant="body1" color="text.secondary">{fieldValue}</Typography>
        </div>
      </div>
    )

  }

  function handleMouseEnter() {
    setRequestButtonMessage('Make a request');
    setShowIcon(<HiMapPin />);
    setTextColor("aqua")
  }

  function handleMouseLeave() {
    setRequestButtonMessage('Inactive');
    setShowIcon(null);
    setTextColor("red")
  }

  const handleViewRequest = () => {
    setCenter({ lat: userRequest.idealLocation[0], lng: userRequest.idealLocation[1] })
    setMapProfileCard(<MapProfile profile={userRequest.profile[0]} request={userRequest} />)
  }


  //if profile true and loading indicator false
  //display profile page
  //if profile false and loading indicator false
  //display no profiel exists page
  //else (profile no proifile, loaindg indicator){
  //display loading indicator
  //}

  if (profile && !loading) {
    return (
      <div style={pageStyles.page}>
        <div style={{ height: '9vh' }} />
        <Navbar />
        <div style={pageStyles.profileContainer}>
          <Card sx={pageStyles.leftColumn}>
            <CardMedia sx={pageStyles.profilePicture} component="img" image={profile.picture} />
            <CardContent>
              <div style={pageStyles.socialLinks}>
                <IconButton ><GrInstagram /></IconButton>
                <IconButton ><GrFacebook /></IconButton>
                <IconButton ><GrLinkedin /></IconButton>
                <IconButton ><GrTwitter /></IconButton>
              </div>
              <Divider sx={pageStyles.divider} flexItem={true} textAlign='center' >Description</Divider>
              <Fields iconStart={<BsFillClockFill style={{ color: '#2ACDDD' }} />} fieldTitle="Age" fieldValue={profile.age ?? calculateAge(profile)} />
              <Fields iconStart={<BsInfinity style={{ color: '#2ACDDD' }} />} fieldTitle="Gender" fieldValue={profile.gender} />
              <Fields iconStart={<BsBriefcaseFill style={{ color: '#2ACDDD' }} />} fieldTitle="Occupation" fieldValue={profile.employment} />
              <Fields iconStart={<FaBook style={{ color: '#2ACDDD' }} />} fieldTitle="Current Education" fieldValue={profile.education} />
            </CardContent>
          </Card>
          <Card sx={pageStyles.middleColumn}>
            <header style={pageStyles.header}>
              <Tooltip arrow placement="right" title={"Active 3 hours ago"}>
                <CardHeader sx={pageStyles.cardHeader} titleTypographyProps={pageStyles.name} subheader={profile.email} color="text.primary" title={[capitalizedName(profile.firstName), <MdVerified style={{ color: '#2ACDDD', margin: '5px' }} />]} />
              </Tooltip>
              <div style={pageStyles.actionCenter}>
                {userRequest
                  ?
                  <Tooltip arrow title={`${capitalizedName(profile.firstName)} has an active request`}>
                    <Link to="/bunkmates" onClick={handleViewRequest} style={{ textDecoration: 'none' }}><ActionButton startIcon={<HiMapPin />} height="30px" title={"View Request"} /></Link>
                  </Tooltip>
                  :
                  <Tooltip arrow title={'Making a request will let people know you are actively looking for bunkmates and will make your profile more visible'}>
                    <Link to="/bunkmates" style={{ textDecoration: 'none' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><ActionButton bgColor={'black'} color={textColor} startIcon={showIcon} height="30px" title={requestButtonMessage} /></Link>
                  </Tooltip>


                }
                <Tooltip title={`Edit your profile`}>
                  <IconButton onClick={handleEditProfile}>
                    <BsPencil />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Message ${capitalizedName(profile.firstName)}`}>
                  <IconButton>
                    <BiMessageDetail />
                  </IconButton>
                </Tooltip>
                {bookmark
                  ?
                  <Tooltip arrow title="This profile has been saved!">
                    <IconButton onClick={(e) => setBookmark(!bookmark)}>
                      <BsBookmarksFill style={{ color: '#2ACDDD' }} />
                    </IconButton>
                  </Tooltip>
                  :
                  <Tooltip arrow title="Save this profile">
                    <IconButton onClick={() => setBookmark(!bookmark)}>
                      <BsBookmarks />
                    </IconButton>
                  </Tooltip>
                }
              </div>
            </header>
            <Divider sx={pageStyles.divider} textAlign='left'>Biography</Divider>
            <CardContent>
              <Typography sx={pageStyles.biography} variant="body1" color="text.secondary">{profile.about}</Typography>
              <Divider sx={pageStyles.divider} textAlign='left'>Habits and Lifestyles</Divider>
              <div style={pageStyles.habitsAndLifestyle}>
                <section style={pageStyles.fieldsWrapper}>
                  <div style={pageStyles.fields}>
                    <div style={{ width: '100%' }}>
                      <Fields iconStart={<MdPets style={{ color: '#2ACDDD' }} />} fieldTitle="Own Pets" fieldValue={profile.havePets} />
                      <Fields iconStart={<BsAlarmFill style={{ color: '#2ACDDD' }} />} fieldTitle="Sleep Schedule" fieldValue={profile.sleepSchedule} />
                    </div>
                  </div>
                  <div style={pageStyles.fields}>
                    <div style={{ width: '100%' }}>
                      <Fields iconStart={<MdCleaningServices style={{ color: '#2ACDDD' }} />} fieldTitle="Cleanliness" fieldValue={profile.cleanliness} />
                      <Fields iconStart={<FaWineGlassAlt style={{ color: '#2ACDDD' }} />} fieldTitle="Drinking" fieldValue={profile.drinking} />
                    </div>
                  </div>
                </section>
                <section style={pageStyles.fieldsWrapper}>
                  <div style={pageStyles.fields}>
                    <div style={{ width: '100%' }}>
                      <Fields iconStart={<FaSmoking style={{ color: '#2ACDDD' }} />} fieldTitle="Smoking" fieldValue={profile.smoking} />
                      <Fields iconStart={<FaCannabis style={{ color: '#2ACDDD' }} />} fieldTitle="Cannabis" fieldValue={profile.cannabis} />
                    </div>
                  </div>
                  <div style={pageStyles.fields}>
                    <div style={{ width: '100%' }}>
                      <Fields iconStart={<FaRegHandshake style={{ color: '#2ACDDD' }} />} fieldTitle="Ok With Guests" fieldValue={profile.tolerateGuests} />
                      <Fields iconStart={<FaDog style={{ color: '#2ACDDD' }} />} fieldTitle="Ok With Pets" fieldValue={profile.toleratePets} />
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
      </div >
    )

  }
  else if (!profile && !loading) {
    return (
      <div className='page-container'>
        <div style={{ height: '9vh' }} />
        <Navbar />
        <div className="error-content">
          <h1>No profile associated with this account</h1>
        </div>
      </div>
    )
  } else {
    return (
      <Box style={pageStyles.loadingUi}>{loading}</Box>)
  }
};

export default Profile;