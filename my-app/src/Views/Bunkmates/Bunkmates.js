import react, { useContext, useEffect, useRef, useState, memo, useMemo, useId } from "react";
import Navbar from "../../Components/Navbar";
import { GoogleMap, useJsApiLoader, MarkerF, OverlayView, OVERLAY_MOUSE_TARGET, OverlayViewF, MapContext } from "@react-google-maps/api";
import mapStyles from '../../data/mapStyles.json'
import { Input, Button, Grid, Paper, TextField, Card, Typography, CardActionArea, CardMedia, CardContent, CardActions, IconButton, Tooltip, CircularProgress, Divider } from "@mui/material/"
import "./Styles/Bunkmates.css"
import PlacesAutocomplete from './Components/PlacesAutocomplete';
import mapCardData from "../../data/mapCardData"
import { deleteRequest, getPost, getProfile, makeComment, makePost } from '../../api'
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
import { IoReturnUpBack, IoSend } from "react-icons/io5";
import { BsPaperclip, BsPinFill, BsThreeDotsVertical } from "react-icons/bs";
import { TbSocial, TbSocialOff } from "react-icons/tb";
import { AiFillLike, AiFillEye } from 'react-icons/ai'
import { MdComment, MdCommentsDisabled } from 'react-icons/md'




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
            borderRadius: '10px', backgroundColor: 'black', position: 'absolute', top: '130px', zIndex: '6', width: '400px', left: '10px', display: 'flex', alignItems: 'flex-start',
        },
        Posts: {
            overflowY: 'scroll', borderRadius: '10px', flexDirection: 'column', position: 'absolute', height: '75vh', top: '210px', zIndex: '5', width: '400px', left: '10px'
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
    const [statePostArray, setStatePostArray] = useState([])

    useEffect(() => {
        getPost().then((result) => setStatePostArray(result.data.reverse()));
    }, [])

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
        //console.log('async', e?.currentTarget?.id)
        const request = userRequests.get(e?.currentTarget?.id)
        setMapProfileCard(<MapProfile request={request} />)
    }


    /*
    const instantiateChatClient = async () => {
        return GetClientInfo();
    }
    */


    function SocialFeed(props) {
        console.log("fuck")
        const id = useId()

        const postArray =
            [
                {
                    firstName: 'Christina',
                    avatar: "https://media.istockphoto.com/id/1311084168/photo/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter.jpg?b=1&s=170667a&w=0&k=20&c=XPuGhP9YyCWquTGT-tUFk6TwI-HZfOr1jNkehKQ17g0=",
                    location: 'New York City',
                    postMessage: 'Looking for roommates in chicago illinois. Budget is 2600 dollars if anyone is interested please message and we will talk',
                    postId: `post-id-${id}`,
                    dateCreated: "06-09-2022",
                    dateEdited: '',
                    userId: `user-id-${id}`,
                    likes: 2,
                    profile: "Christina's profile",
                    comments: [['642129a8955f2f754577b53c', "I'm in the area"]],
                },
                {
                    firstName: 'Jesse',
                    avatar: 'https://www.realholidays.co.uk/wp-content/uploads/2018/10/Matt-Website-Profile-2-300x300-c-default.jpg',
                    location: 'Chicago',
                    postMessage: 'Hey everyone, I need some roommates now please. Im actively searching so please message me if youre interested, this is the place I had in mind: ',
                    images: ["https://www.nobroker.in/blog/wp-content/uploads/2022/07/Modern-Bedroom-Design.jpg", "image2"],
                    postId: `post-id-${id}`,
                    userId: `user-id-${id}`,
                    dateCreated: "02-09-2023",
                    dateEdited: '02-10-2023',
                    profile: "Jesse's profile",
                    likes: 15,
                    comments: [['64208036e62251477f44fcad', "I love the idea"], ['64207d361f5cb6b3f8dbcf75', "I'm in the area"], ['64207d361f5cb6b3f8dbcf75', "Message me, money isn't an issue"]],
                },
                {
                    //obtained from querying user profile using userID
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSezGOpQSyxqLHMV2AHhvfpW0ajntgm42b0Ew&usqp=CAU',
                    //obtained from querying user profile using userID
                    firstName: 'Lauren',
                    //obtained from querying user profile using userID
                    profile: "Lauren's profile",
                    //obtained from request
                    location: 'Chicago',
                    //rest of data is obtained from the post
                    postMessage: 'Hey everyone, I need some roommates now please. Im actively searching so please message me if youre interested, this is the place I had in mind: ',
                    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Balcony_View.jpg/1200px-Balcony_View.jpg", "image2"],
                    postId: `post-id-${id}`,
                    userId: `user-id-${id}`,
                    dateCreated: "06-02-2022",
                    //this field is only filled if a post has been edited
                    dateEdited: '',
                    //modifiable field
                    likes: 324,
                    //modifiable field
                    //each item within the array stores the userId as a key, and the values are the comments
                    comments: [['64208a374215d240a8515fda', "The view is fantastic!!! I actually live nearby, message me if you're interested so we can meet up and grab some coffee!"], ['64208036e62251477f44fcad', "I love the idea"], ['64207d361f5cb6b3f8dbcf75', "I'm in the area"]],
                },
            ]


        //on the initial render of the socials component, get the social post from the backend



        const CommentSection = ({ post, user }) => {

            //all comments for a post stored in an array
            const [allComments, setAllComments] = useState(post.comments)
            //user's comments for a post
            const [userComment, setUserComment] = useState("")

            const [commentSectionProfiles, setCommentSectionProfiles] = useState('')

            const [render, setRender] = useState(false);

            const { profileHandleRetrieval } = useContext(BuildUserContext)

            const handleGetProfiles = async () => {
                const arrayUserId = allComments.map((comment) => { return (comment[0]) })
                console.log(arrayUserId)
                const profiles = await profileHandleRetrieval(arrayUserId.join('.'))
                console.log(profiles)
                return profiles
            }

            console.log(allComments)

            useEffect(() => {
                //store all the retrieved profiles in state
                handleGetProfiles().then((profiles) => setCommentSectionProfiles([...profiles.data]))
            }, [userComment, allComments])
            console.log(allComments)

            const mappedComments = () => {
                //when the user comments
                console.log(commentSectionProfiles)
                if (commentSectionProfiles) {
                    return (
                        allComments.map((comment) => {
                            console.log(commentSectionProfiles, comment[0])
                            const searchValue = comment[0];
                            const selectedItem = commentSectionProfiles.find(item => {
                                console.log(item.user, searchValue);
                                return item.user === searchValue
                            });
                            if (selectedItem) {
                                return (
                                    <div style={{ boxSizing: 'content-box', display: 'flex', alignItems: 'flex-start', height: '100%' }}>
                                        <CardMedia sx={{ display: 'flex', alignItems: 'flex-start', height: '100%', padding: '10px' }}>
                                            <CardActionArea>
                                                <Avatar sx={{ width: '35px', height: '35px', margin: '10px' }} src={selectedItem.picture} className="Avatar" alt={`${selectedItem.firstName}'s Profile picture`} />
                                            </CardActionArea>
                                        </CardMedia>
                                        <CardContent sx={{ paddingBottom: "15px !important", paddingTop: '15px !important', padding: '0px', display: 'flex', flexDirection: 'column', }}>
                                            <Typography variant="body1" color="text.primary" sx={{ color: 'white', width: '100%' }}> {selectedItem.firstName}</Typography >
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "15px", color: '#b3b3b3', width: '100%' }}>{comment[1]}</Typography >
                                        </CardContent>
                                    </div >
                                )
                            }
                        })
                    )
                } else if (!allComments) {
                    return ""
                }
                else {
                    return (
                        <div style={{ display: "flex", width: '100%', justifyContent: 'center' }}>
                            <CircularProgress size={35} />
                        </div>
                    )
                }
            }


            const handleUserComment = (e) => {
                //event handler for storing user's own comment
                setUserComment(e.target.value)
            }


            const handleCommentsChange = async () => {
                //event handler for replying to comments
                await makeComment({ message: userComment }, post._id);
                setRender(!render);
                //setAllComments([[user.result._id, userComment], ...allComments])
            }

            return (
                <>
                    <div style={{ padding: '20px 20px 10px 20px', width: '100%' }}>
                        <Divider light sx={{ backgroundColor: 'grey', width: '100%', }} />
                    </div>
                    <CardContent sx={{ padding: '0px 20px 0px 20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar sx={{ width: '35px', height: '35px', margin: '10px' }} src={userOwnData?.profile[0]?.picture} className="Avatar" alt={`${userOwnData?.profile[0]?.firstName}'s Profile picture`} />
                        {/* onChange event listener Causes entire component to rerender. Could cause problems later on */}
                        <TextField maxRows={2}
                            size="small"
                            variant="standard"
                            value={userComment}
                            onChange={handleUserComment}
                            fullWidth
                            multiline
                            InputProps={{
                                endAdornment:
                                    <IconButton onClick={handleCommentsChange} sx={{ width: '30px', height: '30px', color: 'white' }}>
                                        <IoSend style={{ cursor: 'pointer' }} size={15} position="end" />
                                    </IconButton>
                            }}
                            sx={{
                                "& .MuiInputBase-root": {
                                    color: 'white',
                                    backgroundColor: 'black',
                                },
                                margin: '0px',
                                padding: '0px'
                            }}
                            placeholder="Post a comment..." />
                    </CardContent>
                    <CardContent>
                        {mappedComments(post, allComments)}
                    </CardContent>
                    <button style={{ display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent: "center", padding: '10px', width: '100%', height: '30px', backgroundColor: 'black', border: '1px solid grey', borderRadius: '10px' }}>
                        <Typography variant="body1" color="text.secondary" sx={{ color: 'white' }}>View More Comments</Typography>
                    </button>
                </>
            )
        }

        const PostCard = ({ post, CommentSection, statePostArray, setStatePostArray }) => {

            const user = JSON.parse(localStorage.getItem('profile'))
            //store likes for a post
            const [likes, setLikes] = useState(post.likes)
            //controls like, unlike state
            const [liked, setLiked] = useState(true)
            //controls pinned, unpinned state
            const [pinned, setPinned] = useState(false)
            //controls show comments, hide comments state
            const [showComments, setShowComments] = useState(false)

            const handleLikeChange = () => {
                //event handler for when the user likes a post
                setLiked(!liked)
                if (liked) {
                    setLikes(post.likes + 1)
                } else if (!liked) {
                    setLikes(likes - 1)
                }
            }

            const handleShowComments = () => {
                //event handler for showing comments on click
                setShowComments(!showComments)
            }

            const handlePinChange = () => {
                //event hanlder for pinning a post
                setPinned(!pinned)
                //TODO logic to move pin to beginning of array
            }


            return (
                <Card style={{ marginTop: '10px', flexDirection: 'column', borderRadius: '10px', backgroundColor: 'black', zIndex: '5', width: '400px', right: '75px', display: 'flex', alignItems: 'flex-start', overflowY: 'hidden' }}>
                    <header style={{ display: 'flex', width: '100%', justifyContent: 'space-between', paddingRight: '20px' }}>
                        <div className="bunkmates__header__subsection" style={{ display: 'flex', alignItems: 'center', width: '100%', }}>
                            <Avatar sx={{ width: '50px', height: '50px', margin: '20px', }} src={post.profile[0].picture} className="Avatar" alt={`View ${post.profile[0].firstName}'s profile`} />
                            <div className="bunkmates__post-card__key-info">
                                <Typography sx={{ color: 'white' }} variant="body1" color="text.primary">{post.profile[0].firstName}</Typography>
                                {/* post.location should be an optional field*/}
                                {post?.request[0]?.address
                                    ?
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Tooltip arrow title={`View ${post.profile[0].firstName}'s active request`}>
                                            <Typography sx={{ color: '#9b9b9b' }} variant="body2" color="text.secondary">{post?.request[0]?.address}</Typography>
                                        </Tooltip>
                                    </div>
                                    : null}
                            </div>
                        </div>
                        {user?.result?._id === post.userId
                            ?
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Tooltip arrow title="View more actions">
                                    <IconButton style={{ color: 'white' }}><BsThreeDotsVertical style={{ color: 'white', fontSize: '20px' }} /></IconButton>
                                </Tooltip>
                            </div>
                            : null
                        }
                    </header>
                    <CardContent sx={{ padding: "0px 10px 10px 10px" }}>
                        <Typography sx={{ fontSize: "15px", padding: '0px 8px 0px 8px', color: 'white' }} variant="body2" color="text.primary">{post.message}</Typography>
                    </CardContent>
                    {/* Not working because the array is pushing an empty object to the end of the array*/}
                    {post.images ? <CardMedia component={"img"} image={post.images[0]} sx={{ padding: '15px', borderRadius: '20px' }} /> : null}
                    <div style={{ width: '100%', display: 'flex', padding: '0px 20px 10px 20px', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <IconButton style={{ color: 'white' }} onClick={handleLikeChange}><AiFillLike style={{ color: liked ? 'white' : 'aqua', fontSize: '20px' }} /></IconButton>
                                <Typography color="text.primary" variant="h6" sx={{ color: 'white', fontSize: "16px" }}>{likes}</Typography>
                            </div>
                            <div style={{ padding: '10px' }}>
                                <Divider orientation="vertical" sx={{ width: '100%', backgroundColor: 'grey', color: "white", height: '100%' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <IconButton style={{ color: "white" }} onClick={handleShowComments}>
                                    {showComments
                                        ? <MdCommentsDisabled style={{ color: 'white', fontSize: '20px' }} />
                                        : <MdComment style={{ color: 'white', fontSize: '20px' }} />}
                                </IconButton>
                                <Typography color="text.primary" variant="h6" sx={{ color: 'white', fontSize: '16px' }}>{post.comments.length}</Typography>
                            </div>
                        </div>
                        <IconButton style={{ color: 'white' }} onClick={handlePinChange}><BsPinFill style={{ color: pinned ? 'aqua' : 'white', fontSize: '20px' }} /></IconButton>
                    </div>
                    {/* TODO view more button increases the number comments extracted from array by 5, with default number of comments shown being 5*/}
                    {showComments

                        ? <div style={{ width: '100%' }}>
                            <CommentSection post={post} user={user} />
                        </div>
                        : null
                    }
                </Card >
            )
        }
        //console.log(userProfile)

        const CreatePost = ({ statePostArray, setStatePostArray }) => {

            const [fieldValues, setFieldvalues] = useState("");
            const [uploadedFiles, setUploadedFiles] = useState("");


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
                const user = JSON.parse(localStorage.getItem('profile'))

                const firstName = userProfile.data.firstName
                const avatar = userProfile.data.picture
                //if the user hasn't made a request then the address won't be shown
                const location = userOwnData?.address ?? "";
                //hardcoded for now
                const dateCreated = "06-09-2022"
                const postMessage = fieldValues
                //hardcoded for now
                const images = [uploadedFiles, ""]
                const postId = `post-id-${id}`
                const userId = user?.result?._id
                const profile = userOwnData.profile[0]

                //hardcoded for now
                const likes = 0
                //hardcoded for now
                const dateEdited = ""
                //hardcoded for now
                const comments = ""

                //hardcoded for now (images was removed)
                const newPost = { dateCreated, firstName, avatar, location, images, postMessage, postId, profile, userId, likes, dateEdited, comments }
                setStatePostArray([newPost, ...statePostArray])
            }
            const handleSavePost = async () => {
                const newPost = {
                    comments: [],
                    images: [uploadedFiles],
                    message: fieldValues,
                }
                await makePost(newPost);
            }

            return (
                <Card style={socialFeedStyles.FeedContainer}>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <div>
                            <Avatar sx={{ width: '50px', height: '50px', margin: '10px 20px 10px 20px' }} src={userOwnData?.profile[0]?.picture} className="Avatar" alt={`${userOwnData?.profile[0]?.firstName}'s Profile picture`} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <TextField maxRows={2}
                                multiline
                                variant="standard"
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
                            <ActionButton onClick={(e) => { handleSavePost(); e.stopPropagation() }} bgColor="black" hoverBgColor="rgb(67, 78, 91)" hoverColor="aqua" title="Post" borderRadius='7%' color="white" height='55px' />
                        </div>
                    </div>
                </Card >
            )
        }


        return (
            <>

                <CreatePost statePostArray={props.statePostArray} setStatePostArray={setStatePostArray} />
                <div style={socialFeedStyles.Posts}>
                    {statePostArray.map((post) => { return <PostCard post={post} CommentSection={CommentSection} /> })}
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
                        {displaySocial ? <SocialFeed statePostArray={statePostArray} /> : null}
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
                                    {<CustomMapMarker
                                        request={request}
                                        handleClick={handleProfileClickAsync}
                                        index={index}
                                        icon={
                                            <RxTriangleDown
                                                style={{ right: '15px', color: '#2ACDDD', position: 'absolute', top: '35px', fontSize: '30px' }}
                                            />} />}
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


//use logic later for infinite scrolling and paginating requests from backend
/* 
import React, { useState, useEffect } from 'react';
import Post from './Post';
import api from '../api';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    api.get(`/posts?page=${page}`).then(newPosts => {
      setPosts([...posts, ...newPosts]);
      setPage(page + 1);
    });
  }

  function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      fetchPosts();
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [posts]);

  return (
    <div>
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default PostList; 


*/



