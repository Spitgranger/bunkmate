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
        <OverlayView mapPaneName={OVERLAY_MOUSE_TARGET} position={profile.location}>
            <Card sx={{ width: 300, position: "absolute", zIndex: "2" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={profile.image}
                        alt="profile picture"
                    />
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