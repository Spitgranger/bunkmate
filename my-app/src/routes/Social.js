import react, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OVERLAY_LAYER } from "@react-google-maps/api";
import mapStyles from './mapStyles.json'
import { Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent } from "@mui/material/"
import "./Social.css"
import PlacesAutocomplete from "../Components/SubComponents/PlacesAutocomplete";
import profiles from "../testing_data/testingData"
import SignInProvider from '../Components/GlobalStateManagement/SignInContext';
import { getProfile } from '../api'

const libraries = ["places"];
const Profile = ({ profile }) => {
    console.log(profile)
    return (
        <div className="card">
            <div className="ds-top"></div>
            <div className="avatar-holder">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950" alt="Vendrick" />
            </div>
            <div className="name">
                <a href="https://codepen.io/AlbertFeynman/" target="_blank">Vendrick Feynman</a>
                <h6 title="Profile" className="keyInfo"><i className="fas fa-users"></i> <span className="followers">90</span></h6>
                <h6 style={{ width: '100%', justifyContent: 'center', display: 'flex', whiteSpace: 'nowrap' }}>26 year old Male - Student</h6>
            </div>
            <div className="button">
                <a href="#" className="btn" onmousedown="follow();">Message <i className="fas fa-user-plus"></i></a>
                <h6 style={{ color: 'white' }}>Some call me a pest because i'm the best,s ssssssssssssssssssss</h6>
            </div>
            <div className="ds-info">
                <div className="ds pens">
                    <h6 title="Number of pens created by the user">Budget:<i className="fas fa-edit"></i></h6>
                    <p>$640/month</p>
                </div>
                <div className="ds projects">
                    <h6 title="Number of projects created by the user">Move In <i className="fas fa-project-diagram"></i></h6>
                    <p>2/2/2023</p>
                </div>
                <div className="ds posts">
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
    */}
        </div>



        /*
        <OverlayView mapPaneName={OVERLAY_MOUSE_TARGET} position={profile.location}>
            <Card sx={{ width: 300, position: "absolute", zIndex: "2" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={profile.image}
                        alt="profile picture"
                    />
                    <div>kevin</div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {profile.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {profile.budget}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </OverlayView>
        */

    )
}

const Social = () => {


    const [selected, setSelected] = useState(null);
    const center = selected || { lat: 43.642075, lng: -79.385981 };
    const [profile, setProfile] = useState(null);
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })
    /*
    const handleLoad = async () => {
        const profile = await getProfile();
        return profile;
    }

    useEffect(() => {
        handleLoad().then((profile) => setProfile(profile.data)).catch(error => console.log(error))
    }, []);
    */
    if (!isLoaded) {
        return <h1>ERROR HAS OCCURED</h1>
    }
    const handleProfileClick = (e, index) => {
       // console.log(profiles[index]);
        setProfile(<Profile profile={profiles[index]} />)
    }
    return (
        <div>
            <SignInProvider>
                <Navbar />
            </SignInProvider>
            <div className="content-container">
                <div className="search-bar-container" style={{ height: '200px', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PlacesAutocomplete setSelected={setSelected} />
                </div>
                <div className="map-container">
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: "100%", height: "95vh" }}
                        options={{ styles: mapStyles, streetViewControl: false }}
                        onClick={() => { setProfile(null) }}
                    >
                        {profile ? profile : null}
                        {selected && <MarkerF position={selected} icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"} />}
                        {profiles.map((profile, index) => { return <MarkerF onClick={(e) => handleProfileClick(e, index)} key={index} position={profile.location} />; })}

                    </GoogleMap >
                </div>
            </div>
        </div >
    )
}

export default Social;