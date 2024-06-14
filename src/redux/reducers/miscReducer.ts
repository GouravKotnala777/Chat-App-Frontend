import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface MiscInitialStateTypes {
    isNewGroup:boolean;
    isAddMember:boolean;
    isNotification:boolean;
    isSearch:boolean;
    isFileMenu:boolean;
    isDeleteMenu:boolean;
    uploadingLoader:boolean;
    selectedDeleteChat:{
        chatID:string;
        groupChat:boolean
    };
    isMobile:boolean;
    isProfileCard:boolean;
    isForwardMessageActive:boolean;
}

const miscInitialState:MiscInitialStateTypes = {
    isNewGroup:false,
    isAddMember:false,
    isNotification:false,
    isSearch:false,
    isFileMenu:false,
    isDeleteMenu:false,
    uploadingLoader:false,
    selectedDeleteChat:{
        chatID:"",
        groupChat:false
    },
    isMobile:false,
    isProfileCard:false,
    isForwardMessageActive:false
};

const miscReducer = createSlice({
    name:"miscReducer",
    initialState:miscInitialState,
    reducers:{
        setIsNewGroup:(state, action:PayloadAction<boolean>) => {
            state.isNewGroup = action.payload;
        },
        setIsAddMember:(state, action) => {
            state.isAddMember = action.payload;
            
        },
        setIsNotification:(state, action) => {
            state.isNotification = action.payload;
            
        },
        setIsMobile:(state, action) => {
            state.isMobile = action.payload;

        },
        setIsProfileCard:(state, action) => {
            state.isProfileCard = action.payload;

        },
        setIsSearch:(state, action) => {
            state.isSearch = action.payload;
            
        },
        setIsFileMenu:(state, action) => {
            state.isFileMenu = action.payload;
            
        },
        setIsDeleteMenu:(state, action) => {
            state.isDeleteMenu = action.payload;
            
        },
        setUploadingLoader:(state, action) => {
            state.uploadingLoader = action.payload;
            
        },
        setSelectedDeleteChat:(state, action) => {
            state.selectedDeleteChat = action.payload;

        },
        setIsForwardMessageActive:(state, action) => {
            state.isForwardMessageActive = action.payload;
        }
    }
});

export default miscReducer;
export const {setIsNewGroup,setIsAddMember,setIsMobile,setIsProfileCard,setIsNotification,setIsSearch,setIsFileMenu,setIsDeleteMenu,setUploadingLoader,setSelectedDeleteChat,setIsForwardMessageActive} = miscReducer.actions;