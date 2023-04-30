import { combineReducers } from '@reduxjs/toolkit'
import socialReducer from './SocialFeed.jsx/SocialReducer'
import requestReducer from './RequestForm/RequestReducer';

const BunkmatesReducer = combineReducers({
    socialFeed: socialReducer,
    requestForm: requestReducer,
});

export default BunkmatesReducer