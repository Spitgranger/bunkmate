import { postArray } from "../../Data/PostArrayData"
import { useState, useEffect, useContext } from 'react'
import { BuildUserContext } from "../../../../Components/GlobalStateManagement/UserContext"
import { IoSend } from "react-icons/io5";
import { BsPaperclip, BsPinFill, BsThreeDotsVertical } from "react-icons/bs";
import { AiFillLike, AiFillEye } from 'react-icons/ai'
import { MdComment, MdCommentsDisabled } from 'react-icons/md'
import { ActionButton } from "../../../../Components/Utils/Form";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";


/*
---Hierarchical Structure---

socialFeed.jsx
    |
    -->CreatePost.jsx
    |
    -->PostCard.jsx
        |
        -->CommentSection.jsx
*/

export function SocialFeed({ userOwnData, userProfile }) {
    console.log('social feed rerender')
    const socialFeedStyles = {
        FeedContainer: {
            borderRadius: '10px', backgroundColor: 'black', position: 'absolute', top: '130px', zIndex: '6', width: '400px', left: '10px', display: 'flex', alignItems: 'flex-start',
        },
        Posts: {
            overflowY: 'scroll', borderRadius: '10px', flexDirection: 'column', position: 'absolute', height: '75vh', top: '210px', zIndex: '5', width: '400px', left: '10px'
        }
    }

    //all posts stored in an array
    const [statePostArray, setStatePostArray] = useState(postArray)


    return (
        <>

            <CreatePost
                statePostArray={statePostArray}
                setStatePostArray={setStatePostArray}
                userOwnData={userOwnData}
                userProfile={userProfile}
                socialFeedStyles={socialFeedStyles} />

            <div style={socialFeedStyles.Posts}>
                {statePostArray.map((post) => { return <PostCard post={post} userOwnData={userOwnData} userProfile={userProfile} /> })}
            </div>

        </>
    )
}
