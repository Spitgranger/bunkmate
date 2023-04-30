import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
    name: 'requestForm',
    initialState: {
        requestForm: false
    },
    reducers: {
        //state management for displaying request component
        showRequestForm: (state, action) => {
            state.requestForm = action.payload
        },
    }
})

export const { showRequestForm } = requestSlice.actions
export default requestSlice.reducer