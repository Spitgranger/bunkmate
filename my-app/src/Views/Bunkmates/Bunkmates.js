import React, { useContext, useEffect, useRef, useState, memo, useMemo, useId } from "react";
import Navbar from "../../Components/Navbar";
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OverlayViewF, MapContext, Polyline } from "@react-google-maps/api";
import mapStyles from '../../data/mapStyles.json'
import { Card, Typography, IconButton, Tooltip, CircularProgress, } from "@mui/material/"
import "./Styles/Bunkmates.css"
import PlacesAutocomplete from "./Components/Map/PlacesAutocomplete";
import mapCardData from "../../data/mapCardData"
import CreateRequestForm from './Components/Map/CreateRequestForm'
import { ActionButton } from "../../Components/Utils/Form";
import { chatClientContext } from "../../Components/GlobalStateManagement/MessageContext";
import { SignInContext } from "../../Components/GlobalStateManagement/SignInContext";
import SingleMapCard from "./Components/Map/SingleMapCard"
import GroupMapCard from "./Components/Map/GroupMapCard"
import { deleteRequest } from '../../api'
import { BuildUserContext, BunkmatesContext } from "../../Components/GlobalStateManagement/UserContext";
import { RxTriangleDown } from "react-icons/rx"
import { useNavigate } from "react-router";
import { MapRequestMarker, MapEducationMarker } from './Components/Map/MapMarker'
import { TbSocial, TbSocialOff } from "react-icons/tb";
import { SocialFeed } from "./Components/SocialFeed/SocialFeed";
import { useGetUserData } from "./Hooks/useGetUserData";

export function MapProfile({ request, setKeyLocationPins, setZoom, setCenter, setMapProfileCard }) {

    //determines whether to render single or group map card

    //store the coordinates of the map pin that was clicked on
    const [coordinates, setCoordinates] = useState('')

    useEffect(() => {
        setCoordinates({ lat: request.idealLocation[0], lng: request.idealLocation[1] })
    }, [request])



    //as well as set bunkmate info at the bottom of the card
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
        request.request === "As myself"
            ? <SingleMapCard
                BunkmateInfo={BunkmateInfo}
                request={request}
                setKeyLocationPins={setKeyLocationPins}
                coordinates={coordinates}
                setZoom={setZoom}
                setCenter={setCenter}
                setMapProfileCard={setMapProfileCard}
            />
            : <GroupMapCard
                BunkmateInfo={BunkmateInfo}
                request={request}
                setKeyLocationPins={setKeyLocationPins}
                coordinates={coordinates}
                setZoom={setZoom}
                setCenter={setCenter}
                setMapProfileCard={setMapProfileCard}
            />

    )
}


