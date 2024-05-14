import "../../styles/specific/new-group.component.scss";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem.Component";
import { useState } from "react";


const NewGroup = () => {
    const [members, setMembers] = useState<{avatar: string[]; name: string; _id: string;}[]>(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const selectedMemberHandler = (id:string) => {
        if (!selectedMembers.includes(id)) {
            setSelectedMembers((prev) => [...prev, id]);
        }
        else{
            setSelectedMembers((prev) => [...prev.filter((item) => item !== id)]);
        }
    };

    console.log(selectedMembers);
    
    
    const submitHandler = () => {
        console.log(selectedMembers);
    };
    const closeHandler = () => {
    };

    return(
        <div className="new_group_cont" >
            <dialog className="dialog_cont" open onClose={closeHandler}>
                <div className="dialog_heading">New Group</div>
                <input type="text" name="name" placeholder="Group Name" />

                <div className="list_cont">
                    <ul className="new_group_cont_ul">
                        {
                            sampleUsers.length > 0 ?
                                <>
                                    {sampleUsers.map((i, index) => (
                                        <li className="new_group_cont_li" key={index}><UserItem key={i._id} user={i} handler={selectedMemberHandler} isUserAdded={selectedMembers.includes(i._id)} /></li>
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