import { postArray } from "../Data/PostArrayData"
import {
    TextField,
    Card,
    Typography,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Tooltip,
    CircularProgress,
    Divider,
    Avatar,
} from "@mui/material/"
import { useState, useEffect, useContext } from 'react'
import { BuildUserContext } from "../../../Components/GlobalStateManagement/UserContext"
import { IoSend } from "react-icons/io5";
import { BsPaperclip, BsPinFill, BsThreeDotsVertical } from "react-icons/bs";
import { AiFillLike, AiFillEye } from 'react-icons/ai'
import { MdComment, MdCommentsDisabled } from 'react-icons/md'
import { ActionButton } from "../../../Components/Utils/Form";

export function SocialFeed({ userOwnData, userProfile }) {

    const socialFeedStyles = {
        FeedContainer: {
            borderRadius: '10px', backgroundColor: 'black', position: 'absolute', top: '130px', zIndex: '6', width: '400px', left: '10px', display: 'flex', alignItems: 'flex-start',
        },
        Posts: {
            overflowY: 'scroll', borderRadius: '10px', flexDirection: 'column', position: 'absolute', height: '75vh', top: '210px', zIndex: '5', width: '400px', left: '10px'
        }
    }
    const id = JSON.parse(localStorage.getItem("profile"))?.result?._id;

    //all posts stored in an array
    const [statePostArray, setStatePostArray] = useState(postArray)

    const CommentSection = ({ post, user, allComments, setAllComments }) => {

        //user's comments for a post
        const [userComment, setUserComment] = useState("")

        const [commentSectionProfiles, setCommentSectionProfiles] = useState('')

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


        const handleCommentsChange = () => {
            //event handler for replying to comments
            setAllComments([[user.result._id, userComment], ...allComments])
        }

        console.log('rerendered')

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

        //all comments for a post stored in an array
        const [allComments, setAllComments] = useState(post.comments)
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
                        <Avatar sx={{ width: '50px', height: '50px', margin: '20px', }} src={post.avatar} className="Avatar" alt={`View ${post.firstName}'s profile`} />
                        <div className="bunkmates__post-card__key-info">
                            <Typography sx={{ color: 'white' }} variant="body1" color="text.primary">{post.firstName}</Typography>
                            {/* post.location should be an optional field*/}
                            {post.location
                                ?
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Tooltip arrow title={`View ${post.firstName}'s active request`}>
                                        <Typography sx={{ color: '#9b9b9b' }} variant="body2" color="text.secondary">{post.location}</Typography>
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
                    <Typography sx={{ fontSize: "15px", padding: '0px 8px 0px 8px', color: 'white' }} variant="body2" color="text.primary">{post.postMessage}</Typography>
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
                            <Typography color="text.primary" variant="h6" sx={{ color: 'white', fontSize: '16px' }}>{allComments.length}</Typography>
                        </div>
                    </div>
                    <IconButton style={{ color: 'white' }} onClick={handlePinChange}><BsPinFill style={{ color: pinned ? 'aqua' : 'white', fontSize: '20px' }} /></IconButton>
                </div>
                {/* TODO view more button increases the number comments extracted from array by 5, with default number of comments shown being 5*/}
                {showComments

                    ? <div style={{ width: '100%' }}>
                        <CommentSection post={post} user={user} allComments={allComments} setAllComments={setAllComments} />
                    </div>
                    : null
                }
            </Card >
        )
    }

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
                {statePostArray.map((post) => { return <PostCard post={post} CommentSection={CommentSection} /> })}
            </div>

        </>
    )
}
