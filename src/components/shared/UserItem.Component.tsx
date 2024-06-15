import "../../styles/shared/user-item.component.scss";
import { MouseEvent, memo } from "react";
import { CgAdd, CgRemove } from "react-icons/cg";
import { imageWithFallbackHandler } from "../../utils/imageFallback";


const UserItem = ({user, handler, isHandlerLoading, isUserAdded}:{user:{avatar: {public_id:string; url:string;}; name: string; _id: string;}; handler:(e:MouseEvent<HTMLDivElement|HTMLButtonElement>, id:string) => void; isHandlerLoading?:boolean; isUserAdded?:boolean;}) => {
    const {name, _id, avatar}:{name: string; _id: string; avatar:{public_id:string; url:string;}} = user;

    return(
        <div className="user_item_cont">
            <div className="user_item">
                <img src={avatar.url} alt={avatar.url} onError={(e) => imageWithFallbackHandler(e)} />
                <div className="user_name">{name}</div>
                <button onClick={(e:MouseEvent<HTMLDivElement|HTMLButtonElement>) => handler(e, _id)} disabled={isHandlerLoading}>
                    {isUserAdded ? <CgRemove color="red" /> : <CgAdd color="green" />}
                </button>
            </div>
        </div>
    )
};

export default memo(UserItem);