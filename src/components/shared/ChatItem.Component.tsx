import { Link } from "react-router-dom";
import "../../styles/shared/chat-item.component.scss";
import { MouseEvent, memo } from "react";
import AvatarCard from "./AvatarCard.Component";
// import { server } from "../../constants/config";

interface ChatItemPropTypes {
    purpose:string;
    avatar:string[];
    name?:string;
    _id:string;
    lastMessage?:string;
    groupChat:boolean;
    sameSender?:boolean;
    isOnline?:boolean;
    newMessageAlert?:{count:number; chatID:string;};
    index?:number;
    handleDeleteChat?:({e, _id, groupChat}:{e:MouseEvent<HTMLAnchorElement>; _id:string; groupChat:boolean;}) => void;
    selectChatsForForwardHandler?:(e:MouseEvent<HTMLDivElement|HTMLButtonElement>, chatID:string) => void;
}

const ChatItem = ({purpose, avatar, name, _id, groupChat, sameSender, isOnline, newMessageAlert, handleDeleteChat, selectChatsForForwardHandler}:ChatItemPropTypes) => {




    return(
        <div className="chatitem_cont">
            {/* {purpose} */}
            {
                purpose === "CHAT_SELECTION" ?
                    <Link to={`/chat/${_id}`} className="chatitem_link" onContextMenu={(e) => {handleDeleteChat&&handleDeleteChat({e, _id, groupChat})}}>
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
                    :
                    <>
                        <div className="chatitem_link" onClick={(e) => {selectChatsForForwardHandler&&selectChatsForForwardHandler(e, _id)}}>
                            <div className="chat_item">
                                <div className="img_cont">
                                    <AvatarCard avatar={avatar} />
                                </div>
                                <div className="chat_info">
                                    <div className="chat_name">{name}</div>
                                    {
                                        isOnline && (
                                            <div className="online_indication"></div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
};

export default memo(ChatItem);