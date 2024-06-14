import "../../styles/specific/search.component.scss";
import { MouseEvent, useState } from "react";
import UserItem from "../shared/UserItem.Component";
import { server } from "../../constants/config";
import toast, {Toaster} from "react-hot-toast";


const Search = ({closeAllModels}:{closeAllModels:() => void}) => {
    const [users, setUsers] = useState<{success:boolean; message:{_id:string; name:string; userName:string; avatar:{public_id:string; url:string;}}[]}>();
    const [searchedNameQuery, setSearchedNameQuery] = useState<string>();
    const isLoadingSendFriendRequest = false;
    const addFriendHandler = async(e:MouseEvent<HTMLDivElement|HTMLButtonElement>, _id:string) => {
        e.stopPropagation()
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

            if (data.success === true) {
                toast.success(data.message, {
                    position:"bottom-center",
                    duration:1000
                });
            }
            else{
                toast.error(data.message, {
                    position:"bottom-center",
                    duration:1000
                });
                
            }
        } catch (error) {
            toast.error("Error Occured", {
                position:"bottom-center",
                duration:1000
            });
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
            setUsers(data);
            console.log("----- Search.Component.tsx  searchUsers");

            
            if (data.success === true) {
                toast.success(`aaaaaa`, {
                    position:"bottom-center",
                    duration:1000
                });
            }
            else{
                toast.error(data.message, {
                    position:"bottom-center",
                    duration:1000
                });
                
            }


            // const toastId = toast.loading('Loading...');
            // toast.success('This worked', {
            //     id: toastId,    
            //     position:"bottom-center",
            //     duration:1000
            
            // });
            
        } catch (error) {
            toast.error("Error Occured", {
                position:"bottom-center",
                duration:1000
            });
            console.log("----- Search.Component.tsx  searchUsers");
            console.log(error);
            console.log("----- Search.Component.tsx  searchUsers");
        }
    };


    return(
        <div className="search_cont" style={{zIndex:"1"}}>
            <Toaster />
            <div className="closing_area" onClick={closeAllModels}>
                
            </div>
            <dialog className="dialog_cont" open>
                <div className="dialog_heading">Search</div>
                <input type="text" name="name" placeholder="User Name" onChange={(e) => setSearchedNameQuery(e.target.value)} />
                <button onClick={searchUsers}>Search</button>

                <div className="list_cont">
                    <ul className="seach_cont_ul">
                        {
                            users?.success &&
                            users.message.map((i, index) => (
                                <li className="seach_cont_li" key={index}><UserItem user={i} key={i._id} handler={(e) => addFriendHandler(e, i._id)} isHandlerLoading={isLoadingSendFriendRequest} /></li>
                            ))
                        }
                    </ul>
                </div>
            </dialog>
        </div>
    )
};

export default Search;