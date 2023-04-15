import { useState, } from 'react'
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
import { BsPaperclip } from 'react-icons/bs';
import { ActionButton } from '../../../../Components/Utils/Form';
import { makePost } from '../../../../api';
//import { setServers } from 'dns';
import { getPost } from '../../../../api';




export default function CreatePost({ statePostArray, setStatePostArray, userOwnData, userProfile, HandleViewOtherProfile }) {

    const createPostStyles = {
        container: { borderRadius: '10px', backgroundColor: 'black', position: 'absolute', top: '130px', zIndex: '6', width: '400px', left: '10px', display: 'flex', alignItems: 'flex-start' },
        avatar: { width: '50px', height: '50px', margin: '10px 20px 10px 20px' },
        innerContainer: { width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'row' }

    }

    const [fieldValues, setFieldvalues] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState("");
    const user = JSON.parse(localStorage.getItem('profile'))
    const id = user?.result?.id


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

    const handlePost = ({ id, user, userProfile, uploadedFiles, userOwnData }) => {

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
        <Card style={createPostStyles.container}>
            <div style={createPostStyles.innerContainer}>
                <HandleViewOtherProfile request={userOwnData} content={
                    <CardActionArea sx={{ color: 'black' }}>
                        <Avatar sx={createPostStyles.avatar} src={userOwnData?.profile[0]?.picture ?? userProfile?.data?.picture} className="Avatar" alt={`${userOwnData?.profile[0]?.firstName}'s Profile picture`} />
                    </CardActionArea>
                } />
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
                                            <input hidden style={{ display: 'none' }} multiple type="file" onChange={handleFileUpload} accept={"image/png, image/gif, image/jpeg"} />
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
                    <ActionButton onClick={() => handleSavePost().then(() => getPost().then((posts) => { setStatePostArray(posts.data.reverse()) }))/*handlePost({ id, user, userProfile, uploadedFiles, userOwnData })*/} bgColor="black" hoverBgColor="rgb(67, 78, 91)" hoverColor="aqua" title="Post" borderRadius='7%' color="white" height='55px' />
                </div>
            </div>
        </Card >
    )
}