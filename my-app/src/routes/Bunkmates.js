import react, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OverlayViewF, MapContext } from "@react-google-maps/api";
import mapStyles from './mapStyles.json'
import { Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent, CardActions, IconButton } from "@mui/material/"
import "./Bunkmates.css"
import PlacesAutocomplete from "../Components/SubComponents/Bunkmates/PlacesAutocomplete";
import mapCardData from "../testing_data/mapCardData"
import { getProfile } from '../api'
import SocialFeed from "../Components/SocialFeed";
import CreateRequestForm from '../Components/CreateRequestForm'
import { ActionButton } from "../Components/SubComponents/Form";
import { chatClientContext } from "../Components/GlobalStateManagement/MessageContext";
import { SignInContext } from "../Components/GlobalStateManagement/SignInContext";
import SingleMapCard from "../Components/SubComponents/Bunkmates/SingleMapCard";
import GroupMapCard from "../Components/SubComponents/Bunkmates/GroupMapCard";
import { getRequests } from "../api";
import { InfoWindow } from "@react-google-maps/api";
import { borderRadius } from "@mui/system";
import { BunkmatesContext } from "../Components/GlobalStateManagement/BunkmatesContext";
import { RxTriangleDown } from "react-icons/rx"
import { CreateRequestContext } from "../Components/GlobalStateManagement/BunkmatesContext";




const libraries = ["places"];


export function MapProfile({ profile, type, request }) {

    //determines whether to render single or group map card
    //as well as set bunkmate info at the bottom of the card
    const [sideCard, setSideCard] = useState(null)
    console.log(type)


    const handleEnter = () => {
        setSideCard(<div></div>)
    }


    function BunkmateInfo(props) {
        return (
            <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }} >
                <Typography gutterBottom variant="body1" color="text.primary" style={{ fontSize: '16px' }}>
                    {`${props.label}:\u00a0`}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary" style={{ fontSize: '15px' }}>
                    {props.value}
                </Typography>
            </div >
        );
    }

    return (
        /*
        <SingleMapCard profile={profile} BunkmateInfo={BunkmateInfo} />
        */
        profile.request || type === "As myself"
            ? <SingleMapCard profile={profile} BunkmateInfo={BunkmateInfo} request={request} />
            : <GroupMapCard profile={profile} BunkmateInfo={BunkmateInfo} />
    )
}


