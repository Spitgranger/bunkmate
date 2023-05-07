import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequests } from "../../api";

//Some non serializable values are stored in the redux store eg. mapProfileCard, should fix this to avoid errors in the future.
const initialState = {
    mapProfileCard: null,
    center: { lat: 43.642075, lng: -79.385981 },
    rerender: false,
    click: false,
    zoom: 15,
    keyLocationPins: '',
}

export const fetchProfile = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getRequests();
    console.log(response)
    return response.data;
})
/*
*@details reducer for bunkmate page
*@param none 
*@return none
*/
const bunkmateSlice = createSlice({
    name: "bunkmate",
    initialState,
    reducers: {
        //action to set the map profile card, payload is the new profile card component
        setMapProfileCard: (state, action) => {
            state.mapProfileCard = action.payload;
        },
        //action to set the map profile card, payload is an object containing the lat and lng of the new center
        setCenter: (state, action) => {
            state.center = action.payload;
        },
        //action to set rerender, toggles rerender boolean
        setRerender: (state) => {
            state.rerender = !state.rerender;
        },
        //action to set click, toggles click boolean
        setClick: (state) => {
            state.click = !state.click;
        },
        //action to update zoom, payload is a number representing the new zoom level
        setZoom: (state, action) => {
            state.zoom = action.payload;
        },
        setKeyLocationPins: (state, action) => {
            state.keyLocationPins = action.payload;
        }

    },
    extraReducers(builder) {
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            return action.payload
        })
    },
})
export const { setMapProfileCard, setCenter, setRerender, setClick, setZoom, setKeyLocationPins } = bunkmateSlice.actions
export default bunkmateSlice.reducer