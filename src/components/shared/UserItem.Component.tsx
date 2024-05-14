import "../../styles/shared/user-item.component.scss";
import { memo } from "react";
import logo from "../../assets/react.svg";
import { CgAdd, CgRemove } from "react-icons/cg";


const UserItem = ({user, handler, isHandlerLoading, isUserAdded=false}:{user:{avatar: string[]; name: string; _id: string;}; handler:(id:string) => void; isHandlerLoading?:boolean; isUserAdded:boolean;}) => {
    const {avatar, name, _id}:{avatar: string[]; name: string; _id: string;} = user;

    return(
        <div className="user_item_cont">
            <div className="user_item">
                <img src={logo} alt={logo} />
                <div className="user_name">{name}</div>
                <button onClick={() => handler(_id)} disabled={isHandlerLoading}>
                    {isUserAdded ? <CgRemove color="red" /> : <CgAdd color="green" />}
                </button>
            </div>
        </div>
    )
};

export default memo(UserItem);