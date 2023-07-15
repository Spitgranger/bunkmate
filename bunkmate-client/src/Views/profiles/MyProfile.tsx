import {useEffect, useState, useContext} from 'react';
import './styles/Profile.css'
import {SignInContext} from '../../Components/GlobalStateManagement/SignInContext.tsx';

import {getRequests} from '../../api';
import {ActionButton} from "../../Components/Utils/Form.tsx";
import {Link} from 'react-router-dom';
import {MapProfile} from '../Bunkmates/Bunkmates.tsx';

import Divider from '@mui/material/Divider'
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from '@mui/material/CircularProgress';
import {Card, CardHeader, Typography, CardMedia, CardContent, IconButton} from "@mui/material/"
import {Box} from '@mui/system';
import {MdVerified, MdPets, MdCleaningServices} from 'react-icons/md';
import {BsFillClockFill, BsInfinity, BsBriefcaseFill, BsPencil, BsAlarmFill} from 'react-icons/bs';
import {FaBook, FaSmoking, FaCannabis, FaWineGlassAlt, FaRegHandshake, FaDog} from 'react-icons/fa'
import {GrInstagram, GrFacebook, GrLinkedin, GrTwitter} from 'react-icons/gr'
import {HiMapPin} from 'react-icons/hi2'
//redux
import {fetchProfile} from '../../features/profile/profileSlice.ts'
import {setZoom, setMapProfileCard} from '../../features/bunkmate/bunkmateSlice.ts';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {FieldsProps, NestedStyles, RequestDict} from "./types/profileTypes.ts";
import {Request} from 'MapTypes'

