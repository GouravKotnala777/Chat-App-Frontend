// import { useEffect } from "react";
import {useState } from "react";
import "../../styles/dialog/add-member-dialog.scss";
import { UserTypes, sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem.Component";


const AddMemberDialog = ({addMember, isLoadingAddMember, chatID}:{addMember?:string; isLoadingAddMember?:boolean; chatID?:string;}) => {
    const [members, setMembers] = useState<UserTypes[]>(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const selectMemberHandler = (id:string) => {
        // console.log(id);
        
        setSelectedMembers((prev) => 
            prev.includes(id) ?
                (prev.filter((currentElement) => currentElement !== id))
                :
                ([...prev, id])
        )
    };



    const closeHandler = () => {
        // setSelectedMembers([]);
        // setMembers([]);
    };
    const addMemberSubmitHandler = () => {
        closeHandler();
    };

    return(
        <div className="add_member_dialog_cont" onClick={closeHandler}>
            <dialog className="add_member_dialog" open>
                <div className="dialog_title">Add Member</div>
                <div className="dialog_content">
                    {   members.length > 0 ?
                            members.map((i) => (
                                <UserItem key={i._id} user={i} handler={selectMemberHandler} isUserAdded={selectedMembers.includes(i._id)} />
                            ))
                            :
                            <h1>No Friends</h1>
                    }
                </div>
                <div className="dialog_btns">
                    <button className="cancell_btn" onClick={closeHandler}>Cancell</button>
                    <button className="ok_btn" disabled={isLoadingAddMember} onClick={addMemberSubmitHandler}>Add</button>
                </div>
            </dialog>
        </div>
    )
};

export default AddMemberDialog;