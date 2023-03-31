import react, { useContext, useEffect, useRef, useState, memo, useMemo, useId } from "react";
import Navbar from "../../Components/Navbar";
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OverlayViewF, MapContext } from "@react-google-maps/api";
import mapStyles from '../../data/mapStyles.json'
import { Input, Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent, CardActions, IconButton, Tooltip, CircularProgress, Divider } from "@mui/material/"
import "./Styles/Bunkmates.css"
import PlacesAutocomplete from './Components/PlacesAutocomplete';
import mapCardData from "../../data/mapCardData"
import { deleteRequest, getProfile } from '../../api'
import SocialFeed from "../../Components/SocialFeed";
import CreateRequestForm from './Components/CreateRequestForm'
import { ActionButton } from "../../Components/Utils/Form";
import { chatClientContext } from "../../Components/GlobalStateManagement/MessageContext";
import { SignInContext } from "../../Components/GlobalStateManagement/SignInContext";
import SingleMapCard from './Components/SingleMapCard'
import GroupMapCard from "./Components/GroupMapCard"
import { getRequests } from "../../api";
import { InfoWindow } from "@react-google-maps/api";
import { borderRadius } from "@mui/system";
import { BuildUserContext, BunkmatesContext } from "../../Components/GlobalStateManagement/UserContext";
import { RxTriangleDown } from "react-icons/rx"
import { useNavigate } from "react-router";
import CustomMapMarker from './Components/MapMarker'
import Avatar from "@mui/material/Avatar";
import { IoReturnUpBack } from "react-icons/io5";
import { BsPaperclip, BsPinFill } from "react-icons/bs";
import { TbSocial, TbSocialOff } from "react-icons/tb";
import { AiFillLike } from 'react-icons/ai'




const libraries = ["places"];


export function MapProfile({ request }) {

    //determines whether to render single or group map card
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
            ? <SingleMapCard BunkmateInfo={BunkmateInfo} request={request} />
            : <GroupMapCard BunkmateInfo={BunkmateInfo} request={request} />

    )
}


