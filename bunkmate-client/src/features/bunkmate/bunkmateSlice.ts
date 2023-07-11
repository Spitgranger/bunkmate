import {createSlice} from "@reduxjs/toolkit";

//Some non-serializable values are stored in the redux store e.g. mapProfileCard, should fix this to avoid errors in the future.
//initial state for the bunkmate reducer, stores the mapProfileCard, current google map center, rerender, click,
interface BunkmateMapState {
    mapProfileCard: null | any
    center: { lat: number, lng: number }
    rerender: boolean
    zoom: number
}

const initialState: BunkmateMapState = {
    mapProfileCard: null,
    center: {lat: 43.642075, lng: -79.385981},
    rerender: false,
    zoom: 15,
}

/** @description reducer for bunkmate page*/
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
        //action to update zoom, payload is a number representing the new zoom level
        setZoom: (state, action) => {
            state.zoom = action.payload;
        },
    },
})
export const {
    setMapProfileCard,
    setCenter,
    setRerender,
    setZoom
} = bunkmateSlice.actions
export default bunkmateSlice.reducer