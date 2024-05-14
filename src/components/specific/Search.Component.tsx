import { useState } from "react";
import "../../styles/specific/search.component.scss";
import UserItem from "../shared/UserItem.Component";
import { sampleUsers } from "../../constants/sampleData";


const Search = ({isSearch}:{isSearch:boolean;}) => {
    const [users, setUsers] = useState(sampleUsers);
    const isLoadingSendFriendRequest = false;
    const addFriendHandler = (_id:string) => {
        console.log(_id);
    };


    return(
        <div className="search_cont" >
            <dialog className="dialog_cont" open>
                <div className="dialog_heading">Search</div>
                <input type="text" name="name" placeholder="User Name" />
                <button>Search</button>

                <div className="list_cont">
                    <ul className="seach_cont_ul">
                        {users.map((i, index) => (
                            <li className="seach_cont_li" key={index}><UserItem user={i} key={i._id} handler={addFriendHandler} isHandlerLoading={isLoadingSendFriendRequest} /></li>
                        ))}
                    </ul>
                </div>
            </dialog>
        </div>
    )
};

export default Search;