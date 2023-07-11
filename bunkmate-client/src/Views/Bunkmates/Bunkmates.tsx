import React, {EventHandler, SyntheticEvent, useContext, useState} from "react";
import {GoogleMap, OVERLAY_MOUSE_TARGET, OverlayViewF} from "@react-google-maps/api";
import {Card, Typography, Tooltip, CircularProgress} from "@mui/material/"
import "./Styles/Bunkmates.css"
import CreateRequestForm from './Components/RequestForm/CreateRequestForm'
import {ActionButton} from "../../Components/Utils/Form.tsx";
import SingleMapCard from "./Components/Map/SingleMapCard"
import GroupMapCard from "./Components/Map/GroupMapCard"
import {deleteRequest} from '../../api'
import {RxTriangleDown} from "react-icons/rx"
import {MapRequestMarker} from './Components/Map/MapMarkers'
import {useGetUserData} from './Hooks/useGetUserData'
import {SignInContext} from '../../Components/GlobalStateManagement/SignInContext'
import {setCenter, setMapProfileCard, setRerender} from "../../features/bunkmate/bunkmateSlice";
import {MapCardProps, ActionHandler, Request} from 'MapTypes'
import {RootState} from "../../store";
import mapStyles from '../../data/mapStyles.json'
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";

export function MapProfile({request, center}: MapCardProps) {

    //determines whether to render single or group map card
    return (
        /*
        <SingleMapCard profile={profile} BunkmateInfo={BunkmateInfo} />
        */
        request.request === "As myself"
            ? <SingleMapCard {...request}/>
            : <GroupMapCard
                {...request}
                {...center}
            />
    )
}


const Bunkmates: React.FC = (): React.ReactElement => {
    const [requestForm, setRequestForm] = useState(false);

    const RetrievedItem: string | null = localStorage.getItem("profile")

    const id = RetrievedItem ? JSON.parse(RetrievedItem).result._id : ""
    //TODO: retrieve local storage data, need to change this CODE as MessageContext is filled with lots of garbage + stream
    const localStorageData = false;
    //const {localStorageData} = useContext(chatClientContext)
    //sign in context for when the user tries to create a bunkmate request without an account
    const {setIsOpen, setMessage, setMode} = useContext(SignInContext)

    //select states from global redux store
    const dispatch = useAppDispatch();
    const mapProfileCard = useAppSelector((state: RootState) => state.bunkmate.mapProfileCard);
    const zoom = useAppSelector((state: RootState) => state.bunkmate.zoom);
    const center = useAppSelector((state: RootState) => state.bunkmate.center)

    //state places autocomplete
    /*
    const [selected, setSelected] = useState<boolean>(false);
    */
    //if the user has a profile then set profileChecker to true else false
    //used to rerender useEffect in Bunkmates.jsx containing async functions that gets data from backend

    const {isLoaded, loadError, loading, listingArray, userRequests, userProfile, userOwnData,} = useGetUserData()

    //THIS LOGIC ONLY WORKS FOR NOW PROBABLY CHANGE THE API ENDPOINT TO RETURN A BOOLEAN THAT IS EITHER TRUE OR FALSE
    //contains the user's own data

    //dictionary that stores the userId as the key and the object as the value
    //contains all requests generated through account


    if (!isLoaded || loadError) {
        return <h1>ERROR HAS OCCURRED</h1>
    }

    const handleRequestClick: ActionHandler = () => {

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


    const handleProfileClickAsync: EventHandler<SyntheticEvent> = (e) => {
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

    function BunkmateRequestPage(): React.ReactElement {
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

    function CreateRequestButton(): React.ReactElement {
        return (
            <div style={{display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute',}}>
                <ActionButton onClick={(e: SyntheticEvent): void => {
                    handleRequestClick();
                    e.stopPropagation()
                }} bgColor={"black"} title={"Create Bunkmate Request"} opacity='0.85'/>
            </div>
        )
    }

    function EditRequestButton(): React.ReactElement {
        //edit and delete functionality
        return (
            <div style={{display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute',}}>
                {/* edit bunkmates request button */}
                <ActionButton onClick={(e: SyntheticEvent): void => {
                    handleRequestClick();
                    dispatch(setCenter({lat: userOwnData.idealLocation[0], lng: userOwnData.idealLocation[1]}))
                    e.stopPropagation()
                }} bgColor={"black"} title={"Edit Bunkmate Request"} opacity='0.85'/>
                <Tooltip arrow title={"Delete Request"}>
                    {/* X button to delete profiles */}
                    <div>
                        <ActionButton onClick={(e: SyntheticEvent): void => {
                            if (typeof id === "string") {
                                deleteRequest().then(() => {
                                    userRequests.delete(id)
                                    dispatch(setRerender());
                                    e.stopPropagation()
                                });
                            }
                        }} bgColor={"black"} title={"X"} opacity='0.85'/>
                    </div>
                </Tooltip>
            </div>
        )
    }

    function LoadingUi(): React.ReactElement {
        return (
            <div style={{display: 'flex', bottom: '10vh', justifyContent: 'center', position: 'absolute'}}>
                <ActionButton opacity={0.85} bgColor="black" height='55px' title={<CircularProgress size={35}/>}
                              paddingTop="12px"/>
            </div>
        )
    }

    /*
    //delay the zooming in and out of the map to allow time for tiles to render properly
    function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
        let timerId: ReturnType<typeof setTimeout>;
        return function (...args: Parameters<T>): void {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout((): void => {
                // @ts-ignore
                func.apply(this, args);
            }, delay);
        };
    }

    const handleZoomChange: (newZoomLevel: number) => void = debounce((newZoomLevel: number) => {
        dispatch(setZoom(newZoomLevel));
    }, 500);*/


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
                        mapContainerStyle={{width: "100%", height: "100vh"}}
                        options={{
                            styles: mapStyles,
                            streetViewControl: false, mapTypeControl: false,
                        }}
                        onClick={() => {
                            dispatch(setMapProfileCard(null))
                        }}>

                        {mapProfileCard ?? null}
                        {/*selected &&
                            <MarkerF position={center} icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}/>*/}
                        {listingArray.map((request: Request, index: number) => {
                            return (
                                <OverlayViewF
                                    key={request?.user}
                                    position={{lat: request?.idealLocation[0], lng: request?.idealLocation[1]}}
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

interface BunkmateInfoTypes {
    label: string
    value: string
}

export default Bunkmates;

/**
 * @constructor
 *
 * @brief the criteria for finding optimal roommate as specified by renter
 *
 * @param {BunkmateInfoTypes} props - The props object
 * @returns {JSX.Element} criteria and answer component
 *
 */
export function BunkmateInfo(props: BunkmateInfoTypes): React.ReactElement {
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
