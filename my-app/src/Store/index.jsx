import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../features/profile/profileSlice'

export default configureStore({
    reducer: {
        profile: profileReducer,
    }
})