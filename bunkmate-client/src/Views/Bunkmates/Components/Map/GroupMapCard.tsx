import {useState} from 'react';
import Divider from '@mui/material/Divider'
import Tooltip from "@mui/material/Tooltip";
import {Card, Typography, CardActionArea, CardMedia, CardContent, IconButton} from "@mui/material/"
import {FiEye, FiEyeOff} from 'react-icons/fi'
import {TbMessages, TbMessagesOff} from 'react-icons/tb';
import {SavedListingItem} from './SavedListingItem.tsx';
import {InfoWindowF} from '@react-google-maps/api';
import {BunkmateInfo} from "../../Bunkmates.tsx";
import {ActionHandler, Request, SumFunction} from 'MapTypes'
import '../../Styles/GroupMapCard.css'

/**
 * @brief a map profile card that displays information about everyone in the group
 *
 * @param request - request object containing user's profile and associated group members
 * @returns {JSX.Element} group photo, group info, group ideal listing
 */
function GroupMapCard(request: Request): React.ReactNode {

    //subtract 1 because link chats contains the user's own profile in the array
    const existingBunkmates: Readonly<number> = request.linkChats.length;
    const newBunkmates: Readonly<number> = parseInt(request.numRoommates);
    const totalBunkmates: SumFunction = (existingBunkmates: number, newBunkmates: number): number => {
        return (existingBunkmates + newBunkmates)
    }
    //change icon pictures from open to close state
    const [messageIcon, setMessageIcon] = useState<boolean>(false)
    const [eyeIcon, setEyeIcon] = useState<boolean>(false)
    //state management for card opacity
    const [opacity, setOpacity] = useState<string>('0.8')
    const [showProfile, setShowProfile] = useState<boolean>(false)


    const handleActionArea: ActionHandler = (isHovering: boolean) => {
        if (isHovering) {
            setOpacity('0')
        } else {
            setOpacity('0,8')
        }
    }

    const handleEyeButtonChange: ActionHandler = () => {
        //clicking on the eye icon will show other group members profiles
        setEyeIcon(!eyeIcon)
        setShowProfile(!showProfile)
    }

    return (
        <InfoWindowF position={{lat: request.idealLocation[0], lng: request.idealLocation[1]}}>
            <div className="whole-container"
                 style={{backgroundColor: 'transparent', display: 'flex', flexDirection: 'row'}}>

                <Card sx={{width: 370, zIndex: "2", opacity: '0.9'}} onClick={e => e.stopPropagation()}>
                    <div style={{
                        flexDirection: 'column',
                        padding: '15px',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}>
                        <div className="profile-info"
                             style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <header style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}>
                                <div style={{width: '100%', display: 'flex', flexDirection: 'column', padding: '5px'}}>
                                    {/* onclick will show first peron's profile in the array can also click the eye button to view profiles*/}
                                    <div style={{borderTopLeftRadius: '1%', borderTopRightRadius: '1%'}}
                                         onMouseEnter={() => handleActionArea(true)}
                                         onMouseLeave={() => handleActionArea(false)}>
                                        <CardMedia
                                            component="img"
                                            image={request.profile[0].picture}
                                            alt="profile photo"
                                            //16:9 aspect ratio
                                            sx={{
                                                width: '330px',
                                                height: '330px',
                                                borderTopLeftRadius: '2%',
                                                borderTopRightRadius: '2%'
                                            }}
                                        />
                                    </div>

                                    <CardContent style={{
                                        transition: '0.5s',
                                        top: '227px',
                                        backgroundColor: 'black',
                                        opacity: opacity,
                                        position: 'absolute',
                                        width: '330px',
                                        padding: '15px 15px 15px 15px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}>
                                        <div className="card-header" style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div className="first-name">
                                                <Typography variant="h5" color="text.primary" noWrap style={{
                                                    color: 'white',
                                                    maxWidth: '300px',
                                                    fontSize: "25px",
                                                    fontWeight: 500,
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    {`${request.profile[0].firstName}'s Group`}
                                                    < div className="display-verified" style={{padding: '5px'}}>
                                                        {/*TODO: If all profiles are verified through premium subscription then checkmark*/}
                                                        {/* Verification can't be done right now
                                                            request.profile[0].verified ?
                                                                <Tooltip title={'All Group Members Are Verified'} arrow>
                                                                    <div><MdVerified
                                                                        style={{fontSize: "medium", color: 'aqua',}}/>
                                                                    </div>
                                                                </Tooltip>
                                                                : null
                                                        */}
                                                    </div>
                                                </Typography>
                                            </div>
                                            <Tooltip title={eyeIcon ? "Close Profiles" : "View All Profiles"} arrow
                                                     placement="left">
                                                <IconButton onClick={handleEyeButtonChange}
                                                            style={{padding: '2px', color: 'white'}}>
                                                    {eyeIcon ? <FiEyeOff/> : <FiEye/>}
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={"Message this group"} arrow placement="left">
                                                <IconButton onClick={() => {
                                                    setMessageIcon(!messageIcon);
                                                }} style={{
                                                    right: '15px',
                                                    top: '80px',
                                                    position: 'absolute',
                                                    padding: '2px',
                                                    color: 'white'
                                                }}>
                                                    {messageIcon ? <TbMessagesOff/> : <TbMessages/>}
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Tooltip title={"The Group's Total Budget"} arrow placement="right">
                                                <Typography variant="h6" color="text.primary" style={{
                                                    fontSize: '22px',
                                                    display: 'inline-block',
                                                    alignItems: 'center',
                                                    color: 'white',
                                                    overflow: 'hidden',
                                                }}>
                                                    {`$${request.rentBudget}/month  `}
                                                </Typography>
                                            </Tooltip>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Tooltip arrow placement="right"
                                                     title={`There are ${existingBunkmates} people in this group`}>
                                                <Typography variant="h6" color="text.primary" style={{
                                                    fontSize: "18px",
                                                    display: 'inline-block',
                                                    color: 'aqua',
                                                    overflow: 'hidden',
                                                }}>
                                                    {existingBunkmates === 1 ? `${existingBunkmates} bunkmate` : `${existingBunkmates} bunkmates`}
                                                </Typography>
                                            </Tooltip>
                                        </div>
                                    </CardContent>

                                </div>
                                <Divider style={{margin: '10px', width: '93%'}}/>
                                <Typography
                                    style={{padding: '10px', overflowY: 'scroll', width: '100%', maxHeight: '100px',}}
                                    variant="body1" color="text.secondary">
                                    {request.aboutUs}
                                </Typography>
                            </header>
                        </div>
                        {/*
                    <div style={{ display: 'flex', flexFlow: "row nowrap", justifyContent: 'center' }}>
                        
                        <ActionButton borderRadius="15px" title="Message" width="140px" height="40px" />
                        <ActionButton borderRadius="15px" title="Profile" width="140px" height="40px" />
                    </div>
                                                    */}

                        {request.listingObject ?
                            <>
                                <Divider style={{margin: '10px', width: '93%'}}/>
                                <Tooltip
                                    title={`Listing in Mind: $${request.listing[0].price} per month, split across ${totalBunkmates(existingBunkmates, newBunkmates)} bunkmates`}
                                    arrow>
                                    <CardActionArea>
                                        <SavedListingItem
                                            index={1}
                                            image={request.listing[0].image}
                                            address={request.listing[0].address}
                                            price={request.listing[0].price}
                                            //used for calculations later, takes the existing number of roommates plus number of roommates the user is seeking
                                            totalBunkmates={totalBunkmates(existingBunkmates, newBunkmates)}
                                            bedBath={request.listing[0].bedBath}
                                            addressWidth="270px"
                                        />
                                    </CardActionArea>
                                </Tooltip>
                            </> : null
                        }
                        <Divider style={{margin: '10px', width: '93%'}}/>

                        <CardContent sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexFlow: 'row wrap'
                        }}>
                            <div className="column-1">
                                <BunkmateInfo label="Seeking" value={request.numRoommates}/>
                                <BunkmateInfo label="Ideal Gender" value={request.roommateGender}/>
                                <BunkmateInfo label="Ideal Age"
                                              value={`${request.rangeSliderValue[0]}-${request.rangeSliderValue[1]}`}/>
                            </div>
                            <div className="column-2">
                                <BunkmateInfo label="Move In" value={request.dateValue}/>
                                <BunkmateInfo label="For" value={request.idealLengthStay}/>
                                {request.flexibility !== "0" ?
                                    <Tooltip title="How far the user is willing to move from the current location">
                                        <div>
                                            <BunkmateInfo label="Flexibility" value={`${request.flexibility} km`}/>
                                        </div>
                                    </Tooltip> : null
                                }
                            </div>
                        </CardContent>
                    </div>
                </Card>
                {/*
                 showProfile ?
                        <>
                            < div className="nested-card"
                                  style={{height: '688px', width: 420, margin: '20px', overflowY: "scroll"}}>
                                 TODO broken other profiles can't be displayed in the group map profile card
                                {Array(2).map((otherProfile) => {
                                    return <NestedMapCard profile={otherProfile}/>
                                })}
                            </div>
                        </>
                        : null}*/}
            </div>
        </InfoWindowF>

    )
}

export default GroupMapCard 