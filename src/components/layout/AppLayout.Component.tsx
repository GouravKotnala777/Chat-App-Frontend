import "../../styles/layout/app-layout.component.scss";
import { ComponentType, MouseEvent, ReactElement } from "react";
import Header from "./Header.Component";
import Title from "../shared/Title.Component";
import Skeleton from "../Skeleton.Component";
import ChatList from "../specific/ChatList.Component";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import ProfileCard from "../specific/ProfileCard.Component";


const AppLayout = () => <P extends object>(WrappedComponent:ComponentType<P>) => {
    
    return (props:P):ReactElement => {
        const {chatID} = useParams!<{[key:string]:string;}>();

        const handleDeleteChat = (e:MouseEvent<HTMLAnchorElement>, _id:string, groupChat:boolean,) => {
            e.preventDefault();
            console.log("Delete Chat", _id, groupChat);
        };
        

        return(
            <div className="app_layout_cont">
                <Title title="Chat App" description="this is description" />
                <Header /> 
                {/* // 900 600 */}
                <div className="three_sections_cont">
                    <div className="left_section"><ChatList chats={sampleChats} chatID={chatID} newMessagesAlert={[{chatID:chatID as string, count:4}]} onlineUsers={["1", "2"]} handleDeleteChat={(e) => handleDeleteChat(e.e, e._id, e.groupChat)} width="100%" /></div>
                    <div className="middle_section">
                        {/* {
                            Array.from({length:8}).map((_, index) => (
                                <Skeleton key={index} height="45px" width="90%" />
                            ))
                        } */}
                        <WrappedComponent {...props} />
                    </div>
                    <div className="right_section"><ProfileCard /></div>
                </div>
                
                {/* <div>Footer</div> */}
            </div>
        );
    };
};

export default AppLayout;