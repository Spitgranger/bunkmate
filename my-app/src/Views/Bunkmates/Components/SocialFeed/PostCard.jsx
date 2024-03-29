import CommentSection from "./CommentSection";
import { useContext, useEffect, useState } from 'react'
import {
    Card,
    Typography,
    CardMedia,
    CardContent,
    IconButton,
    Tooltip,
    Divider,
    Avatar,
    CardActionArea,
} from "@mui/material/"
import { AiFillLike } from "react-icons/ai";
import { BsPinFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdComment, MdCommentsDisabled } from 'react-icons/md'
import { deletePost, likePost, getRequests } from "../../../../api";
import { BunkmatesContext } from "../../../../Components/GlobalStateManagement/BunkmatesContext";
import { MapProfile } from "../../Bunkmates";
import { CircularProgress } from "@mui/material/";
import HandleViewOtherProfile from "../Map/HandleViewOtherProfile";

export const PostCard = ({ post, userOwnData, userProfile, setStatePostArray, statePostArray }) => {

    console.log('postcard rerender')
    console.log(post)
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

    const [userOwnRequest, setUserOwnRequest] = useState("")
    const { setMapProfileCard, setKeyLocationPins, setCenter, setZoom } = useContext(BunkmatesContext)
    const [isRequestLoading, setIsRequestLoading] = useState(true);

    const postStyles = {
        postContainer: { marginTop: '10px', flexDirection: 'column', borderRadius: '10px', backgroundColor: 'black', zIndex: '5', width: '400px', right: '75px', display: 'flex', alignItems: 'flex-start', overflowY: 'hidden' },
        postHeader: { display: 'flex', width: '100%', justifyContent: 'space-between', paddingRight: '20px' },
        postHeaderSubSection: { display: 'flex', alignItems: 'center', width: '100%', },
        userInfo: { maxWidth: '255px', display: 'flex', flexDirection: 'row', alignItems: 'center' },
        socialFeedBack: { width: '100%', display: 'flex', padding: '0px 20px 10px 20px', justifyContent: 'space-between' },
        likesContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
        likesButton: { color: liked ? 'white' : 'aqua', fontSize: '20px' },
        divider: { width: '100%', backgroundColor: 'grey', color: "white", height: '100%' },
        commentsContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }
    }


    //query localStorage whenever mapProfileCard changes (primarily used to update the state of the "view request button")
    useEffect(() => {
        //get request data from backend
        async function handleRequest() {
            const request = await getRequests();
            return request
        }
        const userId = (post.userId)

        //store user request data
        handleRequest().then((request) => {
            const requestDict = {}
            request.data.map(
                (user) => {
                    requestDict[user.user] = user;
                });

            const userOwnId = requestDict[userId]
            setUserOwnRequest(userOwnId);
        }).finally(() => setIsRequestLoading(false));

    }, [])


    const handleLikeChange = async (id) => {
        //event handler for when the user likes a post
        await likePost(id);
        if (likes.findIndex((id) => String(id) === String(user.result?._id)) === -1) {
            setLikes((prev) => [...prev, user.result._id]);
        } else {
            setLikes((prev) => prev.filter((id) => String(id) !== String(user.result._id)));
        }
    }
    useEffect(() => {
        try {
            likes.findIndex((id) => String(id) === String(user.result?._id)) === -1 ? setLiked(true) : setLiked(false);
        } catch {
            console.log("PROP NOT FINISHED PASSING DOWN!")
        }
    }, [likes])

    //initialization of likes and comments count
    useEffect(() => {
        setLikes(post.likes)
        setAllComments(post.comments)
    }, [post])

    const handleShowComments = () => {
        setShowComments(!showComments)
    }

    const handlePinChange = () => {
        //event hanlder for pinning a post
        setPinned(!pinned)
        //TODO logic to move pin to beginning of array
    }

    //function to handle deletetion of post
    const handleDeletePost = async (id) => {
        await deletePost(id);
        setStatePostArray(statePostArray.filter((element) => element._id !== id))
    }

    //clickable link underneath the user's name that will show their active request
    const handleViewRequest = () => {
        if (userOwnRequest) {
            setMapProfileCard(
                <MapProfile
                    request={userOwnRequest}
                    setKeyLocationPins={setKeyLocationPins}
                    setCenter={setCenter}
                    setZoom={setZoom}
                    setMapProfileCard={setMapProfileCard}
                />)
        }
    }

    //only display a loading indicator for posts that actually have an active request
    const DisplayClickableLink = () => {
        if (post?.request[0]?.address && !isRequestLoading) {
            return (
                <div style={postStyles.userInfo}>
                    <Tooltip arrow title={`View ${post.profile[0].firstName}'s active request`}>
                        <Typography sx={{ color: '#9b9b9b', cursor: 'pointer' }} variant="body2" color="text.secondary" noWrap onClick={handleViewRequest}>{post.request[0].address}</Typography>
                    </Tooltip>
                </div>)
        } else if (!post?.request[0]?.address && !isRequestLoading) {
            return ("")
        } else if (post?.request[0]?.address && isRequestLoading) {
            return (<CircularProgress size={20} />)
        }

    }



    console.log(post)

    return (
        <Card style={postStyles.postContainer}>
            <header style={postStyles.postHeader}>
                <div className="bunkmates__header__subsection" style={postStyles.postHeaderSubSection}>
                    <HandleViewOtherProfile data={post} content={
                        <CardActionArea sx={{ color: 'black', width: '50px', height: '50px', margin: '20px', }}>
                            <Avatar sx={{ width: '50px', height: '50px' }} src={post.profile[0].picture} className="Avatar" alt={`View ${post.profile[0].firstName}'s profile`} />
                        </CardActionArea>} />
                    <div className="bunkmates__post-card__key-info">
                        <Typography sx={{ color: 'white' }} variant="body1" color="text.primary">{post.profile[0].firstName}</Typography>
                        {/* post.location should be an optional field*/}
                        <DisplayClickableLink />
                    </div>
                </div>
                {user?.result?._id === post.userId
                    ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Tooltip arrow title="View more actions">
                            <IconButton style={{ color: 'white' }}><BsThreeDotsVertical style={{ color: 'white', fontSize: '20px' }} onClick={() => { handleDeletePost(post._id) }} /></IconButton>
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
            <div style={postStyles.socialFeedBack}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={postStyles.likesContainer}>
                        <IconButton style={{ color: 'white' }} ><AiFillLike onClick={() => { handleLikeChange(post._id) }} style={postStyles.likesButton} /></IconButton>
                        <Typography color="text.primary" variant="h6" sx={{ color: 'white', fontSize: "16px" }}>{likes.length}</Typography>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <Divider orientation="vertical" sx={postStyles.divider} />
                    </div>
                    <div style={postStyles.commentsContainer}>
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
                    <CommentSection
                        post={post}
                        user={user}
                        userOwnData={userOwnData}
                        userProfile={userProfile}
                        allComments={allComments}
                        setAllComments={setAllComments}
                        setStatePostArray={setStatePostArray}
                        HandleViewOtherProfile={HandleViewOtherProfile}
                    />
                </div>
                : null
            }
        </Card >
    )
}

export default PostCard
