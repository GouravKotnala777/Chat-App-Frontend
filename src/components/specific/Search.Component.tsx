import "../../styles/specific/search.component.scss";
import { MouseEvent, useState } from "react";
import UserItem from "../shared/UserItem.Component";
import { server } from "../../constants/config";


const Search = ({closeAllModels}:{closeAllModels:() => void}) => {
    const [users, setUsers] = useState<{_id:string; name:string; userName:string; avatar:string[];}[]>([]);
    const [searchedNameQuery, setSearchedNameQuery] = useState<string>();
    const isLoadingSendFriendRequest = false;
    const addFriendHandler = async(e:MouseEvent<HTMLDivElement|HTMLButtonElement>, _id:string) => {
        try {
            const res = await fetch(`${server}/api/v1/user/sendrequest`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({userID:_id})
            });
            const data = await res.json();

            console.log("----- Search.Component.tsx  addFriendHandler");
            console.log(data);
            console.log("----- Search.Component.tsx  addFriendHandler");
        } catch (error) {
            console.log("----- Search.Component.tsx  addFriendHandler");
            console.log(error);
            console.log("----- Search.Component.tsx  addFriendHandler");
        }
        console.log(_id);
    };
    const searchUsers = async() => {
        try {
            const res = await fetch(`${server}/api/v1/user/search?name=${searchedNameQuery}`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data = await res.json();

            console.log("----- Search.Component.tsx  searchUsers");
            console.log(data);
            setUsers(data.message);
            console.log("----- Search.Component.tsx  searchUsers");
        } catch (error) {
            console.log("----- Search.Component.tsx  searchUsers");
            console.log(error);
            console.log("----- Search.Component.tsx  searchUsers");
        }
    };


    return(
        <div className="search_cont" style={{zIndex:"1"}}>
            <div className="closing_area" onClick={closeAllModels}>
                
            </div>
            <dialog className="dialog_cont" open>
                <div className="dialog_heading">Search</div>
                <input type="text" name="name" placeholder="User Name" onChange={(e) => setSearchedNameQuery(e.target.value)} />
                <button onClick={searchUsers}>Search</button>

                <div className="list_cont">
                    <ul className="seach_cont_ul">
                        {users.map((i, index) => (
                            <li className="seach_cont_li" key={index}><UserItem user={i} key={i._id} handler={(e) => addFriendHandler(e, i._id)} isHandlerLoading={isLoadingSendFriendRequest} /></li>
                        ))}
                    </ul>
                </div>
            </dialog>
        </div>
    )
};

export default Search;