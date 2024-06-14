

export interface ChatTypes {
    avatar:string[];
    name:string;
    _id:string;
    groupChat:boolean;
    members:string[];
}
export interface ChatTypesPopulated {
    avatar:string[];
    name:string;
    _id:string;
    groupChat:boolean;
    members:UserTypes[];
}
export interface UserTypes {
    avatar:{public_id:string; url:string;};
    name:string;
    userName:string;
    _id:string;
    bio:string;
    createdAt:Date;
}
export interface NotificationTypes {
    sender:{
        avatar:string[];
        name:string;
    },
    _id:string;
}
export interface MessageType {
    attachments:{
        public_id?:string;
        url?:string;
    }[];
    content?:string;
    _id:string;
    sender:{
        _id:string;
        name:string;
    };
    chatID:string;
    createdAt:string;
}


export const sampleChats:ChatTypes[] = [
    {
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"Gourav",
        _id:"1",
        groupChat:false,
        members:["1", "2"]
    },
    {
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"Naruto",
        _id:"2",
        groupChat:false,
        members:["1", "2"]
    },
    {
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"Sasuke",
        _id:"3",
        groupChat:false,
        members:["2", "3"]
    },
];
export const sampleUsers:UserTypes = {
    avatar:{
        public_id:"https://www.w3schools.com/howto/img_avatar.png",
        url:"https://www.w3schools.com/howto/img_avatar.png"
    },
    name:"Gourav",
    _id:"1",
    bio:"fsdfsdfsd",
    userName:"Gourav Kotnala",
    createdAt:new Date()
}
;
export const sampleNotifications:NotificationTypes[] = [
    {
        sender:{
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"Gourav",
        },
        _id:"1"
    },
    {
        sender:{
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"Naruto",
        },
        _id:"2"
    },
    {
        sender:{
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"Sasuke",
        },
        _id:"3"
    },
];
export const sampleMessage:MessageType[] = [
    {
        attachments:[],
        content:"Naruto ka message hai",
        _id:"1",
        sender:{
            _id:"2",
            name:"Naruto"
        },
        chatID:"asdasd",
        createdAt:"2024-05-10T10:41:30.630Z"
    },
    {
        attachments:[
            {
                public_id:"asadasd",
                url:"http://www.w3schools.com/howto/img_avatar.png"
            }
        ],
        content:"",
        _id:"2",
        sender:{
            _id:"1",
            name:"Gourav"
        },
        chatID:"asdasd",
        createdAt:"2024-05-10T10:41:30.630Z"
    },
];