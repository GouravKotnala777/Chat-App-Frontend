import "../../styles/specific/notification.component.scss";
import { memo, useEffect, useState } from "react";
import logo from "../../assets/react.svg";
import { server } from "../../constants/config";

const Notification = ({closeAllModels}:{closeAllModels:() => void}) => {
    const [notifications, setNotifications] = useState<{_id:string; sender:{_id:string; name:string; userName:string; avatar:string[];}}[]>([]);


    const friendRequestHandler = async({_id, accept}:{_id:string; accept:boolean;}) => {
        console.log({_id, accept});
        try {
            const res = await fetch(`${server}/api/v1/user/acceptrequest`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({requestID:_id, accept})
            });

            const data = await res.json();

            console.log("------ Notification.Component.tsx  friendRequestHandler");
            console.log(data);
            console.log("------ Notification.Component.tsx  friendRequestHandler");
        } catch (error) {
            console.log("------ Notification.Component.tsx  friendRequestHandler");
            console.log(error);
            console.log("------ Notification.Component.tsx  friendRequestHandler");   
        }
        
    };
    const myAllRequests = async() => {
        try {
            const res = await fetch(`${server}/api/v1/user/notifications`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data = await res.json();

            console.log("------ Notification.Component.tsx  myAllRequests");
            console.log(data);
            setNotifications(data.message);
            console.log("------ Notification.Component.tsx  myAllRequests");
        } catch (error) {
            console.log("------ Notification.Component.tsx  myAllRequests");
            console.log(error);
            console.log("------ Notification.Component.tsx  myAllRequests");   
        }
        
    };


    useEffect(() => {
        myAllRequests();
    }, []);

    return(
        <div className="notification_cont" style={{zIndex:"1"}}>
            <div className="closing_area" onClick={closeAllModels}>

            </div>
            <dialog className="dialog_cont" open>
                <div className="dialog_heading">Notification</div>
                {/* <input type="text" name="name" placeholder="User Name" />
                <button>Search</button> */}

                <div className="list_cont">
                    <ul className="notification_cont_ul">
                        {
                            notifications ?
                                <>
                                    {notifications.map((i, index) => (
                                        <li className="notification_cont_li" key={index}><NotificationItem key={i._id} sender={i.sender} _id={i._id} handler={friendRequestHandler} /></li>
                                    ))}
                                </>
                                :
                                <h2>No Notifications</h2>
                        }
                    </ul>
                </div>
            </dialog>
        </div>
    )
};

const NotificationItem = memo(({sender, _id, handler}:{sender:{avatar:string[]; name:string;}; _id:string; handler:({ _id, accept }:{_id: string; accept: boolean;}) => void}) => {
    const {name} = sender;

    return(
        <div className="notification_item_cont">
            <div className="notification_item">
                <img src={logo} alt={logo} />
                <div className="user_name">{name} <span>sent you a friend request</span></div>
                <div className="btns">
                    <button className="accept_btn" onClick={() => handler({_id, accept:true})}>
                        Accept
                    </button>
                    <button className="reject_btn" onClick={() => handler({_id, accept:false})}>
                        Reject
                    </button>
                </div>
            </div>
        </div>
    )
});

export default Notification;