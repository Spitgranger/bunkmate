import {useState, useEffect, SetStateAction} from 'react'
import {getRequests, getProfile} from "../../../api";
import {Request} from 'MapTypes'
import {AxiosResponse} from "axios";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {RootState} from "../../../store";
import {useJsApiLoader} from "@react-google-maps/api";
import {setCenter} from "../../../features/bunkmate/bunkmateSlice.ts";

export const useGetUserData = () => {
    const RetrievedData: string | null = localStorage.getItem("profile")
    const id = RetrievedData ? JSON.parse(RetrievedData)?.result?._id : ""
    const [listingArray, setListingArray] = useState<Request[]>([]);
    //Retrieve stored user's own profile data
    const [userProfile, setUserProfile] = useState<string>("")
    //Retrieve stored user request data
    const [userRequests, setUserRequests] = useState(new Map());
    //Store user's own request
    const [userOwnData, setUserOwnData] = useState<Request>();
    //manage loading indicator state
    const [loading, setLoading] = useState(true)
    const rerender = useAppSelector((state: RootState) => state.bunkmate.rerender)
    const dispatch = useAppDispatch()

    const [libraries] = useState<("geometry" | "places" | "drawing" | "localContext" | "visualization")[]>(["places"]);
    const {isLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })

    useEffect(() => {
        //get profile data from backend
        async function handleProfile() {
            return await getProfile();

        }

        //store user profile data
        handleProfile().then((profile: SetStateAction<any>): void => setUserProfile(profile));

        //get request data from backend
        async function handleRequest() {
            //access all requests stored in an array using request.data
            return await getRequests();
        }

        //store user request data
        handleRequest()
            .then((request: AxiosResponse<any, any>): void => {
                console.log(request)
                const allRequests: Request[] = []
                request.data.forEach(
                    (userObject: Request): void => {
                        allRequests.push(userObject)
                        setUserRequests(new Map(userRequests.set(userObject.user, userObject)));
                    });
                setListingArray(allRequests)
            })
            .finally(() => setLoading(false))

    }, [rerender])


    useEffect(() => {
        //add same dependencies as the above
        if (id && userRequests) {
            setUserOwnData(userRequests.get(id));
        }
    }, [userRequests])


    useEffect(() => {
        //re-centers screen on submitting create request form
        if (isLoaded && userOwnData) {
            dispatch(setCenter({lat: userOwnData.idealLocation[0], lng: userOwnData.idealLocation[1]}))
        }
    }, [userOwnData])
    return {isLoaded, loadError, listingArray, userRequests, userProfile, userOwnData, loading}
}