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

export default function CommentSection({ post, user, allComments, setAllComments, userOwnData, userComment, setUserComment }) {


    const [commentSectionProfiles, setCommentSectionProfiles] = useState('')

    const { profileHandleRetrieval } = useContext(BuildUserContext)

    const handleGetProfiles = async () => {
        const arrayUserId = allComments.map((comment) => { return (comment[0]) })
        console.log(arrayUserId)
        const profiles = await profileHandleRetrieval(arrayUserId.join('.'))
        console.log(profiles)
        return profiles
    }

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
        setAllComments([...allComments, [user.result._id, userComment]])
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





