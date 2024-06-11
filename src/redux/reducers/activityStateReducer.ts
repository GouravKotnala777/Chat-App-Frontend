import { createSlice } from "@reduxjs/toolkit";

export interface ActivityStateReducerInitialStateType {
    isnormalActive:boolean;
    isMessageSelectionActive:boolean;
}

const initialState:ActivityStateReducerInitialStateType = {
    isnormalActive:true,
    isMessageSelectionActive:false
}

const activityStateReducer = createSlice({
    initialState,
    name:"activityStateReducer",
    reducers:{
        setIsnormalActive:(state) => {
            state.isnormalActive = true;
            state.isMessageSelectionActive = false;
        },
        setIsMessageSelectionActive:(state) => {
            state.isnormalActive = false;
            state.isMessageSelectionActive = true;
        }
    }
});

export default activityStateReducer;
export const {setIsnormalActive, setIsMessageSelectionActive} = activityStateReducer.actions;