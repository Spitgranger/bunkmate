import Divider from '@mui/material/Divider'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Tooltip from "@mui/material/Tooltip";
import { SavedListingItem } from './SavedListingItem';
import { HiMapPin } from 'react-icons/hi2'
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OVERLAY_LAYER, InfoWindow } from "@react-google-maps/api";
import { Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent, CardActions, IconButton } from "@mui/material/"
import { ActionButton } from '../Form';
import { useState } from 'react';
import { TbMessages, TbMessagesOff } from 'react-icons/tb';
import NestedMapCard from './NestedMapCard';
import { InfoWindowF } from '@react-google-maps/api';
import { FiEyeOff } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import './GroupMapCard.css'

function GroupMapCard({ profile, BunkmateInfo, nested }) {

    const existingBunkmates = profile.linkChats.length;
    const newBunkmates = parseInt(profile.numRoommates);
    const totalRoommates = (existingBunkmates, newBunkmates) => {
        return (existingBunkmates + newBunkmates)
    }
    const [messageButton, setMessageButton] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

    return (
        <InfoWindowF options={{ minWidth: '2000px', }
        } position={{ lat: profile.idealLocation[0], lng: profile.idealLocation[1] }}>
            <div className="whole-container" style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'row' }}>

                <Card sx={{ width: 370, zIndex: "2", opacity: '0.9' }} onClick={e => e.stopPropagation()}>
                    <div style={{ flexDirection: 'column', padding: '15px', display: 'flex', justifyContent: 'flex-start' }}>
                        <div className="profile-info" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', }}>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '5px' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={profile.image}
                                            alt="profile picture"
                                            //16:9 aspect ratio
                                            sx={{ width: '330px', height: '330px', borderRadius: '5%', }}
                                        />
                                    </CardActionArea>

                                    <CardContent style={{ top: '230px', backgroundColor: 'black', opacity: '0.9', position: 'absolute', width: '330px', padding: '15px 15px 15px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div className="first-name">
                                                <Typography variant="h5" color="text.primary" noWrap style={{ color: 'white', maxWidth: '300px', fontSize: "25px", fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                                                    {`${profile.name} 's Group`}
                                                    < div className="display-verified" style={{ padding: '5px' }}>
                                                        {/*TODO: If all profiles are verified through premium subscription then checkmark*/}
                                                        {
                                                            profile.verified ?
                                                                <Tooltip title={'All Group Members Are Verified'} arrow><CheckCircleOutlineIcon sx={{ fontSize: "medium", backgroundColor: 'aqua', color: 'white', borderRadius: '50%' }} /></Tooltip>
                                                                : null
                                                        }
                                                    </div >
                                                </Typography >
                                            </div >
                                            <Tooltip title={"Pin This Profile"} arrow placement="bottom">
                                                <IconButton style={{ padding: '2px', color: 'white' }}>
                                                    <HiMapPin style={{ color: 'white' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={"Message this group"} arrow placement="bottom">
                                                <IconButton onClick={() => { setMessageButton(!messageButton); }} style={{ right: '15px', top: '50px', position: 'absolute', padding: '2px', color: 'white' }}>
                                                    {messageButton ? <TbMessagesOff /> : <TbMessages />}
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={"View Profiles"} arrow placement="bottom">
                                                <IconButton onClick={() => { setShowProfile(!showProfile); }} style={{ right: '15px', top: '75px', position: 'absolute', padding: '2px', color: 'white' }}>
                                                    {showProfile ? <FiEyeOff /> : <FiEye />}
                                                </IconButton>
                                            </Tooltip>
                                        </div >
                                        <Tooltip title={"The Group's Total Budget"} arrow placement="left">
                                            <Typography variant="h6" color="text.primary" style={{ color: 'white', overflow: 'hidden', maxWidth: '330px' }} >
                                                {`$${profile.rentBudget}/month  `}
                                                <div style={{ color: 'aqua' }}>
                                                    {`  ${existingBunkmates} Bunkmates`}
                                                </div>
                                            </Typography>
                                        </Tooltip>
                                    </CardContent >

                                </div >
                                <Divider style={{ margin: '10px', width: '93%' }} />
                                <Typography style={{ padding: '10px', overflowY: 'scroll', width: '100%', maxHeight: '100px', }} variant="body1" color="text.secondary">
                                    {profile.bio}
                                </Typography>
                            </header >
                        </div >
                        {/*
                    <div style={{ display: 'flex', flexFlow: "row nowrap", justifyContent: 'center' }}>
                        
                        <ActionButton borderRadius="15px" title="Message" width="140px" height="40px" />
                        <ActionButton borderRadius="15px" title="Profile" width="140px" height="40px" />
                    </div>
                                                    */}

                        {profile.listingObject === "None" ? null :
                            <>
                                <Divider style={{ margin: '10px', width: '93%' }} />
                                <Tooltip title={`Listing in Mind: $${profile.listingObject.price} per month, split across ${totalRoommates(existingBunkmates, newBunkmates)} bunkmates`} arrow>
                                    <CardActionArea >
                                        <SavedListingItem
                                            index={1}
                                            image={profile.listingObject.image}
                                            address={profile.listingObject.address}
                                            price={profile.listingObject.price}
                                            //used for calculations later, takes the existing number of roomates plus number of roomates the user is seeking
                                            totalRoommates={totalRoommates(existingBunkmates, newBunkmates)}
                                            bedBath={profile.listingObject.bedBath}
                                            addressWidth="270px"
                                        />
                                    </CardActionArea>
                                </Tooltip>
                            </>
                        }
                        <Divider style={{ margin: '10px', width: '93%' }} />

                        <CardContent sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexFlow: 'row wrap' }}>
                            <div className="column-1">
                                <BunkmateInfo label="Seeking" value={profile.numRoommates} />
                                <BunkmateInfo label="Ideal Gender" value={profile.roommateGender} />
                                <BunkmateInfo label="Ideal Age" value={`${profile.rangeSliderValue[0]}-${profile.rangeSliderValue[1]}`} />
                            </div>
                            <div className="column-2">
                                <BunkmateInfo label="Move In" value={profile.dateValue} />
                                <BunkmateInfo label="For" value={profile.idealLengthStay} />
                                {profile.flexibility !== "0" ?
                                    <Tooltip title="How far the user is willing to move from the current location">
                                        <div>
                                            <BunkmateInfo label="Flexibility" value={`${profile.flexibility} km`} />
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
                            <div className="Nested-Card" style={{ height: '688px', width: 420, margin: '20px', overflowY: "scroll" }}>
                                {profile.otherProfiles.map((otherProfile) => { return <NestedMapCard profile={otherProfile} /> })}
                            </div>
                        </>
                        : null
                }
            </div>
        </InfoWindowF >

    )
}

export default GroupMapCard 