const Bunkmates = () => {


    const id = JSON.parse(localStorage.getItem("profile"))?.result?._id;
    //retrieve local storage data
    const { localStorageData } = useContext(chatClientContext)
    //sign in context for when the user tries to create a bunkmate request without an account
    const { setIsOpen, setMessage, setMode } = useContext(SignInContext)
    const { center, setCenter, mapProfileCard, setMapProfileCard, rerender, setRerender } = useContext(BunkmatesContext)
    //display, nodisplay of the create request page
    const [showRequest, setShowRequest] = useState(false);
    const [selected, setSelected] = useState(null);
    //if the user has a profile then set profileChecker to true else false
    //used to rerender useEffect in Bunkmates.js containing async functions that gets data from backend
    const [displaySocial, setDisplaySocial] = useState(false)
    const { loading, listingArray, userRequests, userProfile, userOwnData, isLoaded } = useGetUserData()
    //store the key locations 
    const [keyLocationPins, setKeyLocationPins] = useState('');
    //state management for the zoom level of the map
    const [zoom, setZoom] = useState(15)


    //THIS LOGIC ONLY WORKS FOR NOW PROBABLY CHANGE THE API ENDPOINT TO RETURN A BOOLEAN THAT IS EITHER TRUE OR FALSE
    //contains the user's own data

    //dictionary that stores the userId as the key and the object as the value
    //contains all requests generated through accounts


    if (!isLoaded) {
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
            setShowRequest(!showRequest)
        }
    }


    const handleProfileClickAsync = (e) => {
        const request = userRequests.get(e?.currentTarget?.id)
        //MapProfile decides houses logic for deciding whether to show single or group map card
        setMapProfileCard(<MapProfile request={request} setKeyLocationPins={setKeyLocationPins} setCenter={setCenter} setZoom={setZoom} setMapProfileCard={setMapProfileCard} />)
        //store the coordinates of the pin that was clicked on
    }



    function BunkmateRequestPage() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', top: '35vh', position: 'absolute', maxWidth: '500px' }}>
                <Card variant="outlined" className="create-request-container" sx={{ padding: '20px', borderRadius: '10px', opacity: 0.9 }}>
                    <CreateRequestForm userRequest={userOwnData} onClick={handleRequestClick} />
                </Card>
            </div >)
    }

    function CreateRequestButton() {
        return (
            <div style={{ display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute', }}>
                <ActionButton onClick={(e) => { handleRequestClick(); e.stopPropagation() }} bgColor={"black"} title={"Create Bunkmate Request"} opacity='0.85' />
            </div>
        )
    }



    function EditRequestButton() {
        //edit and delete functionality
        return (
            <div style={{ display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute', }}>
                {/* edit bunkmates request button */}
                <ActionButton onClick={(e) => { handleRequestClick(); setCenter({ lat: userOwnData.idealLocation[0], lng: userOwnData.idealLocation[1] }); e.stopPropagation() }} bgColor={"black"} title={"Edit Bunkmate Request"} opacity='0.85' />
                <Tooltip arrow title={"Delete Request"}>
                    {/* X buton to delete profiles */}
                    <div>
                        <ActionButton onClick={(e) => { deleteRequest().then(() => { userRequests.delete(id); setRerender(!rerender); e.stopPropagation() }); }} bgColor={"black"} title={"X"} opacity='0.85' />
                    </div>
                </Tooltip>
            </div>
        )
    }

    function LoadingUi() {
        return (
            <div style={{ display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute' }}>
                <ActionButton opacity={0.85} bgColor="black" height='55px' title={<CircularProgress size={35} />} paddingTop="12px" />
            </div>
        )
    }

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
        setZoom(newZoomLevel);
    }, 500);



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
                        id="map"
                        center={center}
                        zoom={zoom}
                        onZoomChanged={(newZoomLevel) => handleZoomChange(newZoomLevel)}
                        mapContainerStyle={{ width: "100%", height: "100vh" }}
                        options={{
                            styles: mapStyles,
                            streetViewControl: false, mapTypeControl: false,
                        }}
                        onClick={() => { setMapProfileCard(null) }}
                    >
                        <div id="results" />
                        <Navbar chooseStyle={"glass"} />
                        <section className="bunkamtes__social-feed" style={{ borderRadius: '50%', backgroundColor: 'black', position: 'absolute', top: '305px', height: '40px', width: '40px', right: '10px', }}>
                            {
                                displaySocial ?
                                    <Tooltip arrow title="Close Socials Page">
                                        <IconButton onClick={(e) => { setDisplaySocial(false); e.stopPropagation(); }}>
                                            <TbSocialOff style={{ color: 'white', }} />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip arrow title="Show Socials Page">
                                        <IconButton onClick={(e) => { setDisplaySocial(true); e.stopPropagation() }}>
                                            <TbSocial style={{ color: 'white', }} />
                                        </IconButton>
                                    </Tooltip>

                            }
                        </section>
                        {keyLocationPins ? keyLocationPins.map((location) => {
                            console.log(location)
                            return (
                                <>
                                    <OverlayViewF
                                        key={location.place_id}
                                        position={{ lat: location.geometry.location.lat(), lng: location.geometry.location.lng() }}
                                        styles={{ background: 'DarkGray', color: 'white' }}
                                        mapPaneName={OVERLAY_MOUSE_TARGET}>
                                        <MapEducationMarker />
                                    </OverlayViewF >
                                    {/*

                                    <MarkerF
                                        draggable={true}
                                        clickable={true}
                                        position={{
                                            lat: location.geometry.location.lat(),
                                            lng: location.geometry.location.lng()
                                        }}
                                    >
                                        {location.name}
                                    </MarkerF>
                                    */}

                                </>
                            )
                        }) : null}
                        {/*
                            <Marker
                                key={university.id}
                                lat={university.geometry.location.lat()}
                                lng={university.geometry.location.lng()}
                                text={university.name}
                            />
                        */}
                        {displaySocial ? <SocialFeed userOwnData={userOwnData} userProfile={userProfile} /> : null}
                        {mapProfileCard ? mapProfileCard : null}
                        {selected && <MarkerF position={center} icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"} />}
                        {listingArray.map((request, index) => {
                            return (
                                <OverlayViewF
                                    key={request?.user}
                                    position={{ lat: request?.idealLocation[0], lng: request?.idealLocation[1] }}
                                    styles={{ background: 'DarkGray', color: 'white' }}
                                    mapPaneName={OVERLAY_MOUSE_TARGET}>
                                    {<MapRequestMarker
                                        request={request}
                                        handleClick={handleProfileClickAsync}
                                        index={index}
                                        icon={
                                            <RxTriangleDown
                                                style={{ right: '15px', color: '#2ACDDD', position: 'absolute', top: '35px', fontSize: '30px' }}
                                            />} />}
                                </OverlayViewF >
                            )
                        })}

                    </GoogleMap >
                </div>
                {
                    //if the user has clicked on a map card then these buttons won't be shown show that it doesn't clutter the screen
                    mapProfileCard
                        ? null
                        //if the user has clicked on the button show the request page else show the button
                        : <>{showRequest
                            ? <BunkmateRequestPage />
                            : loading
                                ? <LoadingUi />
                                : userOwnData
                                    //if the user has an active request then show the edit request button else show the create request button
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
const Marker = ({ text }) => <div>{text}</div>;
*/

{/*
                    return 
                    <MarkerF draggable={true} clickable={true} 
                    options={{
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
                */}
