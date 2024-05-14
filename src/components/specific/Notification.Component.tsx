import "../../styles/specific/notification.component.scss";
import { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";
import logo from "../../assets/react.svg";

const Notification = () => {
    const friendRequestHandler = ({_id, accept}:{_id:string; accept:boolean;}) => {
        console.log({_id, accept});
        
    };

    return(
        <div className="notification_cont" >
            <dialog className="dialog_cont" open>
                <div className="dialog_heading">Notification</div>
                {/* <input type="text" name="name" placeholder="User Name" />
                <button>Search</button> */}

                <div className="list_cont">
                    <ul className="notification_cont_ul">
                        {
                            sampleNotifications.length > 0 ?
                                <>
                                    {sampleNotifications.map((i, index) => (
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
    const {name, avatar} = sender;

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