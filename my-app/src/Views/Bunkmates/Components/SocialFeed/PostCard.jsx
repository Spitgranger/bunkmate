import CommentSection from "./CommentSection";
import { useState } from 'react'
import {
    Card,
    Typography,
    CardMedia,
    CardContent,
    IconButton,
    Tooltip,
    Divider,
    Avatar,
} from "@mui/material/"
import { AiFillLike } from "react-icons/ai";
import { BsPinFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdComment, MdCommentsDisabled } from 'react-icons/md'


export default function PostCard({ post, userOwnData, userProfile }) {

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
                    <CommentSection
                        post={post}
                        user={user}
                        userOwnData={userOwnData}
                        userProfile={userProfile}
                        allComments={allComments}
                        setAllComments={setAllComments}
                    />
                </div>
                : null
            }
        </Card >
    )
}
