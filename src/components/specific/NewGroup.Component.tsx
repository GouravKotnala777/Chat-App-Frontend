import "../../styles/specific/new-group.component.scss";
import UserItem from "../shared/UserItem.Component";
import { MouseEvent, useEffect, useState } from "react";
import { server } from "../../constants/config";


const NewGroup = ({closeAllModels}:{closeAllModels:() => void}) => {
    const [members, setMembers] = useState<{_id:string; name:string; avatar:string[]}[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [groupNameInp, setGroupNameInp] = useState<string>();

    const selectedMemberHandler = (e:MouseEvent<HTMLDivElement|HTMLButtonElement>, id:string) => {
        e.stopPropagation();
        if (!selectedMembers.includes(id)) {
            setSelectedMembers((prev) => [...prev, id]);
        }
        else{
            setSelectedMembers((prev) => [...prev.filter((item) => item !== id)]);
        }
    };    
    const submitHandler = async() => {
        try {
            const res = await fetch(`${server}/api/v1/chat/new`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({name:groupNameInp, members:selectedMembers})
            });

            const data = await res.json();
            
            console.log("------NewGroup.Component.tsx  submitHandler");
            console.log(data);
            console.log("------NewGroup.Component.tsx  submitHandler");
        } catch (error) {
            console.log("------NewGroup.Component.tsx  submitHandler");
            console.log(error);
            console.log("------NewGroup.Component.tsx  submitHandler");
        }
        console.log(selectedMembers);
    };

    useEffect(() => {
        fetch(`${server}/api/v1/user/friends`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res) => res.json())
        .then((data) => {
            console.log("------NewGroup.Component.tsx  getMyFriends");
            console.log(data);
            setMembers(data.message);
            console.log("------NewGroup.Component.tsx  getMyFriends");
        })
        .catch((error) => {
            console.log("------NewGroup.Component.tsx  getMyFriends");
            console.log(error);
            console.log("------NewGroup.Component.tsx  getMyFriends");
        })
    }, []);

    return(
        <div className="new_group_cont" style={{zIndex:"1"}}>
            <div className="closing_area" onClick={closeAllModels}>

            </div>
            <dialog className="dialog_cont" open>
                <div className="dialog_heading">New Group</div>
                <input type="text" name="name" placeholder="Group Name" onChange={(e) => setGroupNameInp(e.target.value)} />

                <div className="list_cont">
                    <ul className="new_group_cont_ul">
                        {
                            members.length > 0 ?
                                <>
                                    {members.map((i, index) => (
                                        <li className="new_group_cont_li" key={index}><UserItem key={i._id} user={i} handler={(e) => selectedMemberHandler(e, i._id)} isUserAdded={selectedMembers.includes(i._id)} /></li>
                                    ))}
                                </>
                                :
                                <h2>No User</h2>
                        }
                    </ul>
                </div>

                <div className="btns_cont">
                    <button>Cancel</button>
                    <button onClick={submitHandler}>Create</button>
                </div>
            </dialog>
        </div>
    )
};

export default NewGroup;