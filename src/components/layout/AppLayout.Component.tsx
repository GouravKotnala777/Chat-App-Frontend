import "../../styles/layout/app-layout.component.scss";
import { ComponentType, MouseEvent, ReactElement } from "react";
import Header from "./Header.Component";
import Title from "../shared/Title.Component";
import ChatList from "../specific/ChatList.Component";
import { useParams } from "react-router-dom";
import ProfileCard from "../specific/ProfileCard.Component";
import { useDispatch, useSelector } from "react-redux";
import { MiscInitialStateTypes, setIsMobile } from "../../redux/reducers/miscReducer";
import { ActivityStateReducerInitialStateType, setIsnormalActive } from "../../redux/reducers/activityStateReducer";
import { setUnSelectAllMessages } from "../../redux/reducers/selectedMessagesReducer";
import { MdCancel } from "react-icons/md";


const AppLayout = () => <P extends object>(WrappedComponent:ComponentType<P>) => {


    return (props:P):ReactElement => {
        const {isMessageSelectionActive} = useSelector!((state:{activityStateReducer:ActivityStateReducerInitialStateType}) => state.activityStateReducer);
        const {chatID} = useParams!<{[key:string]:string;}>();
        const {
            // isNewGroup,
            // isAddMember,
            // isNotification,
            // isMobileMenuFriend,
            // isSearch,
            // isFileMenu,
            // isDeleteMenu,
            // uploadingLoader,
            // selectedDeleteChat,
            isMobile} = useSelector!((state:{miscReducer:MiscInitialStateTypes}) => state.miscReducer);
        const dispatch = useDispatch!();
        // const socket = getSocket();
        // console.log("%%%%%%%%%%%%%% AppLayout.tsx");
        // console.log(socket);
        // console.log("%%%%%%%%%%%%%% AppLayout.tsx");
        

        const handleDeleteChat = (e:MouseEvent<HTMLAnchorElement>, _id:string, groupChat:boolean,) => {
            e.preventDefault();
            console.log("Delete Chat", _id, groupChat);
        };
        const unselectMessageHandler = () => {
            dispatch(setIsnormalActive());
            dispatch(setUnSelectAllMessages());
            const message_cont_inner = document.getElementById("message_cont_inner");
            const children_divs = message_cont_inner?.querySelectorAll(".selected_message");
        
            children_divs?.forEach((q) => {
              q.classList.remove("selected_message");
            });
            console.log("LLLLLLLLll");
            
        };
        



        return(
            <div className="app_layout_cont" onClick={() => isMessageSelectionActive&&unselectMessageHandler()}>
                <Title title="Chat App" description="this is description" />
                <Header /> 
                <div className="three_sections_cont">
                    <div className="left_section">
                        {
                            !isMobile &&
                                <ChatList purpose="CHAT_SELECTION" chatID={chatID} newMessagesAlert={[{chatID:chatID as string, count:4}]} onlineUsers={["1", "2"]} handleDeleteChat={(e) => handleDeleteChat(e.e, e._id, e.groupChat)} width="100%" />
                        }
                    </div>
                    <div className="middle_section">
                        <WrappedComponent {...props} chatID={chatID} />
                    </div>
                    <div className="right_section"><ProfileCard /></div>
                </div>


                <div className="hamburger_overlay" style={{left:isMobile?"0%":"-97%"}}>
                    <div className="left_part">
                        {
                            isMobile &&
                                <ChatList purpose="CHAT_SELECTION" chatID={chatID} newMessagesAlert={[{chatID:chatID as string, count:4}]} onlineUsers={["1", "2"]} handleDeleteChat={(e) => handleDeleteChat(e.e, e._id, e.groupChat)} width="100%" />
                        }
                    </div>
                    <div className="right_part" style={{background:isMobile?"rgba(0,0,0,0.7)":""}} onClick={() => dispatch(setIsMobile(false))} >
                        <MdCancel className="cancel_icon" />
                    </div>
                </div>
                
                {/* <div>Footer</div> */}
            </div>
        );
    };
};

export default AppLayout;