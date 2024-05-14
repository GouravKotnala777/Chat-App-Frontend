import moment from "moment";
import "../../styles/shared/message-component.component.scss";
import { memo } from "react";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { MessageType } from "../../constants/sampleData";



const MessageComponent = ({message, user}:{message:MessageType; user:{_id:string; name:string;};}) => {
    const {sender, content, attachments=[], createdAt} = message;
    const isSameSender = sender?._id === user?._id;
    const timeAgo = moment(createdAt).fromNow();

    
    return(
        <div className="message_component_cont" style={{margin:isSameSender?"8px 8px 8px auto":"8px"}}>
            {
                !isSameSender &&
                    <div className="name">{sender.name}</div>
            }
            <div className="content">{content}</div>
            {
                attachments.length > 0 && 
                    attachments.map((attachment, index) => {
                        const url = attachment.url;
                        const file = fileFormat(url);

                        return(
                            <div key={index}>
                                <a href={url} target="_blank" download style={{color:"black"}}>
                                    {RenderAttachment(file, url)}
                                    {/* <RenderAttachment file={file} url={url} /> */}
                                </a>
                            </div>
                        )
                    })
            }
            <div className="time_stamp">{timeAgo}</div>
        </div>
    )
};

export default memo(MessageComponent);