import {useEffect, useState, useContext} from 'react';
import './styles/Profile.css'
import Navbar from '../navigation/Navbar.tsx';
import {UserDataContext} from '../../Components/GlobalStateManagement/UserDataContext.tsx';
import {ActionButton} from '../../Components/Utils/Form.tsx';
import {Box} from '@mui/system';
import Divider from '@mui/material/Divider'
import Tooltip from "@mui/material/Tooltip";
import {CardHeader, Card, Typography, CardMedia, CardContent, IconButton} from "@mui/material/"
import {HiMapPin} from 'react-icons/hi2'
import {GrInstagram, GrFacebook, GrLinkedin, GrTwitter} from 'react-icons/gr'
import {BiMessageDetail} from 'react-icons/bi'
import {MdVerified, MdPets, MdCleaningServices} from 'react-icons/md';
import {FaBook, FaSmoking, FaCannabis, FaWineGlassAlt, FaRegHandshake, FaDog} from 'react-icons/fa'
import {BsBookmarks, BsBookmarksFill, BsFillClockFill, BsInfinity, BsBriefcaseFill, BsAlarmFill} from 'react-icons/bs';
import CircularProgress from '@mui/material/CircularProgress';
import {useLocation, Link} from 'react-router-dom';
import {getRequests} from '../../api';
import {useAppSelector} from "../../store/hooks.ts";
import {RootState} from "../../store";
import {setCenter, setZoom} from "../../features/bunkmate/bunkmateSlice.ts";
import {useDispatch} from "react-redux";
import {FieldsProps, NestedStyles} from "./types/profileTypes.ts";
import {Request, Profile} from "MapTypes";


/*
'@media (max-width: 1000px)':{
  backgroundColor: 'red'
}
*/

