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
import { makeComment, getPost } from '../../../../api'

export default function CommentSection({ user, userOwnData, userProfile, allComments, setAllComments, post, setStatePostArray }) {

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
        commentContainer: { boxSizing: 'content-box', display: 'flex', alignItems: 'flex-start', height: '100%' },
        avatarContainer: { display: 'flex', alignItems: 'flex-start', height: '100%', padding: '10px' },
        loadingContainer: { display: "flex", width: '100%', justifyContent: 'center' },
        commentReplyInfoContainer: { paddingBottom: "15px !important", paddingTop: '15px !important', padding: '0px', display: 'flex', flexDirection: 'column' },
        firstName: { color: 'white', width: '100%' },
        commentMessage: { fontSize: "15px", color: '#b3b3b3', width: '100%' }
    }

    //store all comments from a post
    const [commentSectionProfiles, setCommentSectionProfiles] = useState('')

    const { profileHandleRetrieval } = useContext(BuildUserContext)

    const handleGetProfiles = async () => {
        const arrayUserId = allComments.map((comment) => { return (comment[0]) })
        const profiles = await profileHandleRetrieval(arrayUserId.join('.'))
        return profiles
    }

    //store all the retrieved profiles in state
    useEffect(() => {
        handleGetProfiles().then((profiles) => setCommentSectionProfiles([...profiles.data]))
    }, [allComments])



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
                <MappedComments commentSectionStyles={commentSectionStyles} allComments={allComments} commentSectionProfiles={commentSectionProfiles} />
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
        await makeComment({ message: userComment }, post._id);
        setAllComments([[user.result._id, userComment], ...allComments]);

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
const MappedComments = ({ allComments, commentSectionStyles, commentSectionProfiles }) => {
    if (commentSectionProfiles && allComments) {
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
                        <div style={commentSectionStyles.commentContainer}>
                            <CardMedia sx={commentSectionStyles.avatarContainer}>
                                <CardActionArea>
                                    <Avatar sx={{}} src={selectedItem.picture} className="Avatar" alt={`${selectedItem.firstName}'s Profile picture`} />
                                </CardActionArea>
                            </CardMedia>
                            <CardContent sx={commentSectionStyles.commentReplyInfoContainer}>
                                <Typography variant="body1" color="text.primary" sx={commentSectionStyles.firstName}> {selectedItem.firstName}</Typography >
                                <Typography variant="body2" color="text.secondary" sx={commentSectionStyles.commentMessage}>{comment[1]}</Typography >
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
            <div style={commentSectionStyles.loadingContainer}>
                <CircularProgress size={35} />
            </div>
        )
    }
}