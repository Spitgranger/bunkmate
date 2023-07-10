import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getProfile} from "../../api";

export const fetchProfile = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getProfile();
    return response.data;
})

interface ApplicationState {
    unitIndex: number
    bunkmateCount: number
    petCount: number
    continueDisabled: boolean
    bunkmateField: string[]
    globalErrorMessages: []
}

const initialState: ApplicationState = {
    unitIndex: 0,
    bunkmateCount: 0,
    petCount: 0,
    continueDisabled: true,
    bunkmateField: [''],
    globalErrorMessages: []
}


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
        },
        //action to set the error, payload is a boolean value
        setContinueDisabled: (state, action) => {
            state.continueDisabled = action.payload
        },
        //action to set the bunkmateField, payload is a string containing the person's name or email
        setBunkmateField: (state, action) => {
            state.bunkmateField = action.payload
        },
        //action to set the globalErrorMessages, payload is a string containing the error message
        setGlobalErrorMessages: (state, action) => {
            state.globalErrorMessages = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchProfile.fulfilled, (_, action) => {
            return action.payload
        })
    },
})

export const {
    setContinueDisabled,
    setUnitIndex,
    setBunkmateCount,
    setPetCount,
    setBunkmateField,
    setGlobalErrorMessages
} = applicationsSlice.actions
export default applicationsSlice.reducer