const Bunkmates = () => {

    const socialFeedStyles = {
        FeedContainer: {
            borderRadius: '10px', backgroundColor: 'black', position: 'absolute', top: '160px', zIndex: '6', width: '400px', right: 'left 60px', display: 'flex', alignItems: 'flex-start',
        },
        Posts: {
            overflowY: 'scroll', borderRadius: '10px', flexDirection: 'column', position: 'absolute', height: '75vh', top: '215px', zIndex: '5', width: '400px', left: '0px'
        }
    }
    const id = JSON.parse(localStorage.getItem("profile"))?.result?._id;
    const navigate = useNavigate()
    //store user profile data
    const [userProfile, setUserProfile] = useState("")
    //store user request data
    const [userRequests, setUserRequests] = useState(new Map());
    //retrieve local storage data
    const { GetClientInfo, localStorageData } = useContext(chatClientContext)
    //sign in context for when the user tries to create a bunkmate request without an account
    const { setIsOpen, setMessage, setMode } = useContext(SignInContext)
    //display, nodisplay of the create request page
    const [showRequest, setShowRequest] = useState(false);
    const [selected, setSelected] = useState(null);
    const { center, setCenter } = useContext(BunkmatesContext)
    const { mapProfileCard, setMapProfileCard } = useContext(BunkmatesContext)
    //if the user has a profile then set profileChecker to true else false
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })
    const [loading, setLoading] = useState(true)
    const { requestHandleSubmit, requestHandleUpdate, profileHandleSubmit } = useContext(BuildUserContext)
    const [listingArray, setListingArray] = useState([]);
    const [userOwnData, setUserOwnData] = useState("");
    //used to rerender useEffect in Bunkmates.js containing async functions that gets data from backend
    const { rerender, setRerender } = useContext(BunkmatesContext)
    const [displaySocial, setDisplaySocial] = useState(true)

    useEffect(() => {
        //get profile data from backend 
        async function handleProfile() {
            const profile = await getProfile();
            return profile
        }

        //store user profile data
        handleProfile().then((profile) => setUserProfile(profile));

        //get request data from backend
        async function handleRequest() {
            const request = await getRequests();
            //access all requests stored in an array using request.data
            return request
        }

        //store user request data
        handleRequest().then((request) => {
            const allRequests = []
            request.data.forEach(
                (user) => {
                    allRequests.push(user)
                    setUserRequests(new Map(userRequests.set(user.user, user)));
                });
            setListingArray(allRequests)
        }).finally(() => setLoading(false))

        setUserOwnData(userRequests.get(id));
    }, [rerender])

    console.log(userProfile)

    useEffect(() => {
        //add same dependencies as the above
        setUserOwnData(userRequests.get(id));

    }, [userRequests])

    useEffect(() => {
        //recenters screen on submitting create request form
        if (isLoaded && userOwnData) {
            setCenter({ lat: userOwnData.idealLocation[0], lng: userOwnData.idealLocation[1] })
        }
    }, [userOwnData])



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

    //hard coded requests
    const profiles = JSON.parse(localStorage.getItem('mapCardData')) || mapCardData;




    const handleProfileClickAsync = (e) => {
        console.log('async', e?.currentTarget?.id)
        const request = userRequests.get(e?.currentTarget?.id)
        setMapProfileCard(<MapProfile request={request} />)
    }


    /*
    const instantiateChatClient = async () => {
        return GetClientInfo();
    }
    */


    function SocialFeed() {
        const id = useId()
        //used to store values of posts

        const postArray =
            [
                {
                    firstName: 'Christina',
                    avatar: "https://media.istockphoto.com/id/1311084168/photo/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter.jpg?b=1&s=170667a&w=0&k=20&c=XPuGhP9YyCWquTGT-tUFk6TwI-HZfOr1jNkehKQ17g0=",
                    location: 'New York City',
                    postMessage: 'Looking for roommates in chicago illinois. Budget is 2600 dollars if anyone is interested please message and we will talk',
                    images: ["https://www.nobroker.in/blog/wp-content/uploads/2022/07/Modern-Bedroom-Design.jpg", "image2"],
                    postId: `post-id-${id}`,
                    userId: `user-id-${id}`,
                    likes: 3,
                    comments: { 'UserId245': "I love the idea", 'UserId244': "I'm in the area" },
                },
                {
                    firstName: 'Jesse',
                    avatar: 'https://www.realholidays.co.uk/wp-content/uploads/2018/10/Matt-Website-Profile-2-300x300-c-default.jpg',
                    location: 'Chicago',
                    postMessage: 'Hey everyone, I need some roommates now please. Im actively searching so please message me if youre interested, this is the place I had in mind: ',
                    images: ["https://www.nobroker.in/blog/wp-content/uploads/2022/07/Modern-Bedroom-Design.jpg", "image2"],
                    postId: `post-id-${id}`,
                    userId: `user-id-${id}`,
                    likes: 3,
                    comments: { 'UserId245': "I love the idea", 'UserId244': "I'm in the area" },
                },
                {
                    //modifiable field
                    firstName: 'Lauren',
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSezGOpQSyxqLHMV2AHhvfpW0ajntgm42b0Ew&usqp=CAU',
                    location: 'Chicago',
                    //modifiable field
                    postMessage: 'Hey everyone, I need some roommates now please. Im actively searching so please message me if youre interested, this is the place I had in mind: ',
                    //modifiable field
                    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Balcony_View.jpg/1200px-Balcony_View.jpg", "image2"],
                    postId: `post-id-${id}`,
                    userId: `user-id-${id}`,
                    //modifiable field
                    likes: 3,
                    //modifiable field
                    comments: { 'UserId245': "I love the idea", 'UserId244': "I'm in the area" },
                },
            ]

        const [statePostArray, setStatePostArray] = useState(postArray)
        //post / enter onclick onkeydown will gather the user's firstname, avatar, request (not sure yet), uploaded image 
        //append likes and comments to the userobject, plus postID

        const PostCard = ({ post }) => {
            return <Card style={{ marginTop: '10px', flexDirection: 'column', borderRadius: '10px', backgroundColor: 'black', zIndex: '5', width: '400px', right: '75px', display: 'flex', alignItems: 'flex-start', overflowY: 'hidden' }}>
                <header style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Avatar sx={{ width: '50px', height: '50px', margin: '20px', display: 'flex', justifyContent: 'flex-start' }} src={post.avatar} className="Avatar" alt={`View ${post.firstName}'s profile`} />
                    <div className="bunkmates__post-card__key-info">
                        <Typography style={{ color: 'white' }} variant="body1" color="text.primary">{post.firstName}</Typography>
                        {/* post.location should be an optional field*/}
                        {post.location
                            ? <Tooltip arrow title={`View ${post.firstName}'s active request`}>
                                <Typography style={{ color: 'grey' }} variant="body2" color="text.secondary">{post.location}</Typography>
                            </Tooltip>
                            : null}
                    </div>
                </header>
                <CardContent>
                    <Typography style={{ padding: '0px 8px 0px 8px', color: 'white' }} variant="body2" color="text.primary">{post.postMessage}</Typography>
                </CardContent>
                {/* Not working because the array is pushing an empty object to the end of the array*/}
                <CardMedia component={"img"} image={post?.images ? post?.images[0] : ""} sx={{ padding: '15px', borderRadius: '20px' }} />
                <div style={{ width: '100%', display: 'flex', padding: '0px 20px 0px 20px', justifyContent: 'space-around' }}>
                    <IconButton><AiFillLike style={{ color: 'white' }} /></IconButton>
                    <div style={{ padding: '10px' }}>
                        <Divider orientation="vertical" sx={{ width: '100%', backgroundColor: 'grey', color: "white", height: '100%' }} />
                    </div>
                    <TextField maxRows={2}
                        size="small"
                        multiline
                        /*
                        onChange={}
                        value={}
                        */
                        sx={{
                            "& .MuiInputBase-root": {
                                color: 'white',
                                backgroundColor: 'black',
                            },
                            margin: '0px',
                            padding: '0px'



                        }
                        } placeholder="Comment..." />
                    <div style={{ margin: '10px' }}>
                        <Divider orientation="vertical" sx={{ backgroundColor: 'grey', color: "white", height: '100%' }} />
                    </div>
                    <IconButton><BsPinFill style={{ color: 'white' }} /></IconButton>
                </div>



            </Card >
        }
        console.log(userProfile)

        const CreatePost = ({ statePostArray, setStatePostArray }) => {

            const [fieldValues, setFieldvalues] = useState("");
            const [uploadedFiles, setUploadedFiles] = useState("");
            const user = JSON.parse(localStorage.getItem('profile'))


            const handleFileUpload = (e) => {
                const file = e.target.files[0];
                handleConversion(file, (result) => {
                    setUploadedFiles(result);
                });
            }

            //converts image to base64-encoded string
            const handleConversion = (file, callback) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    callback(reader.result);
                };
                reader.onerror = function (error) {
                };
            }


            const handlePost = () => {
                console.log(userProfile)
                const firstName = userProfile.data.firstName
                const avatar = userProfile.data.picture
                const location = userOwnData?.address ?? "";
                const postMessage = fieldValues
                //hardcoded for now
                const images = [uploadedFiles, ""]
                const postId = `post-id-${id}`
                const profile = userOwnData.profile[0]
                const userId = user.result._id
                //hardcoded for now
                const likes = 3
                const comments = { 'UserId245': "I love the idea", 'UserId244': "I'm in the area" }

                //hardcoded for now (images was removed)
                const newPost = { firstName, avatar, location, location, images, postMessage, postId, profile, userId, likes, comments }
                setStatePostArray([newPost, ...statePostArray])
            }

            return (
                <Card style={socialFeedStyles.FeedContainer}>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <div>
                            <Avatar sx={{ width: '50px', height: '50px', margin: '10px 20px 10px 20px', display: 'flex', justifyContent: 'flex-start' }} src={userOwnData?.profile[0]?.picture} className="Avatar" alt={`${userOwnData?.profile[0]?.firstName}'s Profile picture`} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <TextField maxRows={2}
                                multiline
                                onChange={(e) => setFieldvalues(e.target.value)}
                                value={fieldValues}
                                InputProps={{
                                    endAdornment:
                                        <Tooltip arrow title={"Upload files here"}>
                                            <IconButton sx={{ width: '30px', height: '30px', color: 'white' }}>
                                                <label>
                                                    <input hidden style={{ display: 'none' }} multiple type="file" onChange={handleFileUpload} />
                                                    <BsPaperclip style={{ cursor: 'pointer' }} size={20} position="end" />
                                                </label>
                                            </IconButton>
                                        </Tooltip>
                                }}
                                sx={{
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                    "& .MuiInputBase-root": {
                                        color: 'white',
                                        backgroundColor: 'black',
                                    }
                                }
                                } placeholder="Talk with others..." />
                            <ActionButton onClick={(e) => { handlePost(); e.stopPropagation() }} bgColor="black" hoverBgColor="rgb(67, 78, 91)" hoverColor="aqua" title="Post" borderRadius='7%' color="white" height='55px' />
                        </div>
                    </div>
                </Card >
            )
        }


        return (
            <>

                <CreatePost statePostArray={statePostArray} setStatePostArray={setStatePostArray} />
                <div style={socialFeedStyles.Posts}>
                    {statePostArray.map((post) => { return <PostCard post={post} /> })}
                </div>

            </>
        )
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
                        options={{ styles: mapStyles, streetViewControl: false, mapTypeControl: false, }}
                        onClick={() => { setMapProfileCard(null) }}
                    >
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
                        {displaySocial ? <SocialFeed /> : null}
                        {/*
                        <div className="social-feed-container" style={socialFeedStyles.FeedContainer}>
                            <SocialFeed />
                        </div>
                        */}
                        {mapProfileCard ? mapProfileCard : null}
                        {selected && <MarkerF position={center} icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"} />}
                        {listingArray.map((request, index) => {
                            return (
                                <OverlayViewF
                                    key={request?.user}
                                    position={{ lat: request?.idealLocation[0], lng: request?.idealLocation[1] }}
                                    styles={{ background: 'DarkGray', color: 'white' }}
                                    mapPaneName={OVERLAY_MOUSE_TARGET}>
                                    {<CustomMapMarker request={request} handleClick={handleProfileClickAsync} index={index} icon={<RxTriangleDown style={{ right: '15px', color: '#2ACDDD', position: 'absolute', top: '35px', fontSize: '30px' }} />} />}
                                    {/*<button style={{ padding: "2px" }} onClick={e => { handleProfileClick(e, index); e.stopPropagation()}}>{`$${profile.rentBudget}`}</button>*/}
                                </OverlayViewF >)
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


{/*
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
                */}

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

