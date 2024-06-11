import { createSlice } from "@reduxjs/toolkit";
import { ChatTypesPopulated } from "../../constants/sampleData";


export interface initialSelectedChatReducerTypes{
    chat:ChatTypesPopulated|null;
    isLoading:boolean;
    isFailed:boolean;
}
const initialSelectedChatReducer:initialSelectedChatReducerTypes = {
    chat:null,
    isLoading:true,
    isFailed:false
};

const selectedChatReducer = createSlice({
    name:"selectedChatReducer",
    initialState:initialSelectedChatReducer,
    reducers:{
        chatSelected:(state, action) => {
            state.chat = action.payload;
            state.isLoading = false;
            state.isFailed = false;
        },
        chatNotSelected:(state) => {
            state.chat = null;
            state.isLoading = false;
            state.isFailed = true;
        },
    }
});

export default selectedChatReducer;
export const {chatSelected, chatNotSelected} = selectedChatReducer.actions;