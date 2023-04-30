import { configureStore } from "@reduxjs/toolkit";
import bunkmatesReducer from "../Reducers/Bunkmates";

export default configureStore({
    reducer: {
        bunkmates: bunkmatesReducer,
    }
})