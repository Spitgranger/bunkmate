import { createSlice } from '@reduxjs/toolkit'

export const socialSlice = createSlice({
    name: 'socialFeed',
    initialState: {
        socialFeed: false,
    },
    reducers: {
        //state management for displaying social feed
        showSocialFeed: (state, action) => {
            state.socialFeed = action.payload
        },
    }
})

export const { showSocialFeed, } = socialSlice.actions;
export default socialSlice.reducer;