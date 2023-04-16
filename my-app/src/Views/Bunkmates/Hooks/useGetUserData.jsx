import { useState, useEffect, useContext } from 'react'
import { getRequests, getProfile } from "../../../api";
import { BunkmatesContext } from "../../../Components/GlobalStateManagement/BunkmatesContext";

export const useGetUserData = () => {

    const id = JSON.parse(localStorage.getItem("profile"))?.result?._id;
    const { rerender } = useContext(BunkmatesContext)
    const [listingArray, setListingArray] = useState([]);
    //Retrieve stored user's own profile data
    const [userProfile, setUserProfile] = useState("")
    //Retrieve stored user request data
    const [userRequests, setUserRequests] = useState(new Map());
    //Store user's own request
    const [userOwnData, setUserOwnData] = useState("");
    //manage loading indicator state
    const [loading, setLoading] = useState(true)
    const { setCenter, isLoaded, loadError } = useContext(BunkmatesContext)

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

    return { listingArray, userRequests, userProfile, userOwnData, loading, isLoaded, loadError }
}