const Bunkmates = () => {

    const socialFeedStyles = {
        FeedContainer: {
            overflow: 'scroll', height: '77.5vh', position: 'absolute', right: '0.5%', top: '5%', maxWidth: '20%'
        }
    }

    //store user profile data
    const [userProfile, setUserProfile] = useState("")
    //store user request data
    const [userRequest, setUserRequest] = useState(new Map());
    //retrieve local storage data
    const { GetClientInfo, localStorageData } = useContext(chatClientContext)
    //sign in context for when the user tries to create a bunkmate request without an account
    const { setIsOpen, setMessage, setMode } = useContext(SignInContext)
    //display, nodisplay of the create request page
    const [showRequest, setShowRequest] = useState(false);
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState({ lat: 43.642075, lng: -79.385981 });
    const { mapProfileCard, setMapProfileCard } = useContext(BunkmatesContext)
    //if the user has a profile then set profileChecker to true else false
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })
    const handleSubmit = useContext(CreateRequestContext)
    const [listingArray, setListingArray] = useState([]);


    useEffect(() => {
        //get profile data from backend
        async function handleProfile() {
            const profile = await getProfile();
            return profile
        }
        //get request data from backend
        async function handleRequest() {
            const request = await getRequests();
            return request
        }
        //store user profile data
        handleProfile().then((profile) => setUserProfile(profile));

        //store user request data
        handleRequest().then((request) => request.data.forEach(
            (user) => {
                setListingArray([...listingArray, user])
                setUserRequest(userRequest.set(user.user, user));
            }
        ));
    }, [handleSubmit])

    useEffect(() => {
        console.log(listingArray)
    }, [listingArray])
    //THIS LOGIC ONLY WORKS FOR NOW PROBABLY CHANGE THE API ENDPOINT TO RETURN A BOOLEAN THAT IS EITHER TRUE OR FALSE
    const userRequestData = userRequest.get(JSON.parse(localStorage.getItem("profile"))?.result?._id);
    console.log(userRequestData)

    const handleRequestClick = () => {

        //if user is not signed in
        if (!localStorageData) {
            setMessage("Sign Up Now!")
            setMode("signUpEmail")
            setIsOpen(true)
            //else if user is logged in but has no profile
        } else if (localStorageData && !userProfile) {
            setMessage("Get Matched With Bunkmates!");
            setMode('profileMakerForm');
            setIsOpen(true)
            //if user is logged in and has an existing profile then show them the request page
        } else if (localStorageData && userProfile) {
            setShowRequest(!showRequest)
        }
    }

    const profiles = JSON.parse(localStorage.getItem('mapCardData')) || mapCardData;
    /*
    useEffect(() => {
        setProfile(<MapProfile profile={profiles[5]} />)
    }, [])
    */

    if (!isLoaded) {
        return <h1>ERROR HAS OCCURED</h1>
    }

    const handleProfileClick = (e, index) => {
        console.log("Request clicked")
        setMapProfileCard(<MapProfile profile={profiles[index]} />)
    }
    const handleProfileClickAsync = (e) => {
        console.log("Request clicked")
        const request = userRequest.get(e?.currentTarget?.id)
        setMapProfileCard(<MapProfile profile={request?.profile[0]} type={request?.request} request={request} />)
    }


    /*
    const instantiateChatClient = async () => {
        return GetClientInfo();
    }
    */

    function BunkmateRequestPage() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', top: '35vh', position: 'absolute', maxWidth: '500px' }}>
                <Card variant="outlined" className="create-request-container" sx={{ padding: '20px', borderRadius: '10px', opacity: 0.9 }}>
                    <CreateRequestForm userRequest={userRequestData} onClick={handleRequestClick} />
                </Card>
            </div >)
    }

    function CreateRequestButton() {
        return (
            <div style={{ display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute', }}>
                <ActionButton onClick={handleRequestClick} bgColor={"black"} title={"Create Bunkmate Request"} opacity='0.85' />
            </div>
        )
    }


    function EditRequestButton() {
        return (
            <div style={{ display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute', }}>
                <ActionButton onClick={() => { handleRequestClick(); setCenter({ lat: userRequestData.idealLocation[0], lng: userRequestData.idealLocation[1] }) }} bgColor={"black"} title={"Edit Bunkmate Request"} opacity='0.85' />
            </div>
        )
    }

    const markerOptions = ({ profile }) => {
        return {
            icon: {
                url: 'https://static.vecteezy.com/system/resources/previews/006/828/456/original/bright-smiley-face-emoji-expression-free-vector.jpg',
                size: new window.google.maps.Size(50, 50),
                anchor: new window.google.maps.Point(25, 25)
            }, label: {
                text: `${profile?.rentBudget}`,
            }
        }
    };

    return (
        <div>
            <div className="content-container">
                {
                    mapProfileCard
                        ? null
                        : <div className="search-bar-container" style={{ height: '200px', top: '19vh', position: 'absolute', display: 'flex', justifyContent: 'center' }}>
                            <PlacesAutocomplete setSelected={setSelected} setCenter={setCenter} />
                        </div>
                }
                <div className="map-container">
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: "100%", height: "100vh" }}
                        options={{ styles: mapStyles, streetViewControl: false }}
                        onClick={() => { setMapProfileCard(null) }}
                    >
                        <Navbar chooseStyle={"glass"} />
                        {/*
                        <div className="social-feed-container" style={socialFeedStyles.FeedContainer}>
                            <SocialFeed />
                        </div>
                        */}
                        {mapProfileCard ? mapProfileCard : null}
                        {selected && <MarkerF position={center} icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"} />}
                        {profiles.map((profile, index) => {
                            console.log(profile.idealLocation);
                            return (<OverlayViewF key={index}
                                position={{ lat: profile?.idealLocation[0], lng: profile?.idealLocation[1] }}
                                styles={{ background: 'DarkGray', color: 'white' }}
                                mapPaneName={OVERLAY_MOUSE_TARGET}>
                                {
                                    profile.request === "As myself"
                                        ? <div style={{ display: "flex", flexDirection: "row", }} onClick={e => { handleProfileClick(e, index); e.stopPropagation() }}>
                                            <img style={{ zIndex: '3', right: '7px', top: '-2.6px', position: 'absolute', width: '45px', height: '45px', border: '3px solid #2ACDDD', objectFit: "cover", borderRadius: "50%" }} src={profile?.picture} />
                                            <span style={{ zIndex: '2', minWidth: '90px', position: 'absolute', right: '-65px', display: "flex", height: "40px", padding: "10px", fontWeight: '500', color: "white", backgroundColor: '#2ACDDD', justifyContent: "center", alignItems: 'center', fontSize: "15px", borderRadius: "5px", cursor: "hover" }} >
                                                {`$${profile.rentBudget}`}
                                            </span>
                                            <RxTriangleDown style={{ right: '15px', color: '#2ACDDD', position: 'absolute', top: '35px', fontSize: '30px' }} />
                                        </div>
                                        : <div style={{ display: "flex", flexDirection: "row", }} onClick={e => { handleProfileClick(e, index); e.stopPropagation() }}>
                                            <img style={{ zIndex: '3', right: '7px', top: '-2.6px', position: 'absolute', width: '45px', height: '45px', border: '3px solid aqua', objectFit: "cover", borderRadius: "50%" }} src={profile?.picture} />
                                            <span style={{ zIndex: '2', minWidth: '90px', position: 'absolute', right: '-65px', display: "flex", height: "40px", padding: "10px", fontWeight: '500', color: "aqua", backgroundColor: 'black', border: '3px solid aqua', justifyContent: "center", alignItems: 'center', fontSize: "15px", borderRadius: "5px", cursor: "hover" }} >
                                                {`$${profile.rentBudget}`}
                                            </span>
                                            <RxTriangleDown style={{ right: '15px', color: '#2ACDDD', position: 'absolute', top: '35px', fontSize: '30px' }} />
                                        </div>
                                }
                                {/*<button style={{ padding: "2px" }} onClick={e => { handleProfileClick(e, index); e.stopPropagation()}}>{`$${profile.rentBudget}`}</button>*/}
                            </OverlayViewF >)
                            /*
                    return <MarkerF clickable={true} options={{
                        icon: {
                            url: profile?.picture,
                            size: new window.google.maps.Size(50, 50),
                            anchor: new window.google.maps.Point(25, 25),
                        }, label: {
                            text: `$${profile?.rentBudget}`,
                            color: 'white',
                        }, shape: "MarkerShapeCircle",

                    }
                    } onClick={e => handleProfileClick(e, index)} key={index} position={{ lat: profile?.idealLocation[0], lng: profile?.idealLocation[1] }} >{profile?.rentBudget}</MarkerF>;
                    */
                        })}

                        {listingArray.map((request, index) => {
                            return (<OverlayViewF key={request?.user}
                                position={{ lat: request?.idealLocation[0], lng: request?.idealLocation[1] }}
                                styles={{ background: 'DarkGray', color: 'white' }}
                                mapPaneName={OVERLAY_MOUSE_TARGET}>
                                {
                                    request.request === "As myself" ?
                                        <div style={{ display: "flex", flexDirection: "row", }} onClick={e => { handleProfileClickAsync(e, index); e.stopPropagation() }} id={request?.user}>
                                            <img style={{ zIndex: '2', right: '7px', top: '-2.6px', position: 'absolute', width: '45px', height: '45px', border: '3px solid #2ACDDD', objectFit: "cover", borderRadius: "50%" }} src={request?.profile[0]?.picture} />
                                            <span style={{ minWidth: '90px', position: 'absolute', right: '-65px', display: "flex", height: "40px", padding: "10px", fontWeight: '500', color: "white", backgroundColor: '#2ACDDD', justifyContent: "center", alignItems: 'center', fontSize: "15px", borderRadius: "5px", cursor: "hover" }} >
                                                {`$${request.rentBudget}`}
                                            </span>
                                            <RxTriangleDown style={{ right: '15px', color: '#2ACDDD', position: 'absolute', top: '35px', fontSize: '30px' }} />
                                        </div> :
                                        <div style={{ display: "flex", flexDirection: "row", }} onClick={e => { handleProfileClickAsync(e, index); e.stopPropagation() }} id={request?.user}>
                                            <img style={{ zIndex: '2', right: '7px', top: '-2.6px', position: 'absolute', width: '45px', height: '45px', border: '3px solid aqua', objectFit: "cover", borderRadius: "50%" }} src={request?.profile[0]?.picture} />
                                            <span style={{ minWidth: '90px', position: 'absolute', right: '-65px', display: "flex", height: "40px", padding: "10px", fontWeight: '500', color: "aqua", backgroundColor: 'black', border: '3px solid aqua', justifyContent: "center", alignItems: 'center', fontSize: "15px", borderRadius: "5px", cursor: "hover" }} >
                                                {`$${request.rentBudget}`}
                                            </span>
                                            <RxTriangleDown style={{ right: '15px', color: '#2ACDDD', position: 'absolute', top: '35px', fontSize: '30px' }} />
                                        </div>
                                }
                                {/*<button style={{ padding: "2px" }} onClick={e => { handleProfileClick(e, index); e.stopPropagation()}}>{`$${profile.rentBudget}`}</button>*/}
                            </OverlayViewF >)
                        })}

                    </GoogleMap >
                </div>
                {
                    //if the user has clicked on a map card then these buttons won't be shown show that it doesn't clutter the screen
                    mapProfileCard
                        ? null
                        : <>{showRequest
                            ? <BunkmateRequestPage />
                            : userRequestData
                                ? <EditRequestButton />
                                : <CreateRequestButton />}
                        </>
                }
            </div >
        </div >
    )
}

export default Bunkmates;



/*
<div className="card">
    <div style={{ filter: 'brightness(0.2) invert(0)', width: '300px' }} className="ds-top">
        <img style={{ border: '2px solid aqua', width: 'inherit' }} src="https://picsum.photos/200/80" alt="Vendrick" />
    </div>
    <div style={{ border: '3px solid aqua' }} className="avatar-holder">
        <img onMouseEnter={handleEnter} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950" alt="Vendrick" />
    </div>
    <div className="name">
        <a href="https://codepen.io/AlbertFeynman/" target="_blank">Vendrick Feynman</a>
        <h6 title="Profile" className="keyInfo"><i className="fas fa-users"></i> <span className="followers">90</span></h6>
        <h6 style={{ width: '100%', justifyContent: 'center', display: 'flex', whiteSpace: 'nowrap' }}>26 year old Male - Student</h6>
    </div>
    <div className="button">
        <a href="#" className="btn" onMouseDown="follow();">Message <i className="fas fa-user-plus"></i></a>
        <h6 style={{ color: 'white' }}>Some call me a best because i'm the pest </h6>
    </div>
    <div className="ds-info-parent">
        <div className="ds-info">
            <div className="ds-info-child">

                <div className="ds budget">
                    <h6 title="Number of pens created by the user">Budget<i className="fas fa-edit"></i></h6>
                    <p>$640/month</p>
                </div>
                <div className="ds moveIn">
                    <h6 title="Number of projects created by the user">Move In <i className="fas fa-project-diagram"></i></h6>
                    <p>2/2/2023</p>
                </div>
                <div className="ds duration">
                    <h6 title="Number of posts">Duration <i className="fas fa-comments"></i></h6>
                    <p>8-12 months</p>
                </div>
                <div className="ds bunkmates">
                    <h6 title="Number of Roomates">Bunkmates <i className="fas fa-edit"></i></h6>
                    <p>1</p>
                </div>
                <div className="ds location">
                    <h6 title="Ideal Location">Location <i className="fas fa-comments"></i></h6>
                    <p>Toronto</p>
                </div>
                <div className="ds flexibility">
                    <h6 title="Range Flexibility">Flexibility<i className="fas fa-comments"></i></h6>
                    <p>Within 10 km</p>
                </div>
            </div>
        </div>
    </div>
    {/*
    <div className="ds-skill">
        <h6> Looking For <i className="fa fa-code" aria-hidden="true"></i></h6>
        <div className="skill html">
            <h6><i className="fab fa-html5"></i> HTML5 </h6>
            <div className="bar bar-html">
                <p>95%</p>
            </div>
        </div>
        <div className="skill css">
            <h6><i className="fab fa-css3-alt"></i> CSS3 </h6>
            <div className="bar bar-css">
                <p>25%</p>
            </div>
        </div>
        <div className="skill javascript">
            <h6><i className="fab fa-js"></i> JavaScript </h6>
            <div className="bar bar-js">
                <p>75%</p>
            </div>
        </div>
    </div>
}
</div >
*/