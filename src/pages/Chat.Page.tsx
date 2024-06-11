import "../styles/pages/chat.scss";
import AppLayout from "../components/layout/AppLayout.Component";
import { CgAttachment } from "react-icons/cg";
import { BiSend } from "react-icons/bi";
import FileMenu from "../components/dialog/FileMenu.Dialog";
import { useEffect, useState } from "react";
import MessageComponent from "../components/shared/MessageComponent.Component";
import { server } from "../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { AuthReducerInitialState, LoginedUserTypes } from "../redux/reducers/authReducer";
import { useParams } from "react-router-dom";
import { getSocket } from "../socket";
import { initialSelectedChatReducerTypes } from "../redux/reducers/selectedChatReducer";
import { MiscInitialStateTypes, setIsFileMenu } from "../redux/reducers/miscReducer";
import ChatList from "../components/specific/ChatList.Component";


export interface MessageForRealTimeTypes{
  attachements:{
    public_id?:string;
    url?:string;
  }[];
  content:string;
  _id:string;
  sender:{
    _id?:string;
    name?:string;
  },
  chatID:string;
  createdAt:string;
}

const Chat = () => {
  const {isFileMenu, isForwardMessageActive} = useSelector((state:{miscReducer:MiscInitialStateTypes}) => state.miscReducer);
  const [messageInp, setMessageInp] = useState<string>("");
  const [messagesRT, setMessagesRT] = useState<MessageForRealTimeTypes[]>([]);
  const {user} = useSelector((state:{authReducer:AuthReducerInitialState}) => state.authReducer);
  const {chat} = useSelector((state:{selectedChatReducer:initialSelectedChatReducerTypes}) => state.selectedChatReducer);
  const {chatID} = useParams();
  const socket = getSocket();
  const dispatch = useDispatch();
  

  
  const sendAttachmentHendler = async() => {
    try {
      const res = await fetch(`${server}/api/v1/message/new`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({chatID, content:messageInp})
      });
      const data = await res.json();

      console.log("------ ChatPage.tsx  sendAttachmentHendler");

      console.log(data);
      const memberArray = chat?.members.map((q:{_id:string; name:string;}) => (
        q._id
      ));
      socket?.emit("NEW_MESSAGE", {chatID, members:memberArray, messageInp});

      console.log("------ ChatPage.tsx  sendAttachmentHendler");
    } catch (error) {
      console.log("------ ChatPage.tsx  sendAttachmentHendler");
      console.log(error);
      console.log("------ ChatPage.tsx  sendAttachmentHendler");
    }
  };
  const getMyMessages = async() => {
    try {
      const res = await fetch(`${server}/api/v1/message/${chatID}`, {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();

      console.log("------ ChatPage.tsx  getMyMessages");
      console.log(data);
      setMessagesRT(data.message);
      console.log("------ ChatPage.tsx  getMyMessages");
    } catch (error) {
      console.log("------ ChatPage.tsx  getMyMessages");
      console.log(error);
      console.log("------ ChatPage.tsx  getMyMessages");
      
    }
  };


  
  useEffect(() => {
    socket?.on("NEW_MESSAGE", ({chatID, message}:{chatID:string; message:MessageForRealTimeTypes}) => {
      console.log({chatID, message});
      
      
      // setMessagesRT((prev) => [...prev, message]);
      setMessagesRT([...messagesRT, message]);
      setMessageInp("");
    })
  }, []);


  useEffect(() => {
    getMyMessages();
  }, [chatID]);

  // const newMessagesHandler = useCallback((data:unknown) => {
  //   setMessagesRT((prev) => [...prev, data.message]);
  //   setMessageInp("");
  // }, []);

  // const eventHandler = {"NEW_MESSAGE":newMessagesHandler};
  // useSocketEvents(socket!, eventHandler);

  
    return (
      <div className="chat_cont">
        <div className="message_cont_outer">
          <div id="message_cont_inner" className="message_cont_inner">
              {
                messagesRT.map((i, index) => (
                  <MessageComponent key={index} keya={i._id} message={i} user={user as LoginedUserTypes} />
                ))
              }
          </div>
        </div>
        <div className="input_cont">
          <div className="CgAttachment_cont" onClick={() => dispatch(setIsFileMenu(!isFileMenu))}>
            <FileMenu isFileMenuOpen={isFileMenu} chatID={chatID as string} />
            <CgAttachment className="CgAttachment" />
          </div>
          <input type="text" className="message_inp" placeholder="Type message here...." value={messageInp} onChange={(e) => setMessageInp(e.target.value)} />
          <button className="BiSend_cont" onClick={sendAttachmentHendler}>
            <BiSend className="BiSend" />
          </button>
        </div>

        {
         isForwardMessageActive && 
            <ChatList purpose="FORWARD_MESSAGE" chatID={chatID} newMessagesAlert={[{chatID:chatID as string, count:4}]} onlineUsers={["1", "2"]} width="100%" />
        }
      </div>
    )
}
  
export default AppLayout()(Chat);
  