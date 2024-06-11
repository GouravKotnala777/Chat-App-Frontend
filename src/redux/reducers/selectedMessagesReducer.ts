import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface InitialSelectedMessagesReducerStateType {
    selectedMessages:{
        [key:string]:{
            [type:string]:string;
        }
    }[];
    isLoading:boolean;
    isFailed:boolean;
}

const initialSelectedMessagesReducerState:InitialSelectedMessagesReducerStateType = {
    selectedMessages:[],
    isLoading:true,
    isFailed:false
};

const selectedMessagesReducer = createSlice({
    initialState:initialSelectedMessagesReducerState,
    name:"selectedMessagesReducer",
    reducers:{
        setSelectMessages:(state, action:PayloadAction<{[key:string]:{[type:string]:string}}>) => {
            state.selectedMessages.push(action.payload);
            state.isLoading = false;
            state.isFailed = false;
        },
        setUnSelectMessages:(state, action:PayloadAction<string>) => {
            const filterMessageResult = state.selectedMessages.filter((q) => Object.getOwnPropertyNames(q)[0] !== action.payload)
            state.selectedMessages = filterMessageResult;
            state.isLoading = false;
            state.isFailed = true;
        },
        setUnSelectAllMessages:(state) => {
            state.selectedMessages = [];
            state.isLoading = false;
            state.isFailed = true;
        }
    }

});

export default selectedMessagesReducer;
export const {setSelectMessages, setUnSelectMessages, setUnSelectAllMessages} = selectedMessagesReducer.actions;