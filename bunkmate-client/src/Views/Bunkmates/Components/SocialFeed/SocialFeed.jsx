import { memo } from 'react'
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
//memoized to prevent parent component from rerendering child component
export const SocialFeed = memo(({ userOwnData, userProfile, statePostArray, setStatePostArray }) => {
    console.log('social feed rerender')
    const Posts = {
        overflowY: 'scroll',
        borderRadius: '10px',
        flexDirection: 'column',
        position: 'absolute',
        height: '75vh',
        top: '210px',
        zIndex: '5',
        width: '405px',
        left: '10px',
    }

    //all posts stored in an array

    return (
        <>
            <CreatePost
                statePostArray={statePostArray}
                setStatePostArray={setStatePostArray}
                userOwnData={userOwnData}
                userProfile={userProfile}
            />

            <div style={Posts}>
                {statePostArray.map((post) => {
                    return (
                        <PostCard
                            post={post}
                            userOwnData={userOwnData}
                            userProfile={userProfile}
                            statePostArray={statePostArray}
                            setStatePostArray={setStatePostArray}
                        />
                    )
                })}
            </div>

        </>
    )
})
