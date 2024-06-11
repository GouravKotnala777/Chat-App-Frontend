import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import miscReducer from "./reducers/miscReducer";
import selectedChatReducer from "./reducers/selectedChatReducer";
import activityStateReducer from "./reducers/activityStateReducer";
import selectedMessagesReducer from "./reducers/selectedMessagesReducer";


export const store = configureStore({
    reducer:{
        [authReducer.name]:authReducer.reducer,
        [miscReducer.name]:miscReducer.reducer,
        [selectedChatReducer.name]:selectedChatReducer.reducer,
        [activityStateReducer.name]:activityStateReducer.reducer,
        [selectedMessagesReducer.name]:selectedMessagesReducer.reducer
        
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat()
})