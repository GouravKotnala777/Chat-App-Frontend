import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoginedUserTypes {
    _id:string;
    name:string;
    userName:string;
    bio:string;
    avatar:string;
}
export interface AuthReducerInitialState{
    user:LoginedUserTypes|null;
    isLoading:boolean;
    isAdmin:boolean;
    isFailed:boolean;
}
const initialState:AuthReducerInitialState = {
    user:null,
    isLoading:true,
    isAdmin:false,
    isFailed:false
}

const authReducer = createSlice({
    initialState,
    name:"authReducer",
    reducers:{
        userExists:(state, action:PayloadAction<LoginedUserTypes|null>) => {
            state.user = action.payload,
            state.isLoading = false,
            state.isAdmin = false,
            state.isFailed = false
        },
        userNotExists:(state) => {
            state.user = null,
            state.isLoading = false,
            state.isAdmin = false,
            state.isFailed = false
        }
    }
});

export default authReducer;
export const {userExists, userNotExists} = authReducer.actions;