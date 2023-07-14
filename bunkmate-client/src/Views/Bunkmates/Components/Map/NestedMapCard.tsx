import Divider from '@mui/material/Divider'
import {
    Card,
    Typography,
    CardActionArea,
    CardMedia,
    CardContent,
} from "@mui/material/"
import '../../Styles/GroupMapCard.css'
import HandleViewOtherProfile from "./HandleViewOtherProfile.tsx";
import React from 'react'
import {Profile} from 'MapTypes'

/**
 * @brief info on the roommates associated with the user that made the request
 *
 *
 * @param {Profile} profile - object containing details of the user's profile
 * @returns {JSX.Element} small profile card located in expanded sidebar that shows all the roommates the user is currently bunking with
 */
function NestedMapCard(profile: Profile): React.ReactElement {

    return (
        <Card sx={{margin: '10px', width: '100%', zIndex: "2", opacity: '0.9'}} onClick={e => e.stopPropagation()}>
            <div style={{flexDirection: 'column', padding: '15px', display: 'flex', justifyContent: 'flex-start'}}>
                <div className="profile-info" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <header style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start',}}>
                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', padding: '5px'}}>
                            <HandleViewOtherProfile data={profile} content={
                                <CardActionArea style={{width: '125px', color: "black"}}> <CardMedia
                                    component="img"
                                    image={profile?.picture}
                                    alt="profile picture"
                                    sx={{width: '125px', height: '125px', borderRadius: '5%',}}
                                />
                                </CardActionArea>
                            }/>
                            <CardContent style={{
                                width: '100%',
                                padding: '0px 15px 0px 15px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <div className="card-header"
                                     style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div className="first-name">
                                        <Typography variant="h5" color="text.primary" noWrap style={{
                                            fontSize: "25px",
                                            fontWeight: 500,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{maxWidth: '130px', overflow: 'hidden'}}>
                                                {profile?.firstName}
                                            </div>
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant="body1" color="text.secondary" style={{fontSize: "17px"}}>
                                    {`${profile.age} Year Old, ${profile?.gender}`}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {profile?.occupation}
                                </Typography>
                            </CardContent>
                        </div>
                        <Divider style={{margin: '10px', width: '93%'}}/>
                        <Typography style={{padding: '10px', overflowY: 'scroll', width: '100%', height: '130px',}}
                                    variant="body1" color="text.secondary">
                            {profile?.about}
                        </Typography>
                    </header>
                </div>
            </div>
        </Card>

    )
}

export default NestedMapCard