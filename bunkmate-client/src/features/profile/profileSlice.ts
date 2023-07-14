import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getProfile} from "../../api";


const initialState = {error: false}

export const fetchProfile = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getProfile();
    return response.data;
})
/**@description Redux slice and reducers that handle user profile state*/
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers(builder) {
        //case where the promise is fulfilled; profile is fetched with no issues
        builder.addCase(fetchProfile.fulfilled, (_, action) => {
            return action.payload
        })
            //case where promise is rejected, profile is not fetched successfully
            .addCase(fetchProfile.rejected, () => {
                return {error: true}
            })
    },
})

export default profileSlice.reducer