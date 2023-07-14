import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getProfile} from "../../api";

interface ListingState {
    galleryIndex: number,
    viewGallery: boolean
}

const initialState: ListingState = {
    galleryIndex: 0,
    viewGallery: false
}

export const fetchProfile = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getProfile();
    return response.data;
})


const listingsSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProfile.fulfilled, (_, action) => {
            return action.payload
        })
    },
})

export default listingsSlice.reducer