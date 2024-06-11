import {MouseEvent, useEffect, useState } from "react";
import "../../styles/dialog/add-member-dialog.scss";
import { UserTypes, sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem.Component";
import { server } from "../../constants/config";


const AddMemberDialog = ({purpose, isLoadingAddMember}:{purpose:string; addMember?:string; isLoadingAddMember?:boolean;}) => {
    const [members, setMembers] = useState<UserTypes[]>(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);


    const selectMemberHandler = (e:MouseEvent<HTMLDivElement|HTMLButtonElement>, id:string) => {
        // console.log(id);
        e.stopPropagation();
        setSelectedMembers((prev) => 
            prev.includes(id) ?
                (prev.filter((currentElement) => currentElement !== id))
                :
                ([...prev, id])
        );
    };
    const closeHandler = (e:MouseEvent<HTMLDivElement|HTMLButtonElement>) => {        
        e.stopPropagation();
    };
    const addMemberSubmitHandler = () => {
        console.log("Members added");
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
            console.log("------AddMemberDialog.tsx  getMyFriends");
            console.log(data);
            setMembers(data.message);
            console.log("------AddMemberDialog.tsx  getMyFriends");
        })
        .catch((error) => {
            console.log("------AddMemberDialog.tsx  getMyFriends");
            console.log(error);
            console.log("------AddMemberDialog.tsx  getMyFriends");
        })
    }, []);

    return(
        <div className="add_member_dialog_cont">
            <dialog className="add_member_dialog" open>
                <div className="dialog_title">{purpose === "forward" ? "Forward to" : "Add Members"}</div>
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
                    <button className="cancell_btn" onClick={(e) => closeHandler(e)}>Cancell</button>
                    <button className="ok_btn" disabled={isLoadingAddMember} onClick={()=>{addMemberSubmitHandler()}}>Add</button>
                </div>
            </dialog>
        </div>
    )
};

export default AddMemberDialog;

// const array1 = [{"gourav":"kotnala"}, {"naruto":"uzumaki"}, {"sasuke":"uchiha"}];
// // array2 = ["kotnala", "uzumaki", "uchiha"];
// how to convert array1 to array2 in javascript