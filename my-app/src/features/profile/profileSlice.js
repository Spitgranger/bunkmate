import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../../api";
const initialState = {}

export const fetchProfile = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getProfile();
    return response.data;
})

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export default profileSlice.reducer