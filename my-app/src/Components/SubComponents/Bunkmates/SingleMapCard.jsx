import Divider from '@mui/material/Divider'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Tooltip from "@mui/material/Tooltip";
import { SavedListingItem } from './SavedListingItem';
import { HiMapPin } from 'react-icons/hi2'
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OVERLAY_LAYER } from "@react-google-maps/api";
import { Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent, CardActions, IconButton } from "@mui/material/"
import { ActionButton } from '../Form';

function SingleMapCard({ profile, BunkmateInfo }) {

    return (
        <OverlayView mapPaneName={OVERLAY_MOUSE_TARGET} position={{ lat: profile.idealLocation[0], lng: profile.idealLocation[1] }}>
            <Card sx={{ width: 370, position: "absolute", zIndex: "2", opacity: '0.9' }}>
                <div style={{ flexDirection: 'column', padding: '15px', display: 'flex', justifyContent: 'flex-start' }}>
                    <div className="profile-info" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', padding: '5px' }}>
                                <Tooltip title={`View ${profile.name}'s profile`} arrow>
                                    <CardActionArea style={{ width: '125px' }}>
                                        <CardMedia
                                            component="img"
                                            image={profile.image}
                                            alt="profile picture"
                                            sx={{ width: '125px', height: '125px', borderRadius: '5%', }}
                                        />
                                    </CardActionArea>
                                </Tooltip>
                                <CardContent style={{ width: '100%', padding: '0px 15px 0px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="first-name">
                                            <Typography variant="h5" color="text.primary" noWrap style={{ fontSize: "25px", fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                                                <div style={{ maxWidth: '130px', overflow: 'hidden' }}>
                                                    {profile.name}
                                                </div>
                                                <div className="display-verified" style={{ padding: '5px' }}>
                                                    {profile.verified ?
                                                        <Tooltip title={`${profile.name} is verified`} arrow><CheckCircleOutlineIcon sx={{ fontSize: "medium", backgroundColor: 'aqua', color: 'white', borderRadius: '50%' }} /></Tooltip>
                                                        : null}
                                                </div>
                                            </Typography >
                                        </div>
                                        <IconButton style={{ padding: '2px' }}>
                                            <HiMapPin />
                                        </IconButton>
                                    </div>
                                    <Tooltip title={`${profile.name}'s budget`} arrow placement="left">
                                        <Typography variant="h6" color="text.primary" style={{ overflow: 'hidden', maxWidth: '130px' }} >
                                            {`$${profile.rentBudget}/month`}
                                        </Typography>
                                    </Tooltip>
                                    <Typography variant="body1" color="text.secondary" style={{ fontSize: "17px" }}>
                                        {`${profile.age} Year Old, ${profile.gender}`}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {`${profile.occupation}`}
                                    </Typography>
                                </CardContent >
                            </div>
                            <Divider style={{ margin: '10px', width: '93%' }} />
                            <Typography style={{ padding: '10px', whiteSpace: 'pre-line', overflowY: 'scroll', width: '100%', maxHeight: '130px', textOverflow: 'elipsis' }} variant="body1" color="text.secondary">
                                {profile.bio}
                            </Typography>
                        </header>
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
                            <Tooltip title={`${profile.name}'s listing in mind`} arrow>
                                <CardActionArea >
                                    <SavedListingItem
                                        index={1}
                                        image={profile.listingObject.image}
                                        address={profile.listingObject.address}
                                        price={profile.listingObject.price}
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
                </div>
            </Card >
        </OverlayView >

    )
}

export default SingleMapCard