import React, {useContext, useEffect, useState} from "react";
import {GoogleMap, MarkerF, OVERLAY_MOUSE_TARGET, OverlayViewF} from "@react-google-maps/api";
import mapStyles from '../../data/mapStyles.json'
import {Card, Typography, IconButton, Tooltip, CircularProgress} from "@mui/material/"
import "./Styles/Bunkmates.css"
import CreateRequestForm from './Components/RequestForm/CreateRequestForm'
import {ActionButton} from "../../Components/Utils/Form";
import {chatClientContext} from "../../Components/GlobalStateManagement/MessageContext";
import {SignInContext} from "../../Components/GlobalStateManagement/SignInContext";
import SingleMapCard from "./Components/Map/SingleMapCard"
import GroupMapCard from "./Components/Map/GroupMapCard"
import {deleteRequest} from '../../api'
import {RxTriangleDown} from "react-icons/rx"
import {MapRequestMarker} from './Components/Map/MapMarkers'
import {TbSocial, TbSocialOff} from "react-icons/tb";
import {SocialFeed} from "./Components/SocialFeed/SocialFeed";
import {useGetUserData} from "./Hooks/useGetUserData";
import {getPost} from "../../api";
import {KeyLocationsMarkers} from "./Components/Map/KeyLocations";
import {useDispatch, useSelector} from 'react-redux';
import {setCenter, setMapProfileCard, setRerender, setZoom} from "../../features/bunkmate/bunkmateSlice";
import {useJsApiLoader} from "@react-google-maps/api";


export function MapProfile({request, center}) {

    //determines whether to render single or group map card

    //store the coordinates of the map pin that was clicked on
    const [coordinates, setCoordinates] = useState({})

    useEffect(() => {
        setCoordinates({lat: request.idealLocation[0], lng: request.idealLocation[1]})
    }, [request])

    //as well as set bunkmate info at the bottom of the card
    function BunkmateInfo(props) {
        return (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
                <Typography gutterBottom variant="body1" color="text.primary" style={{fontSize: '16px'}}>
                    {`${props.label}:\u00a0`}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary" style={{fontSize: '15px'}}>
                    {props.value}
                </Typography>
            </div>
        );
    }

    return (
        /*
        <SingleMapCard profile={profile} BunkmateInfo={BunkmateInfo} />
        */
        request.request === "As myself"
            ? <SingleMapCard
                BunkmateInfo={BunkmateInfo}
                request={request}
                coordinates={coordinates}
                center={center}
            />
            : <GroupMapCard
                BunkmateInfo={BunkmateInfo}
                request={request}
                coordinates={coordinates}
                center={center}
            />
    )
}


