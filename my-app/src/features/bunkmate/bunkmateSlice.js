import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequests } from "../../api";
const initialState = {}

export const fetchProfile = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getRequests();
    console.log(response)
    return response.data;
})


const bunkmateSlice = createSlice({
    name: "bunkmate",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export default bunkmateSlice.reducer