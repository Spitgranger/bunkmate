import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../../api";

const initialState = {
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
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export default listingsSlice.reducer