//This is the component that handles the displaying other user's profiles, displaying the user's details and other things.
export function OtherProfile() {

    const pageStyles: NestedStyles = {
        page: {display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%'},
        profileContainer: {display: 'flex', flexFLow: 'row wrap', width: '75%', height: '91vh'},
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
    const dispatch = useDispatch()
    const rerender = useAppSelector((state: RootState) => state.bunkmate.rerender)
    //state to manage the bookmark icon that is shown
    const [bookmark, setBookmark] = useState(false);
    //state management just for the request button
    const [isProfileLoading, setIsProfileLoading] = useState(true)
    const [isRequestLoading, setIsRequestLoading] = useState(true)

    const {profileHandleRetrieval} = useContext(UserDataContext)
    const [data, setData] = useState("");
    const [request, setRequest] = useState<Request | undefined>();

    //get other user's request to extract userId
    const {state} = useLocation();
    const userId = state.user ?? state.userId
    //use userId to query the profile of the user
    const [otherProfile, setOtherProfile] = useState<Profile | undefined>()

    const handleGetProfiles = async () => {
        //state contains user id found in userProfile, userOwnData, and post
        setData(state)
        return await profileHandleRetrieval(userId)
    }
    useEffect(() => {
        handleGetProfiles().then((profiles) => setOtherProfile(profiles.data[0])).finally(() => setIsProfileLoading(false))
    }, [rerender])

    //query localStorage whenever mapProfileCard changes (primarily used to update the state of the "view request button")
    useEffect(() => {
        //get request data from backend
        async function handleRequest() {
            return await getRequests();
        }

        type RequestDict = { [key: string]: Request }
        //store user request data
        handleRequest().then((request) => {
            const requestDict: RequestDict = {}
            request.data.map(
                (userObject: Request): void => {
                    requestDict[userObject.user] = userObject;
                });
            const userRequest: Request = requestDict[userId]
            setRequest(userRequest);
        }).finally(() => setIsRequestLoading(false));

    }, [])


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
                    <Typography sx={{...primaryStyles, paddingLeft: '15px', fontSize: "17px"}} variant="h6"
                                color="text.primary">{`${fieldTitle}: `}</Typography>
                </div>
                <div style={{width: '50%'}}>
                    <Typography sx={{...bodyStyles, padding: '5px', display: 'flex', justifyContent: 'flex-start'}}
                                variant="body1" color="text.secondary">{fieldValue}</Typography>
                </div>
            </div>
        )

    }

    function HandleViewRequest() {

        dispatch(setZoom(15))
        dispatch(setCenter({lat: request.idealLocation[0], lng: request.idealLocation[1]}))
        //don't need to setMapProfileCard here because it was already opened to navigate to the otherprofile page and was stored in global state
        /*setMapProfileCard(
            <MapProfile
                request={request}
                center={center}
            />)*/
        //if the user has an active request then open bunkmates page then center and open up their map profile card

    }

    function DisplayActiveRequest() {

        if (isRequestLoading) {
            return <div><CircularProgress size={50} sx={{padding: '10px'}}/></div>
        } else if (request && !isRequestLoading) {
            return (
                <Tooltip arrow title={`${otherProfile.firstName} has an active request`}>
                    <Link
                        to="/bunkmates"
                        onClick={HandleViewRequest}
                        style={{textDecoration: 'none'}}>
                        <ActionButton startIcon={<HiMapPin/>} height="30px" title={"View Request"}/>
                    </Link>
                </Tooltip>
            )
        }
    }

    if (otherProfile && !isProfileLoading) {
        return (
            <div style={pageStyles.page}>
                <div style={{height: '9vh'}}/>
                <div style={pageStyles.profileContainer}>
                    <Card sx={pageStyles.leftColumn}>
                        <CardMedia sx={pageStyles.profilePicture} component="img" image={otherProfile.picture}/>
                        <CardContent>
                            <div style={pageStyles.socialLinks}>
                                <IconButton><GrInstagram/></IconButton>
                                <IconButton><GrFacebook/></IconButton>
                                <IconButton><GrLinkedin/></IconButton>
                                <IconButton><GrTwitter/></IconButton>
                            </div>
                            <Divider sx={pageStyles.divider} flexItem={true} textAlign='center'>Description</Divider>
                            <Fields iconStart={<BsFillClockFill style={{color: '#2ACDDD'}}/>} fieldTitle="Age"
                                    fieldValue={otherProfile.age}/>
                            <Fields iconStart={<BsInfinity style={{color: '#2ACDDD'}}/>} fieldTitle="Gender"
                                    fieldValue={otherProfile.gender}/>
                            <Fields iconStart={<BsBriefcaseFill style={{color: '#2ACDDD'}}/>} fieldTitle="Occupation"
                                    fieldValue={otherProfile.employment}/>
                            <Fields iconStart={<FaBook style={{color: '#2ACDDD'}}/>} fieldTitle="Current Education"
                                    fieldValue={otherProfile.education}/>
                        </CardContent>
                    </Card>
                    <Card sx={pageStyles.middleColumn}>
                        <header style={pageStyles.header}>
                            <Tooltip arrow placement="right" title={"Active 3 hours ago"}>
                                <CardHeader sx={pageStyles.cardHeader} titleTypographyProps={pageStyles.name}
                                            subheader={otherProfile.email} color="text.primary"
                                            title={[otherProfile.firstName,
                                                <MdVerified style={{color: '#2ACDDD', margin: '5px'}}/>]}/>
                            </Tooltip>
                            <div style={pageStyles.actionCenter}>

                                <DisplayActiveRequest/>

                                <Tooltip title={`Message ${otherProfile.firstName} `}>
                                    <IconButton>
                                        <BiMessageDetail/>
                                    </IconButton>
                                </Tooltip>
                                {bookmark
                                    ?
                                    <Tooltip arrow title="This profile has been saved!">
                                        <IconButton onClick={() => setBookmark(!bookmark)}>
                                            <BsBookmarksFill style={{color: '#2ACDDD'}}/>
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip arrow title="Save this profile">
                                        <IconButton onClick={() => setBookmark(!bookmark)}>
                                            <BsBookmarks/>
                                        </IconButton>
                                    </Tooltip>
                                }
                            </div>
                        </header>
                        <Divider sx={pageStyles.divider} textAlign='left'>Biography</Divider>
                        <CardContent>
                            <Typography sx={pageStyles.biography} variant="body1"
                                        color="text.secondary">{otherProfile.about}</Typography>
                            <Divider sx={pageStyles.divider} textAlign='left'>Habits and Lifestyles</Divider>
                            <div style={pageStyles.habitsAndLifestyle}>
                                <section style={pageStyles.fieldsWrapper}>
                                    <div style={pageStyles.fields}>
                                        <div style={{width: '100%'}}>
                                            <Fields iconStart={<MdPets style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Own Pets" fieldValue={otherProfile.havePets}/>
                                            <Fields iconStart={<BsAlarmFill style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Sleep Schedule"
                                                    fieldValue={otherProfile.sleepSchedule}/>
                                        </div>
                                    </div>
                                    <div style={pageStyles.fields}>
                                        <div style={{width: '100%'}}>
                                            <Fields iconStart={<MdCleaningServices style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Cleanliness" fieldValue={otherProfile.cleanliness}/>
                                            <Fields iconStart={<FaWineGlassAlt style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Drinking" fieldValue={otherProfile.drinking}/>
                                        </div>
                                    </div>
                                </section>
                                <section style={pageStyles.fieldsWrapper}>
                                    <div style={pageStyles.fields}>
                                        <div style={{width: '100%'}}>
                                            <Fields iconStart={<FaSmoking style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Smoking" fieldValue={otherProfile.smoking}/>
                                            <Fields iconStart={<FaCannabis style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Cannabis" fieldValue={otherProfile.cannabis}/>
                                        </div>
                                    </div>
                                    <div style={pageStyles.fields}>
                                        <div style={{width: '100%'}}>
                                            <Fields iconStart={<FaRegHandshake style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Ok With Guests"
                                                    fieldValue={otherProfile.tolerateGuests}/>
                                            <Fields iconStart={<FaDog style={{color: '#2ACDDD'}}/>}
                                                    fieldTitle="Ok With Pets" fieldValue={otherProfile.toleratePets}/>
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

    } else if (!otherProfile && !isProfileLoading) {
        return (
            <div className='page-container'>
                <div style={{height: '9vh'}}/>
                <Navbar/>
                <div className="error-content">
                    <h1>Profile doesn't exist</h1>
                </div>
            </div>
        )
    } else {
        return (
            <Box style={pageStyles.loadingUi}><CircularProgress size={50}/></Box>)
    }
};
