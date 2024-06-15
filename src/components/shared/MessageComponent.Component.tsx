import moment from "moment";
import "../../styles/shared/message-component.component.scss";
import { MouseEvent, memo } from "react";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { MessageForRealTimeTypes } from "../../pages/Chat.Page";
import { useDispatch, useSelector } from "react-redux";
import { ActivityStateReducerInitialStateType, setIsMessageSelectionActive, setIsnormalActive } from "../../redux/reducers/activityStateReducer";
import { setSelectMessages, setUnSelectMessages } from "../../redux/reducers/selectedMessagesReducer";



const MessageComponent = ({keya, message, user}:{keya:string; message:MessageForRealTimeTypes; user:{_id:string; name:string;};}) => {
    const {sender, content, attachements, createdAt} = message;
    const isSameSender = sender?._id === user?._id;
    const timeAgo = moment(createdAt).fromNow();
    const {isnormalActive, isMessageSelectionActive} = useSelector((state:{activityStateReducer:ActivityStateReducerInitialStateType}) => state.activityStateReducer);
    const dispatch = useDispatch();
    

    const selectMessageHandler = (e:MouseEvent<HTMLDivElement|MouseEvent>) => {
        e.stopPropagation();
        const messageComponentCont = document.getElementById(`message_component_cont${keya}`);
        const messageContent = messageComponentCont?.childNodes[messageComponentCont?.childNodes.length - 2].textContent;
        const numberOfSelectedMessages = messageComponentCont?.parentElement?.querySelectorAll(".selected_message").length as number;
        
        const contentOrAttachement = {type:messageContent?"content":"attachement", content:messageContent?messageContent:attachements[0].url};

        
        if (numberOfSelectedMessages <= 1) {
            if (messageComponentCont?.classList.contains("selected_message")) {
                messageComponentCont?.classList.remove("selected_message");
                dispatch(setIsnormalActive());
                dispatch(setUnSelectMessages(keya));
            }
            else{
                messageComponentCont?.classList.add("selected_message");
                dispatch(setSelectMessages({[keya]:{[contentOrAttachement.type]:contentOrAttachement.content as string}}));
                dispatch(setIsMessageSelectionActive());
            }
        }
        else{
            if (messageComponentCont?.classList.contains("selected_message")) {
                messageComponentCont?.classList.remove("selected_message");
                dispatch(setUnSelectMessages(keya));
            }
            else{
                messageComponentCont?.classList.add("selected_message");
                dispatch(setSelectMessages({[keya]:{[contentOrAttachement.type]:contentOrAttachement.content as string}}));
                dispatch(setIsMessageSelectionActive());
            }
        }
        
    };

    
    return(
        <>
            <div id={`message_component_cont${keya}`}
                className="message_component_cont"
                style={{margin:isSameSender?"8px 8px 8px auto":"8px",
                borderRadius:isSameSender?"8px 0px 8px 8px":"0px 8px 8px 8px"}}
                onClick={(e) => isMessageSelectionActive&&selectMessageHandler(e)}
                onDoubleClick={(e) => isnormalActive&&selectMessageHandler(e)}
                >
                {
                    !isSameSender &&
                    <div className="name">{sender.name}</div>
                }
                <div className="content">{content}</div>
                {
                    attachements?.length > 0 && 
                    attachements.map((attachement, index) => {
                        const url = attachement.url;
                        const file = fileFormat(url);
                        
                        return(
                                <div className="attachement" key={index}>
                                    <a href={url} target="_blank" download style={{color:"black"}}>
                                        {RenderAttachment(file, url!)}
                                    </a>
                                </div>
                            )
                        })
                }
                <div className="time_stamp">{timeAgo}</div>
            </div>
        </>
    )
};

export default memo(MessageComponent);