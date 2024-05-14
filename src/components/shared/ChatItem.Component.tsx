import { Link } from "react-router-dom";
import "../../styles/shared/chat-item.component.scss";
import { MouseEvent, memo } from "react";
import AvatarCard from "./AvatarCard.Component";

interface ChatItemPropTypes {
    avatar:string[];
    name?:string;
    _id:string;
    lastMessage?:string;
    groupChat:boolean;
    sameSender?:boolean;
    isOnline?:boolean;
    newMessageAlert?:{count:number; chatID:string;};
    index?:number;
    handleDeleteChat:({e, _id, groupChat}:{e:MouseEvent<HTMLAnchorElement>; _id:string; groupChat:boolean;}) => void;
}

const ChatItem = ({avatar, name, _id, lastMessage, groupChat, sameSender, isOnline, newMessageAlert, index, handleDeleteChat}:ChatItemPropTypes) => {


    return(
        <div className="chatitem_cont">
            <Link to={`/chat/${_id}`} className="chatitem_link" onContextMenu={(e) => handleDeleteChat({e, _id, groupChat})}>
                <div className="chat_item" style={{background:sameSender?"black":"unset", color:sameSender?"white":"unset"}}>
                    <div className="img_cont">
                        <AvatarCard avatar={avatar} />
                    </div>
                    <div className="chat_info">
                        <div className="chat_name">{name}</div>
                        {
                            newMessageAlert && (
                                <div className="new_message">{newMessageAlert.count} New Message</div>
                            )
                        }
                        {
                            isOnline && (
                                <div className="online_indication"></div>
                            )
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default memo(ChatItem);