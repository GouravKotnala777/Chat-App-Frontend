import { MouseEvent } from "react";
import "../../styles/specific/chat-list.component.scss";
import ChatItem from "../shared/ChatItem.Component";
import { ChatTypes } from "../../constants/sampleData";

interface ChatListPropTypes {
    width?:string;
    chats?:ChatTypes[];
    chatID:string|undefined;
    onlineUsers?:string[];
    newMessagesAlert?:{chatID:string; count:number;}[];
    handleDeleteChat:({e, _id, groupChat}:{e:MouseEvent<HTMLAnchorElement>; _id:string; groupChat:boolean;}) => void;
}

const ChatList = ({width, chats, chatID, onlineUsers=[], newMessagesAlert=[{chatID:"", count:0}], handleDeleteChat}:ChatListPropTypes) => {

    return(
        <div className="chatlist_cont" style={{width:width?width:"100%"}}>
        <div className="chatlist_con" style={{width:width?width:"100%"}}>
            {
                chats?.map((data, index) => {
                    const {avatar, _id, name, groupChat, members}:{avatar:string[]; _id:string; name:string; groupChat:boolean; members:string[];} = data;
                    const newMessageAlert = newMessagesAlert.find(
                        ({chatID}) => chatID === _id
                    );
                    const isOnline = members?.some((member) => onlineUsers.includes(_id));
                    // return(<div key={index}>{data}</div>)
                    return(<ChatItem index={index} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} name={name} _id={_id} key={_id} groupChat={groupChat} sameSender={chatID === _id} handleDeleteChat={(e) => handleDeleteChat({e:e.e, _id:e._id, groupChat:e.groupChat})} />)
                })
            }
        </div>
        </div>
    )
};

export default ChatList;