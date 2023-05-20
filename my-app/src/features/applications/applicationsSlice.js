import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "../../api";

const initialState = {
    unitIndex: 0,
    bunkmateCount: 0,
    petCount: 0,
}

export const fetchProfile = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getProfile();
    return response.data;
})


const applicationsSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {
        //action to set the unit index, payload is the new index 
        setUnitIndex: (state, action) => {
            state.unitIndex = action.payload
        },

        //action to set the number of roommates, payload is the new number of roommates
        setBunkmateCount: (state, action) => {
            state.bunkmateCount = action.payload
        },
        //action to set the number of pets, payload is the new number of pets 
        setPetCount: (state, action) => {
            state.petCount = action.payload
        }

    },
    extraReducers(builder) {
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export const { setUnitIndex, setBunkmateCount, setPetCount } = applicationsSlice.actions
export default applicationsSlice.reducer