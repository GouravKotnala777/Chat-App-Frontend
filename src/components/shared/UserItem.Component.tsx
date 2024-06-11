import "../../styles/shared/user-item.component.scss";
import { MouseEvent, memo } from "react";
import logo from "../../assets/react.svg";
import { CgAdd, CgRemove } from "react-icons/cg";


const UserItem = ({user, handler, isHandlerLoading, isUserAdded}:{user:{avatar: string[]; name: string; _id: string;}; handler:(e:MouseEvent<HTMLDivElement|HTMLButtonElement>, id:string) => void; isHandlerLoading?:boolean; isUserAdded?:boolean;}) => {
    const {name, _id}:{name: string; _id: string;} = user;

    return(
        <div className="user_item_cont">
            <div className="user_item">
                <img src={logo} alt={logo} />
                <div className="user_name">{name}</div>
                <button onClick={(e:MouseEvent<HTMLDivElement|HTMLButtonElement>) => handler(e, _id)} disabled={isHandlerLoading}>
                    {isUserAdded ? <CgRemove color="red" /> : <CgAdd color="green" />}
                </button>
            </div>
        </div>
    )
};

export default memo(UserItem);