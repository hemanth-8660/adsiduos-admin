import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import fileReducer from "./fileSlice.js"

const store = configureStore({
    reducer: {
        user: userReducer,
        files: fileReducer
    }
});

export default store;

