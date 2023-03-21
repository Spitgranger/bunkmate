import Divider from '@mui/material/Divider'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Tooltip from "@mui/material/Tooltip";
import { SavedListingItem } from './SavedListingItem';
import { HiMapPin } from 'react-icons/hi2'
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OVERLAY_LAYER, InfoWindow } from "@react-google-maps/api";
import { Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent, CardActions, IconButton } from "@mui/material/"
import { ActionButton } from '../Form';
import { TbMessages, TbMessagesOff } from 'react-icons/tb';
import { useRef, useState, useContext } from 'react';
import { InfoWindowF } from '@react-google-maps/api';
import { MdVerified } from 'react-icons/md';
import { formatContext } from '../../GlobalStateManagement/FormatContext';


function SingleMapCard({ BunkmateInfo, request }) {
    const [messageButton, setMessageButton] = useState(false)
    const { capitalizedName, calculateAge } = useContext(formatContext)
    console.log(request)

    return (
        <InfoWindowF mapPaneName={"overlayMouseTarget"} position={{ lat: request?.idealLocation[0], lng: request?.idealLocation[1] }}>
            <Card sx={{ width: "400px", zIndex: "2", opacity: '0.95' }} onClick={e => e.stopPropagation()}>
                <div style={{ flexDirection: 'column', padding: '15px', display: 'flex', justifyContent: 'flex-start' }}>
                    <div className="profile-info" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', padding: '5px' }}>
                                <Tooltip title={`View ${capitalizedName(request.profile[0].firstName)}'s profile`} arrow>
                                    <CardActionArea style={{ width: '125px' }}>
                                        <CardMedia
                                            component="img"
                                            image={request.profile[0].picture}
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
                                                    {capitalizedName(request.profile[0].firstName)}
                                                </div>
                                                <div className="display-verified" style={{ padding: '5px' }}>
                                                    {request.profile[0].verified ?
                                                        <Tooltip title={`${capitalizedName(request.profile[0].firstName)} is verified`} arrow><div><MdVerified style={{ fontSize: "medium", color: 'aqua', borderRadius: '50%' }} /></div></Tooltip>
                                                        : null}
                                                </div>
                                            </Typography >
                                        </div>
                                        <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Tooltip title={"Pin This Profile"} arrow placement="bottom">
                                                <IconButton >
                                                    <HiMapPin />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={"Message this group"} arrow placement="bottom">
                                                <IconButton onClick={() => setMessageButton(!messageButton)} >
                                                    {messageButton ? <TbMessagesOff /> : <TbMessages />}
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <Tooltip title={`${capitalizedName(request.profile[0].firstName)}'s budget`} arrow placement="left">
                                        <Typography variant="h6" color="text.primary" style={{ overflow: 'hidden', maxWidth: '130px' }} >
                                            {`$${request.rentBudget}/month`}
                                        </Typography>
                                    </Tooltip>
                                    <Typography variant="body1" color="text.secondary" style={{ fontSize: "17px" }}>
                                        {request.profile[0].age ? `${request.profile[0].age} Year Old` : `${calculateAge(request.profile[0])} Year Old, ${request.profile[0].gender}`}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {`${request.profile[0].occupation}`}
                                    </Typography>
                                </CardContent >
                            </div>
                            <Divider style={{ margin: '10px', width: '93%' }} />
                            <Typography style={{ padding: '10px', overflowY: 'scroll', width: '100%', height: '130px', }} variant="body1" color="text.secondary">
                                {request.profile[0].about}
                            </Typography>
                        </header>
                    </div >
                    {/*
                    <div style={{ display: 'flex', flexFlow: "row nowrap", justifyContent: 'center' }}>
                        
                        <ActionButton borderRadius="15px" title="Message" width="140px" height="40px" />
                        <ActionButton borderRadius="15px" title="Profile" width="140px" height="40px" />
                    </div>
                                                    */}

                    {request.listingObject === "None" ? null :
                        <>
                            <Divider style={{ margin: '10px', width: '93%' }} />
                            <Tooltip title={`${capitalizedName(request.profile[0].firstName)}'s listing in mind`} arrow>
                                <CardActionArea >
                                    <SavedListingItem
                                        index={1}
                                        image={request?.listing[0]?.image}
                                        address={request?.listing[0]?.address}
                                        price={request?.listing[0]?.price}
                                        bedBath={request?.listing[0]?.bedBath}
                                        addressWidth="270px"
                                    />
                                </CardActionArea>
                            </Tooltip>
                        </>
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
                            {request.flexibility !== "0"
                                ? <Tooltip title="How far the user is willing to move from the current location">
                                    <div>
                                        <BunkmateInfo label="Flexibility" value={`${request.flexibility} km`} />
                                    </div>
                                </Tooltip>
                                : null
                            }
                        </div>
                    </CardContent>
                </div>
            </Card >
        </InfoWindowF >

    )
}

export default SingleMapCard