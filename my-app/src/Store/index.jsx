import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../features/profile/profileSlice'
import bunkmateReducer from '../features/bunkmate/bunkmateSlice'

export default configureStore({
    reducer: {
        profile: profileReducer,
        bunkmate: bunkmateReducer,
    }
})