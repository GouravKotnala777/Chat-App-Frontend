import { MouseEvent, useEffect, useState } from "react";
import "../../styles/specific/chat-list.component.scss";
import ChatItem from "../shared/ChatItem.Component";
import { ChatTypes } from "../../constants/sampleData";
import { server } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { chatNotSelected, chatSelected } from "../../redux/reducers/selectedChatReducer";
import { setIsForwardMessageActive } from "../../redux/reducers/miscReducer";
import { InitialSelectedMessagesReducerStateType } from "../../redux/reducers/selectedMessagesReducer";

interface ChatListPropTypes {
  purpose:string;
  width?:string;
  chatID:string|undefined;
  onlineUsers?:string[];
  newMessagesAlert?:{chatID:string; count:number;}[];
  handleDeleteChat?:({e, _id, groupChat}:{e:MouseEvent<HTMLAnchorElement>; _id:string; groupChat:boolean;}) => void;
}

const ChatList = ({purpose, width, chatID, onlineUsers=[], newMessagesAlert=[{chatID:"", count:0}], handleDeleteChat}:ChatListPropTypes) => {
  const {selectedMessages} = useSelector((state:{selectedMessagesReducer:InitialSelectedMessagesReducerStateType}) => state.selectedMessagesReducer);
  const dispatch = useDispatch();
  const [chats, setChats] = useState<ChatTypes[]>([]);
  const [selectedChatsForForward, setSelectedChatsForForward] = useState<string[]>([]);

  const getChatDetailes = async() => {
      try {
        const res = await fetch(`${server}/api/v1/chat/${chatID}`, {
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
        });
        const data = await res.json();
  
        console.log("------ ChatList.Component.tsx  getChatDetailes");
        console.log(data);
        dispatch(chatSelected(data.message));
        console.log("------ ChatList.Component.tsx  getChatDetailes");
        
      } catch (error) {
        console.log("------ ChatList.Component.tsx  getChatDetailes");
        console.log(error);
        dispatch(chatNotSelected());
        console.log("------ ChatList.Component.tsx  getChatDetailes");
      }
  };
  const getMyChats = async() => {
    try {
      const res = await fetch(`${server}/api/v1/chat/my/chats`, {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();

      console.log("------ AppLayout.Component.tsx  getMyChats");
      console.log(data);
      setChats(data.message);
      console.log("------ AppLayout.Component.tsx  getMyChats");
      
    } catch (error) {
      console.log("------ AppLayout.Component.tsx  getMyChats");
      console.log(error);
      console.log("------ AppLayout.Component.tsx  getMyChats");
    }
  };
  const closeHandler = (e:MouseEvent<HTMLDivElement|HTMLButtonElement>) => {  
    e.stopPropagation();
    dispatch(setIsForwardMessageActive(false))
  };
  const selectChatsForForwardHandler = (e:MouseEvent<HTMLDivElement|HTMLButtonElement>, chatID:string) => {
    e.stopPropagation();
    setSelectedChatsForForward([...selectedChatsForForward, chatID]);
  };
  const forwardMessageHandler = async(e:MouseEvent<HTMLDivElement|HTMLButtonElement>) => {
    e.stopPropagation();    
    const arrayOfMessages = selectedMessages.flatMap((e) => (Object.values(e)));
    // const onlyContents = arrayOfMessages.map((q) => q?.content??(q.content));
    // const onlyAttachement = arrayOfMessages.map((q) => q?.attachement&&(q.attachement));

    const onlyContents:string[] = [];
    arrayOfMessages.forEach((q) => {
      if (q.content) {
        onlyContents.push(q.content);
      }
    });
    const onlyAttachements:string[] = [];
    arrayOfMessages.forEach((q) => {
      if (q.attachement) {
        onlyAttachements.push(q.attachement);
      }
    });

    try {
        const res = await fetch(`${server}/api/v1/message/new`, {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify({chatID:selectedChatsForForward, content:onlyContents, forwardedAttachement:onlyAttachements})
        });
        const data = await res.json();
  
        console.log("------ ChatPage.tsx  sendAttachmentHendler");
  
        console.log(data);
        
        // const memberArray = chat?.members.map((q:{_id:string; name:string;}) => (
        //   q._id
        // ));
        // socket?.emit("NEW_MESSAGE", {chatID, members:memberArray, messageInp});
  
        console.log("------ ChatPage.tsx  sendAttachmentHendler");
        // dispatch(setIsForwardMessageActive(false));
      } catch (error) {
        console.log("------ ChatPage.tsx  sendAttachmentHendler");
        console.log(error);
        console.log("------ ChatPage.tsx  sendAttachmentHendler");
      }
    
  };


  useEffect(() => {
    getMyChats()
  }, []);

    useEffect(() => {
      // if (purpose === "CHAT_SELECTION FORWARD_MESSAGE") {
      if (purpose === "CHAT_SELECTION") {
        if (chatID) {
            getChatDetailes();
        }
      }
    }, [chatID]);

    return(
        <div className="chatlist_cont" style={{width:width?width:"100%", background:purpose === "FORWARD_MESSAGE" ? "white" : "unset"}}>
          <div className="chatlist_con" style={{width:width?width:"100%"}}>
              {
                  chats?.map((data, index) => {
                      const {avatar, _id, name, groupChat, members}:{avatar:string[]; _id:string; name:string; groupChat:boolean; members:string[];} = data;
                      const newMessageAlert = newMessagesAlert.find(
                          ({chatID}) => chatID === _id
                      );
                      // const isOnline = members?.some((member) => onlineUsers.includes(_id));
                      const isOnline = members?.some((member) => onlineUsers.includes(member));
                      return(<ChatItem purpose={purpose} index={index} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} name={name} _id={_id} key={_id} groupChat={groupChat} sameSender={chatID === _id} handleDeleteChat={(e) => {handleDeleteChat&&handleDeleteChat({e:e.e, _id:e._id, groupChat:e.groupChat})}} selectChatsForForwardHandler={(e) => selectChatsForForwardHandler(e, _id)} />)
                  })
              }
              {
                purpose === "FORWARD_MESSAGE" ?
                  <div className="forward_btn_group">
                      <button onClick={(e) => closeHandler(e)}>Cancel</button>
                      <button className="ok_btn" onClick={(e)=>{forwardMessageHandler(e)}}>Forward</button>
                  </div>
                  :
                  <></>
              }
          </div>
        </div>
    )
};

export default ChatList;



// i am making a MERN web app:-
// i stuck in a problem. in my home page i have mounted a react component named UserComponent which fetches userData and foe some reasons i am mounting UserComponent in home page two times but i want that it fetches userData only one time