//This is the component that handles the user's own profile, displaying the user details and other things.
const Profile = () => {
    const pageStyles: NestedStyles = {
        wholePage: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column'
        },
        profileContainer: {display: 'flex', flexFlow: 'row wrap', width: '75%', height: '91vh'},
        leftColumn: {flex: 1, margin: '30px', borderRadius: '15px', padding: '15px', minWidth: '350px',},
        rightColumn: {flex: 1, margin: '30px', borderRadius: '15px', padding: '10px'},
        middleColumn: {flex: 2, margin: '30px', borderRadius: '15px', padding: '10px', minWidth: '680px'},
        cardHeader: {
            whiteSpace: 'nowrap',
            margin: '0px',
            padding: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        name: {fontSize: '30px', fontWeight: 600, display: 'flex', alignItems: 'center'},
        socialLinks: {padding: '15px', display: 'flex', justifyContent: 'space-around',},
        profilePicture: {borderRadius: '15px', maxHeight: '400px', maxWidth: '100%'},
        header: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},
        actionCenter: {height: '100%', padding: '25px', display: 'flex', alignItems: 'center'},
        biography: {marginBottom: '20px', padding: '5px', display: 'flex', justifyContent: 'flex-start',},
        divider: {fontSize: '20px', padding: '10px'},
        habitsAndLifestyle: {
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        fields: {width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'},
        fieldsWrapper: {width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'},
        loadingUi: {display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100wh', height: '100vh'}
    };

    const profileData = useAppSelector(state => state.profile.profile);
    const error = useAppSelector((state) => state.profile.error)
    const {setIsOpen, setMode, setMessage} = useContext(SignInContext);
    //state to manage the profile data retrieved from the backend
    const profile = profileData;
    //state management just for the request button
    const [requestButtonMessage, setRequestButtonMessage] = useState("Inactive")
    const [showIcon, setShowIcon] = useState(false)
    const [textColor, setTextColor] = useState('red')
    const [userOwnRequest, setUserOwnRequest] = useState<Request | undefined>()
    const [isProfileLoading, setIsProfileLoading] = useState(true)
    const [isRequestLoading, setIsRequestLoading] = useState(true)


    //query localStorage whenever mapProfileCard changes (primarily used to update the state of the "view request button")
    useEffect(() => {
        //get request data from backend
        async function handleRequest() {
            return await getRequests();
        }

        const RetrievedItem: string | null = localStorage.getItem("profile")
        const userId = RetrievedItem ? (JSON.parse(RetrievedItem).result._id) : ""

        //store user request data
        handleRequest().then((request) => {
            const requestDict: RequestDict = {}
            if (userId) {
                request.data.map(
                    (user: Request): void => {
                        requestDict[user.user] = user;
                    });
                const userRequest = requestDict[userId]
                setUserOwnRequest(userRequest);
            }
            console.log(requestDict)
        })
            .finally(() => setIsRequestLoading(false))
    }, [])

    const dispatch = useAppDispatch();
    useEffect((): void => {
        //get data from backend when the component first loads works, use the dispatch associated with the profile slice
        dispatch(fetchProfile()).finally(() => {
            setIsProfileLoading(!isProfileLoading);
        }).catch(() => {
            console.log("error has occurred");
            setIsProfileLoading(false)
        })
        //handleLoad().then((profile) => setProfile(profile.data)).finally(() => setIsProfileLoading(""))

    }, []);

    const handleEditProfile = (): void => {
        setMessage("Edit Your Profile")
        setMode("profileMakerForm")
        setIsOpen(true)
    }


    const Fields = ({iconStart, fieldTitle, fieldValue, primaryStyles, bodyStyles}: FieldsProps) => {
        //Note: disable display flex to have values appear below keys

        const fieldStyles: NestedStyles = {
            fieldContainer: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px'},
            keyContainer: {display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}
        };

        return (
            <div style={fieldStyles.fieldContainer}>
                <div style={fieldStyles.keyContainer}>
                    {iconStart}
                    <Typography style={{...primaryStyles, paddingLeft: '15px', fontSize: "17px"}} variant="h6"
                                color="text.primary">{`${fieldTitle}: `}</Typography>
                </div>
                <div style={{width: '50%'}}>
                    <Typography style={{...bodyStyles, padding: '5px', display: 'flex', justifyContent: 'flex-start'}}
                                variant="body1" color="text.secondary">{fieldValue}</Typography>
                </div>
            </div>
        )

    }

    function handleMouseEnter() {
        setRequestButtonMessage('Make a request');
        setShowIcon(true);
        setTextColor("aqua")
    }

    function handleMouseLeave() {
        setRequestButtonMessage('Inactive');
        setShowIcon(false);
        setTextColor("red")
    }

    function HandleViewRequest() {
        if (userOwnRequest) {
            //NOTE: must set zoom else bunkmates page will be grey
            dispatch(setZoom(15));

            //if the user has an active request then open bunkmates page then center and open up their map profile card
            dispatch(setMapProfileCard(
                <MapProfile
                    request={userOwnRequest}
                    center={{lat: userOwnRequest.idealLocation[0], lng: userOwnRequest.idealLocation[1]}}
                />));
        }

    }

    function DisplayActiveRequest() {
        if (isRequestLoading) {
            return <div><CircularProgress size={50} sx={{padding: '10px'}}/></div>
        } else if (userOwnRequest && !isRequestLoading) {
            return (
                <Tooltip arrow title={`${profile.firstName} has an active request`}>
                    <Link
                        to="/bunkmates"
                        onClick={HandleViewRequest}
                        style={{textDecoration: 'none'}}>
                        <ActionButton startIcon={<HiMapPin/>} height="30px" title={"View Request"}/>
                    </Link>
                </Tooltip>
            )
        } else if (!userOwnRequest && !isRequestLoading) {
            return (
                <Tooltip arrow
                         title={'Making a request will let people know you are actively looking for bunkmates and will make your profile more visible'}>
                    <Link
                        to="/bunkmates"
                        style={{textDecoration: 'none'}}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <ActionButton bgColor={'black'} color={textColor} startIcon={showIcon ? <HiMapPin/> : ""}
                                      height="30px" title={requestButtonMessage}/>
                    </Link>
                </Tooltip>
            )
        }
    }


    //if profile true and loading indicator false
    //display profile page
    //if profile false and loading indicator false
    //display no profile exists page
    //else (profile no profile, loading indicator){
    //display loading indicator
    //}

    if (profile && !isProfileLoading && !error) {
        return (
            <div style={pageStyles.wholePage}>
                <div style={{height: '9vh'}}/>
                <div style={pageStyles.profileContainer}>
                    <Card sx={pageStyles.leftColumn}>
                        <CardMedia sx={pageStyles.profilePicture} component="img" image={profile.picture}/>
                        <CardContent>
                            <div style={pageStyles.socialLinks}>
                                <IconButton><GrInstagram/></IconButton>
                                <IconButton><GrFacebook/></IconButton>
                                <IconButton><GrLinkedin/></IconButton>
                                <IconButton><GrTwitter/></IconButton>
                            </div>
                            <Divider sx={pageStyles.divider} flexItem={true} textAlign='center'>Description</Divider>
                            <Fields iconStart={<BsFillClockFill style={{color: '#2ACDDD'}}/>} fieldTitle="Age"
                                    fieldValue={profile.age}/>
                            <Fields iconStart={<BsInfinity style={{color: '#2ACDDD'}}/>} fieldTitle="Gender"
                                    fieldValue={profile.gender}/>
                            <Fields iconStart={<BsBriefcaseFill style={{color: '#2ACDDD'}}/>} fieldTitle="Occupation"
                                    fieldValue={profile.employment}/>
                            <Fields iconStart={<FaBook style={{color: '#2ACDDD'}}/>} fieldTitle="Current Education"
                                    fieldValue={profile.education}/>
                        </CardContent>
                    </Card>
                    <Card sx={pageStyles.middleColumn}>
                        <header style={pageStyles.header}>
                            <Tooltip arrow placement="right" title={"Active 3 hours ago"}>
                                <CardHeader sx={pageStyles.cardHeader} titleTypographyProps={pageStyles.name}
                                            subheader={profile.email} color="text.primary"
                                            title={[profile.firstName,
                                                <MdVerified style={{color: '#2ACDDD', margin: '5px'}}/>]}/>
                            </Tooltip>
                            <div style={pageStyles.actionCenter}>

                                <DisplayActiveRequest/>

                                <Tooltip title={`Edit your profile`}>
                                    <IconButton onClick={handleEditProfile}>
                                        <BsPencil/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </header>
                        <Divider sx={pageStyles.divider} textAlign='left'>Biography</Divider>
                        <CardContent>
                            <Typography sx={pageStyles.biography} variant="body1"
                                        color="text.secondary">{profile.about}</Typography>
                            <Divider sx={pageStyles.divider} textAlign='left'>Habits and Lifestyles</Divider>
                            <div style={pageStyles.habitsAndLifestyle}>
                                <section style={pageStyles.fieldsWrapper}>
                                    <div style={pageStyles.fields}>
                                        <div style={{width: '100%'}}>
                                            <Fields iconStart={<MdPets style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Own Pets" fieldValue={profile.havePets}/>
                                            <Fields iconStart={<BsAlarmFill style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Sleep Schedule" fieldValue={profile.sleepSchedule}/>
                                        </div>
                                    </div>
                                    <div style={pageStyles.fields}>
                                        <div style={{width: '100%'}}>
                                            <Fields iconStart={<MdCleaningServices style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Cleanliness" fieldValue={profile.cleanliness}/>
                                            <Fields iconStart={<FaWineGlassAlt style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Drinking" fieldValue={profile.drinking}/>
                                        </div>
                                    </div>
                                </section>
                                <section style={pageStyles.fieldsWrapper}>
                                    <div style={pageStyles.fields}>
                                        <div style={{width: '100%'}}>
                                            <Fields iconStart={<FaSmoking style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Smoking" fieldValue={profile.smoking}/>
                                            <Fields iconStart={<FaCannabis style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Cannabis" fieldValue={profile.cannabis}/>
                                        </div>
                                    </div>
                                    <div style={pageStyles.fields}>
                                        <div style={{width: '100%'}}>
                                            <Fields iconStart={<FaRegHandshake style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Ok With Guests" fieldValue={profile.tolerateGuests}/>
                                            <Fields iconStart={<FaDog style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Ok With Pets" fieldValue={profile.toleratePets}/>
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

    } else if (error) {
        return (
            <div className='page-container'>
                <div style={{height: '9vh'}}/>
                <div className="error-content">
                    <h1>No profile associated with this account</h1>
                </div>
            </div>
        )
    } else {
        console.log(error)
        return (
            <Box style={pageStyles.loadingUi}><CircularProgress size={50}/></Box>)
    }
};

export default Profile;
