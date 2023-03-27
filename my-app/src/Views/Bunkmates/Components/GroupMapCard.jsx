import Divider from '@mui/material/Divider'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Tooltip from "@mui/material/Tooltip";
import { SavedListingItem } from './SavedListingItem';
import { HiMapPin } from 'react-icons/hi2'
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OVERLAY_LAYER, InfoWindow } from "@react-google-maps/api";
import { Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent, CardActions, IconButton } from "@mui/material/"
import { ActionButton } from '../../../Components/Utils/Form';
import { useState, useContext, useEffect } from 'react';
import { TbMessages, TbMessagesOff } from 'react-icons/tb';
import NestedMapCard from './NestedMapCard';
import { InfoWindowF } from '@react-google-maps/api';
import { FiEyeOff } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import styles from '../Styles/GroupMapCard.css'
import { MdVerified } from 'react-icons/md';
import { BuildUserContext } from '../../../Components/GlobalStateManagement/BunkmatesContext';

function GroupMapCard({ request, BunkmateInfo }) {

    //subtract 1 because linkchats contains the user's own profile in the array
    const existingBunkmates = request?.linkChats?.length;
    const newBunkmates = parseInt(request.numRoommates);
    const totalRoommates = (existingBunkmates, newBunkmates) => {
        return (existingBunkmates + newBunkmates)
    }
    //change icon pictures from open to close state
    const [messageIcon, setMessageIcon] = useState(false)
    const [eyeIcon, setEyeIcon] = useState(false)
    //state management for card opacity
    const [opacity, setOpacity] = useState(0.8)
    const { profileHandleRetrieval } = useContext(BuildUserContext)
    //state management for other profiles
    const [otherProfiles, setOtherProfiles] = useState([])
    const [showProfile, setShowProfile] = useState(false)



    const handleEnterActionArea = () => {
        setOpacity(0)
    }
    const handleLeaveActionArea = () => {
        setOpacity(0.8)
    }

    const handleGetProfiles = async () => {
        const arrayUserId = request.linkChats
        console.log(arrayUserId)
        const profiles = await profileHandleRetrieval(arrayUserId.join('.'))
        return profiles
    }
    useEffect(() => {
        handleGetProfiles().then((profiles) => setOtherProfiles(profiles.data))
    }, [])

    const handleEyeButtonChange = () => {
        //clicking on the eye icon will show other group members profiles
        setEyeIcon(!eyeIcon)
        setShowProfile(!showProfile)
    }

    return (
        <InfoWindowF options={{ minWidth: '2000px', }} position={{ lat: request.idealLocation[0], lng: request.idealLocation[1] }}>
            <div className="whole-container" style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'row' }}>

                <Card sx={{ width: 370, zIndex: "2", opacity: '0.9' }} onClick={e => e.stopPropagation()}>
                    <div style={{ flexDirection: 'column', padding: '15px', display: 'flex', justifyContent: 'flex-start' }}>
                        <div className="profile-info" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <header style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', }}>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '5px' }}>
                                    {/* onclick will show first peron's profile in the array can also click the eye button to view profiles*/}
                                    <CardActionArea style={{ borderTopLeftRadius: '1%', borderTopRightRadius: '1%' }} onMouseEnter={handleEnterActionArea} onMouseLeave={handleLeaveActionArea}>
                                        <CardMedia
                                            component="img"
                                            image={request.groupPhoto ?? request.profile[0].picture}
                                            alt="profile photo"
                                            //16:9 aspect ratio
                                            sx={{ width: '330px', height: '330px', borderTopLeftRadius: '2%', borderTopRightRadius: '2%' }}
                                        />
                                    </CardActionArea>

                                    <CardContent style={{ transition: '0.5s', top: '227px', backgroundColor: 'black', opacity: [opacity], position: 'absolute', width: '330px', padding: '15px 15px 15px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }} >
                                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div className="first-name">
                                                <Typography variant="h5" color="text.primary" noWrap style={{ color: 'white', maxWidth: '300px', fontSize: "25px", fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                                                    {`${request.profile[0].firstName}'s Group`}
                                                    < div className="display-verified" style={{ padding: '5px' }}>
                                                        {/*TODO: If all profiles are verified through premium subscription then checkmark*/}
                                                        {
                                                            request.profile[0].verified ?
                                                                <Tooltip title={'All Group Members Are Verified'} arrow><div><MdVerified style={{ fontSize: "medium", color: 'aqua', }} /></div></Tooltip>
                                                                : null
                                                        }
                                                    </div >
                                                </Typography >
                                            </div >
                                            <Tooltip title={eyeIcon ? "Close Profiles" : "View All Profiles"} arrow placement="left">
                                                <IconButton onClick={handleEyeButtonChange} style={{ padding: '2px', color: 'white' }}>
                                                    {eyeIcon ? <FiEyeOff /> : <FiEye />}
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={"Message this group"} arrow placement="left">
                                                <IconButton onClick={() => { setMessageIcon(!messageIcon); }} style={{ right: '15px', top: '80px', position: 'absolute', padding: '2px', color: 'white' }}>
                                                    {messageIcon ? <TbMessagesOff /> : <TbMessages />}
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={"Pin This Profile"} arrow placement="left">
                                                <IconButton onClick={() => { setShowProfile(!showProfile); }} style={{ right: '15px', top: '50px', position: 'absolute', padding: '2px', color: 'white' }}>
                                                    <HiMapPin style={{ color: 'white' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </div >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Tooltip title={"The Group's Total Budget"} arrow placement="right">
                                                <Typography variant="h6" color="text.primary" style={{ fontSize: '22px', display: 'inline-block', alignItems: 'center', color: 'white', overflow: 'hidden', }} >
                                                    {`$${request.rentBudget}/month  `}
                                                </Typography>
                                            </Tooltip>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Tooltip arrow placement="right" title={`There are ${existingBunkmates} people in this group`}>
                                                <Typography variant="h6" color="text.primary" style={{ fontSize: "18px", display: 'inline-block', color: 'aqua', overflow: 'hidden', }} >
                                                    {existingBunkmates === 1 ? `${existingBunkmates} bunkmate` : `${existingBunkmates} bunkmates`}
                                                </Typography>
                                            </Tooltip>
                                        </div>
                                    </CardContent >

                                </div >
                                <Divider style={{ margin: '10px', width: '93%' }} />
                                <Typography style={{ padding: '10px', overflowY: 'scroll', width: '100%', maxHeight: '100px', }} variant="body1" color="text.secondary">
                                    {request.aboutUs}
                                </Typography>
                            </header >
                        </div >
                        {/*
                    <div style={{ display: 'flex', flexFlow: "row nowrap", justifyContent: 'center' }}>
                        
                        <ActionButton borderRadius="15px" title="Message" width="140px" height="40px" />
                        <ActionButton borderRadius="15px" title="Profile" width="140px" height="40px" />
                    </div>
                                                    */}

                        {request.listingObject ?
                            <>
                                <Divider style={{ margin: '10px', width: '93%' }} />
                                <Tooltip title={`Listing in Mind: $${request.listing[0].price} per month, split across ${totalRoommates(existingBunkmates, newBunkmates)} bunkmates`} arrow>
                                    <CardActionArea >
                                        <SavedListingItem
                                            index={1}
                                            image={request.listing[0].image}
                                            address={request.listing[0].address}
                                            price={request.listing[0].price}
                                            //used for calculations later, takes the existing number of roomates plus number of roomates the user is seeking
                                            totalRoommates={totalRoommates(existingBunkmates, newBunkmates)}
                                            bedBath={request.listing[0].bedBath}
                                            addressWidth="270px"
                                        />
                                    </CardActionArea>
                                </Tooltip>
                            </> : null
                        }
                        <Divider style={{ margin: '10px', width: '93%' }} />

                        <CardContent sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexFlow: 'row wrap' }}>
                            <div className="column-1">
                                <BunkmateInfo label="Seeking" value={request.numRoommates} />
                                <BunkmateInfo label="Ideal Gender" value={request.roommateGender} />
                                <BunkmateInfo label="Ideal Age" value={`${request.rangeSliderValue[0]}-${request.rangeSliderValue[1]}`} />
                            </div>
                            <div className="column-2">
                                <BunkmateInfo label="Move In" value={request.dateValue} />
                                <BunkmateInfo label="For" value={request.idealLengthStay} />
                                {request.flexibility !== "0" ?
                                    <Tooltip title="How far the user is willing to move from the current location">
                                        <div>
                                            <BunkmateInfo label="Flexibility" value={`${request.flexibility} km`} />
                                        </div>
                                    </Tooltip> : null
                                }
                            </div>
                        </CardContent>
                    </div >
                </Card >
                {
                    showProfile ?
                        <>
                            < div className="nested-card" style={{ height: '688px', width: 420, margin: '20px', overflowY: "scroll" }}>
                                {otherProfiles.map((otherProfile) => { return <NestedMapCard profile={otherProfile} /> })}
                            </div >
                        </>
                        : null
                }
            </div >
        </InfoWindowF >

    )
}

export default GroupMapCard 