const Bunkmates = () => {
    const [socialFeed, setSocialFeed] = useState(false);
    const [requestForm, setRequestForm] = useState(false);
    const [libraries] = useState(["places"]);
    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })


    const id = JSON.parse(localStorage.getItem("profile"))?.result?._id;
    //retrieve local storage data
    const {localStorageData} = useContext(chatClientContext)
    //sign in context for when the user tries to create a bunkmate request without an account
    const {setIsOpen, setMessage, setMode} = useContext(SignInContext)

    //select states from global redux store
    const dispatch = useDispatch();
    const center = useSelector(state => state.bunkmate.center);
    const mapProfileCard = useSelector(state => state.bunkmate.mapProfileCard);
    const zoom = useSelector(state => state.bunkmate.zoom);
    const keyLocationPins = useSelector(state => state.bunkmate.keyLocationPins);

    //state places autocomplete
    const [selected, setSelected] = useState(false);
    //if the user has a profile then set profileChecker to true else false
    //used to rerender useEffect in Bunkmates.js containing async functions that gets data from backend
    const {loading, listingArray, userRequests, userProfile, userOwnData,} = useGetUserData()

    const [statePostArray, setStatePostArray] = useState([])
    //get Social feed information
    useEffect(() => {
        console.log(zoom)
        getPost().then((result) => setStatePostArray(result.data.reverse()));
        if (!zoom) {
            dispatch(setZoom(15));
        }

    }, [])


    //THIS LOGIC ONLY WORKS FOR NOW PROBABLY CHANGE THE API ENDPOINT TO RETURN A BOOLEAN THAT IS EITHER TRUE OR FALSE
    //contains the user's own data

    //dictionary that stores the userId as the key and the object as the value
    //contains all requests generated through accounts


    if (!isLoaded || loadError) {
        return <h1>ERROR HAS OCCURED</h1>
    }

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
            setRequestForm(!requestForm)
            //dispatch(showRequestForm(!requestForm))
        }
    }


    const handleProfileClickAsync = (e) => {
        const request = userRequests.get(e?.currentTarget?.id)
        //MapProfile decides houses logic for deciding whether to show single or group map card
        dispatch(
            setMapProfileCard(
                <MapProfile
                    request={request}
                    center={center}
                />)
        )
        //store the coordinates of the pin that was clicked on
    }

    function BunkmateRequestPage() {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                top: '30vh',
                position: 'absolute',
                maxWidth: '500px'
            }}>
                <Card variant="outlined" className="create-request-container"
                      sx={{padding: '20px', borderRadius: '10px', opacity: 0.9}}>
                    <CreateRequestForm userRequest={userOwnData} onClick={handleRequestClick}/>
                </Card>
            </div>)
    }

    function CreateRequestButton() {
        return (
            <div style={{display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute',}}>
                <ActionButton onClick={(e) => {
                    handleRequestClick();
                    e.stopPropagation()
                }} bgColor={"black"} title={"Create Bunkmate Request"} opacity='0.85'/>
            </div>
        )
    }

    function EditRequestButton() {
        //edit and delete functionality
        return (
            <div style={{display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute',}}>
                {/* edit bunkmates request button */}
                <ActionButton onClick={(e) => {
                    handleRequestClick();
                    dispatch(setCenter({lat: userOwnData.idealLocation[0], lng: userOwnData.idealLocation[1]}));
                    e.stopPropagation()
                }} bgColor={"black"} title={"Edit Bunkmate Request"} opacity='0.85'/>
                <Tooltip arrow title={"Delete Request"}>
                    {/* X buton to delete profiles */}
                    <div>
                        <ActionButton onClick={(e) => {
                            deleteRequest().then(() => {
                                userRequests.delete(id);
                                dispatch(setRerender());
                                e.stopPropagation()
                            });
                        }} bgColor={"black"} title={"X"} opacity='0.85'/>
                    </div>
                </Tooltip>
            </div>
        )
    }

    function LoadingUi() {
        return (
            <div style={{display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute'}}>
                <ActionButton opacity={0.85} bgColor="black" height='55px' title={<CircularProgress size={35}/>}
                              paddingTop="12px"/>
            </div>
        )
    }

    //delay the zooming in and out of the map to allow time for tiles to render properly
    function debounce(func, delay) {
        let timerId;
        return function (...args) {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    const handleZoomChange = debounce((newZoomLevel) => {
        dispatch(setZoom(newZoomLevel));
    }, 500);


    console.log('bunkamtes')

    const handleDisplaySocials = (e) => {
        setSocialFeed(!socialFeed);
        //dispatch(showSocialFeed(true));
        e.stopPropagation();
    }

    const handleHideSocials = (e) => {
        setSocialFeed(!socialFeed);
        // dispatch(showSocialFeed(false));
        e.stopPropagation();
    }

    return (
        <div>
            <div className="content-container">
                {/*
                    mapProfileCard
                        ? null
                        : <div className="search-bar-container" style={{ height: '200px', top: '19vh', position: 'absolute', display: 'flex', justifyContent: 'center' }}>
                            <PlacesAutocomplete setSelected={setSelected} setCenter={setCenter} />
                        </div>
                */}
                <div className="map-container">

                    <GoogleMap
                        id="map"
                        center={center}
                        zoom={zoom}
                        onZoomChanged={(newZoomLevel) => handleZoomChange(newZoomLevel)}
                        mapContainerStyle={{width: "100%", height: "100vh"}}
                        options={{
                            styles: mapStyles,
                            streetViewControl: false, mapTypeControl: false,
                        }}
                        onClick={() => {
                            dispatch(setMapProfileCard(null))
                        }}>
                        <div id="results"/>
                        <section className="bunkamtes__social-feed" style={{
                            borderRadius: '50%',
                            backgroundColor: 'black',
                            position: 'absolute',
                            top: '275px',
                            height: '40px',
                            width: '40px',
                            right: '10px',
                        }}>
                            {
                                socialFeed ?
                                    <Tooltip arrow title="Close Socials Page">
                                        <IconButton onClick={handleHideSocials}>
                                            <TbSocialOff style={{color: 'white',}}/>
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip arrow title="Show Socials Page">
                                        <IconButton onClick={handleDisplaySocials}>
                                            <TbSocial style={{color: 'white',}}/>
                                        </IconButton>
                                    </Tooltip>
                            }
                        </section>

                        <KeyLocationsMarkers keyLocationPins={keyLocationPins} center={center}/>
                        {socialFeed ? <SocialFeed userOwnData={userOwnData} userProfile={userProfile}
                                                  statePostArray={statePostArray}
                                                  setStatePostArray={setStatePostArray}/> : null}
                        {mapProfileCard ?? null}

                        {selected &&
                            <MarkerF position={center} icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}/>}
                        {listingArray.map((request, index) => {
                            return (
                                <OverlayViewF
                                    key={request?.user}
                                    position={{lat: request?.idealLocation[0], lng: request?.idealLocation[1]}}
                                    styles={{background: 'DarkGray', color: 'white'}}
                                    mapPaneName={OVERLAY_MOUSE_TARGET}>
                                    {<MapRequestMarker
                                        request={request}
                                        handleClick={handleProfileClickAsync}
                                        index={index}
                                        icon={
                                            <RxTriangleDown
                                                style={{
                                                    right: '15px',
                                                    color: '#2ACDDD',
                                                    position: 'absolute',
                                                    top: '35px',
                                                    fontSize: '30px'
                                                }}
                                            />}/>}
                                </OverlayViewF>
                            )
                        })}
                    </GoogleMap>
                </div>
                {
                    //if the user has clicked on a map card then these buttons won't be shown show that it doesn't clutter the screen
                    mapProfileCard
                        ? null
                        //if the user has clicked on the button show the request page else show the button
                        : <>{requestForm
                            ? <BunkmateRequestPage/>
                            : loading
                                ? <LoadingUi/>
                                : userOwnData
                                    //if the user has an active request then show the edit request button else show the create request button
                                    ? <EditRequestButton/>
                                    : <CreateRequestButton/>}
                        </>
                }
            </div>
        </div>
    )
}

export default Bunkmates;

/*
const markerOptions = ({ profile }) => {
    return {
        icon: {
            url: 'https://static.vecteezy.com/system/resources/previews/006/828/456/original/bright-smiley-face-emoji-expression-free-vector.jpg',
            size: new window.google.maps.Size(50, 50),
            anchor: new window.google.maps.Point(25, 25)
        }, label: {
            text: `${userOwnData.rentBudget}`,
        }
    }
};
*/
