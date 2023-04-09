import { useState, useEffect, useContext } from 'react'
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
import { IoSend } from 'react-icons/io5'
import { BuildUserContext } from '../../../../Components/GlobalStateManagement/UserContext'
import { makeComment, getPost, deleteComment } from '../../../../api'
import { BsThreeDotsVertical } from "react-icons/bs";

export default function CommentSection({ user, userOwnData, userProfile, allComments, setAllComments, post }) {

    const commentSectionStyles = {
        replyButton: { width: '30px', height: '30px', color: 'white' },
        replyTextField: {
            "& .MuiInputBase-root": {
                color: 'white',
                backgroundColor: 'black',
            },
            margin: '0px',
            padding: '0px'
        },
        commentContainer: { boxSizing: 'content-box', display: 'flex', alignItems: 'flex-start', height: '100%', },
        avatarContainer: { display: 'flex', alignItems: 'flex-start', height: '100%', padding: '10px', margin: '10px' },
        loadingContainer: { display: "flex", width: '100%', justifyContent: 'center' },
        commentReplyInfoContainer: { paddingBottom: "15px !important", paddingTop: '15px !important', padding: '0px', display: 'flex', flexDirection: 'column', width: '280px', overflow: 'hidden' },
        firstRow: { color: 'white', width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        firstName: { flexDirection: 'row', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' },
        commentMessage: { fontSize: "15px", color: '#b3b3b3', width: '100%' },
        lastActive: { color: 'grey', fontSize: '12px', padding: '10px' }
    }

    //store all comments from a post
    const [commentSectionProfiles, setCommentSectionProfiles] = useState('')

    const { profileHandleRetrieval } = useContext(BuildUserContext)

    const handleGetProfiles = async () => {
        //this is not good, should remove duplicate profiles to speed up performance
        const arrayUserId = allComments.map((comment) => { return comment.userId })
        const profiles = await profileHandleRetrieval(arrayUserId.join('.'))
        return profiles
    }

    //store all the retrieved profiles in state
    useEffect(() => {
        handleGetProfiles().then((profiles) => setCommentSectionProfiles([...profiles.data]))
    }, [allComments])

    //to delete a user's comment
    const handleDeleteComment = async (id) => {
        await deleteComment(id);
        setAllComments(allComments.filter((comment) => comment._id !== id));
    }



    return (
        <>
            <div style={{ padding: '20px 20px 10px 20px', width: '100%' }}>
                <Divider light sx={{ backgroundColor: 'grey', width: '100%', }} />
            </div>
            <CardContent sx={{ padding: '0px 20px 0px 20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar sx={{ width: '35px', height: '35px', margin: '10px' }} src={userOwnData?.profile[0]?.picture ?? userProfile?.data?.picture} className="Avatar" alt={`${userOwnData?.profile[0]?.firstName}'s Profile picture`} />
                {/* onChange event listener Causes entire component to rerender. Could cause problems later on */}
                <ReplyCommentTextField commentSectionStyles={commentSectionStyles} allComments={allComments} setAllComments={setAllComments} user={user} post={post} />
            </CardContent>
            <CardContent>
                <MappedComments post={post} user={user} commentSectionStyles={commentSectionStyles} allComments={allComments} commentSectionProfiles={commentSectionProfiles} handleDeleteComment={handleDeleteComment} />
            </CardContent>

            {/* TODO Add functionality to view more button
            <button style={{ display: 'flex', marginTop: '10px', alignItems: 'center', justifyContent: "center", padding: '10px', width: '100%', height: '30px', backgroundColor: 'black', border: '1px solid grey', borderRadius: '10px' }}>
                <Typography variant="body1" color="text.secondary" sx={{ color: 'white' }}>View More Comments</Typography>
            </button>
            */}
        </>
    )
}

const ReplyCommentTextField = ({ allComments, setAllComments, user, commentSectionStyles, commentSectionProfiles, post }) => {

    //store the user's own comment
    const [userComment, setUserComment] = useState("")

    //event handler for storing user's own comment
    function handleUserComment(e) {
        setUserComment(e.target.value);
    }

    //event handler for submitting comments
    /*
    const handleCommentsChange = () => {
        setAllComments([[user.result._id, userComment], ...allComments])
    }
    */

    const handleCommentsChange = async () => {
        //event handler for replying to comments
        const response = await makeComment({ message: userComment }, post._id);
        console.log(response);
        setAllComments([{ _id: response.data._id, userId: user.result._id, message: userComment }, ...allComments]);

        //setAllComments([[user.result._id, userComment], ...allComments])
    }



    return (<TextField maxRows={2}
        size="small"
        variant="standard"
        value={userComment}
        onChange={handleUserComment}
        fullWidth
        multiline
        InputProps={{
            endAdornment:
                <IconButton onClick={handleCommentsChange} sx={commentSectionStyles.replyButton}>
                    <IoSend style={{ cursor: 'pointer' }} size={15} position="end" />
                </IconButton>
        }}
        sx={commentSectionStyles.replyTextField}
        placeholder="Post a comment..." />)

}

//All User comments in a post
const MappedComments = ({ allComments, commentSectionStyles, commentSectionProfiles, user, handleDeleteComment }) => {
    if (commentSectionProfiles && allComments.length !== 0) {
        return (
            allComments.map((comment) => {
                //console.log(commentSectionProfiles, comment[0])
                const searchValue = comment.userId;
                const selectedItem = commentSectionProfiles.find(item => {
                    //console.log(item.user, searchValue);
                    return item.user === searchValue
                });
                console.log(comment)
                if (selectedItem) {
                    //console.log(post, user)
                    return (
                        <div style={commentSectionStyles.commentContainer}>
                            <CardMedia sx={commentSectionStyles.avatarContainer}>
                                <CardActionArea>
                                    <Avatar sx={{}} src={selectedItem.picture} className="Avatar" alt={`${selectedItem.firstName}'s Profile picture`} />
                                </CardActionArea>
                            </CardMedia>
                            <CardContent sx={commentSectionStyles.commentReplyInfoContainer}>
                                <Typography variant="body1" color="text.primary" sx={commentSectionStyles.firstRow}>
                                    <div style={commentSectionStyles.firstName}>
                                        {selectedItem.firstName}
                                        <div style={commentSectionStyles.lastActive}>3h</div>
                                    </div>
                                    {user.result._id === comment.userId ? <IconButton sx={{ color: 'white' }} onClick={() => { handleDeleteComment(comment._id) }}><BsThreeDotsVertical style={{ color: 'white', fontSize: '17px' }} /></IconButton> : ""}
                                </Typography >
                                <div style={{ width: '250px', overflow: 'hidden' }}>
                                    <Typography variant="body2" color="text.secondary" sx={commentSectionStyles.commentMessage}>
                                        {comment.message}
                                    </Typography >
                                </div>
                            </CardContent>
                        </div >
                    )
                }
            })
        )
    } else if (allComments.length === 0) {
        return ""
    }
    else {
        return (
            <div style={commentSectionStyles.loadingContainer}>
                <CircularProgress size={35} />
            </div>
        )
    }
}