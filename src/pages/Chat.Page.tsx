import "../styles/pages/chat.scss";
import AppLayout from "../components/layout/AppLayout.Component";
import { CgAttachment } from "react-icons/cg";
import { BiSend } from "react-icons/bi";
import FileMenu from "../components/dialog/FileMenu.Dialog";
import { useState } from "react";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent.Component";


const user:{_id:string; name:string;} = {_id:"1", name:"Gourav"}

const Chat = () => {
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState<boolean>(false);
  

    return (
      <div className="chat_cont">
        <div className="message_cont_outer">
          <div className="message_cont_inner">
              {
                sampleMessage.map((i, index) => (
                  <MessageComponent key={index} message={i} user={user} />
                ))
              }
          </div>
        </div>
        <div className="input_cont">
          <div className="CgAttachment_cont" onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}>
            <FileMenu isAttachmentMenuOpen={isAttachmentMenuOpen} />
            <CgAttachment className="CgAttachment" />
          </div>
          <input type="text" className="message_inp" placeholder="Type message here...." />
          <div className="BiSend_cont">
            <BiSend className="BiSend" />
          </div>
        </div>
      </div>
    )
}
  
export default AppLayout()(Chat);
  