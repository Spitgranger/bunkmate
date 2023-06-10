import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../features/profile/profileSlice'
import bunkmateReducer from '../features/bunkmate/bunkmateSlice'
import listingReducer from '../features/listings/listingsSlice'
import applicationsReducer from '../features/applications/applicationsSlice'

export default configureStore({
    reducer: {
        profile: profileReducer,
        bunkmate: bunkmateReducer,
        listings: listingReducer,
        applications: applicationsReducer
    }
})