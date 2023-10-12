import { configureStore } from "@reduxjs/toolkit";
import taskmanagerReducer from "./taskmanagerSlice";

const appStore = configureStore({
    reducer:{
        taskmanager:taskmanagerReducer
    }
})

export default appStore