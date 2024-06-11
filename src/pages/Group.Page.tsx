import "../styles/pages/group.scss";
import { BiEdit, BiLeftArrowAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MouseEvent, ReactEventHandler, Suspense, lazy, memo, useEffect, useState } from "react";
import AvatarCard from "../components/shared/AvatarCard.Component";
import { ChatTypes, UserTypes } from "../constants/sampleData";
import { MdDone } from "react-icons/md";
import AddMemberDialog from "../components/dialog/AddMemberDialog";
import UserItem from "../components/shared/UserItem.Component";
import { server } from "../constants/config";
import toast, {Toaster} from "react-hot-toast";
const ConfirmDeleteDialog = lazy(() => import("../components/dialog/ConfirmDeleteDialog"));


const isAddMember:boolean = false;

const Groups = () => {
  const chatID = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatTypes[]>([]);
  const [members, setMembers] = useState<UserTypes[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>();
  const [groupNameUpdated, setGroupNameUpdated] = useState<string>();


  const getMyGroupChats = async() => {
    try {
      const res = await fetch(`${server}/api/v1/chat/my/groups`, {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();

      console.log("------ Group.Page.tsx  getMyGroupChats");
      console.log(data);
      setChats(data.message);
      console.log("------ Group.Page.tsx  getMyGroupChats");
      
    } catch (error) {
      console.log("------ Group.Page.tsx  getMyGroupChats");
      console.log(error);
      console.log("------ Group.Page.tsx  getMyGroupChats");
    }
  };
  const getChatDetailes = async() => {
    try {
      const res = await fetch(`${server}/api/v1/chat/${chatID}`, {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();

      console.log("------ Group.Page.tsx  getChatDetailes");
      console.log(data);
      setMembers(data.message.members);
      setGroupName(data.message.name);
      console.log("------ Group.Page.tsx  getChatDetailes");
      
    } catch (error) {
      console.log("------ Group.Page.tsx  getChatDetailes");
      console.log(error);
      console.log("------ Group.Page.tsx  getChatDetailes");
    }
  };
  const updateGroupName = async() => {
    try {
      const res = await fetch(`${server}/api/v1/chat/${chatID}`, {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({name:groupNameUpdated})
      });
      const data = await res.json();

      console.log("------ Group.Page.tsx  updateGroupName");
      setIsEdit(false);
      console.log(data);
      console.log("------ Group.Page.tsx  updateGroupName");
    } catch (error) {
      console.log("------ Group.Page.tsx  updateGroupName");
      setIsEdit(false);
      console.log(error);
      console.log("------ Group.Page.tsx  updateGroupName");
    }    
  };
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  };
  const closeConfirmDeleteHandler = (e:MouseEvent<HTMLDivElement|HTMLButtonElement|HTMLDialogElement>|ReactEventHandler<HTMLDialogElement>) => {
    (e as MouseEvent<HTMLDivElement|HTMLButtonElement>).stopPropagation();
    setConfirmDeleteDialog(false);
    console.log("Delete Group");
  };
  const openAddMemberHandler = () => {
    console.log("Add Member");
  };
  const deleteHandler = async(e:MouseEvent<HTMLButtonElement>) => {
    console.log("Delete Handler");
    closeConfirmDeleteHandler(e);
    try {
      const res = await fetch(`${server}/api/v1/chat/${chatID}`, {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();
  
      console.log("----- Group.Page.tsx  deleteHandler");
      console.log(data);
      console.log("----- Group.Page.tsx  deleteHandler");

      if (data.success === true) {
        toast.success(data.message, {
          position:"bottom-center",
          duration:2000
        });
        }
      else{
        toast.error(data.message, {
          position:"bottom-center",
          duration:2000
        });
      }
      
    } catch (error) {
      toast.error("Error Occured", {
        position:"bottom-center",
        duration:2000
      });
      console.log("----- Group.Page.tsx  deleteHandler");
      console.log(error);
      console.log("----- Group.Page.tsx  deleteHandler");
    }
    
  };
  const removeMemberHandler = async(e:MouseEvent<HTMLDivElement|HTMLButtonElement>, userID:string) => {
    // console.log("removed member", userID);
    try {
      const res = await fetch(`${server}/api/v1/chat/removemember`, {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({chatID, userID})
      });
      const data = await res.json();

      console.log("------ Group.Page.tsx  removeMemberHandler");
      console.log(data);
      console.log("------ Group.Page.tsx  removeMemberHandler");
    } catch (error) {
      console.log("------ Group.Page.tsx  removeMemberHandler");
      console.log(error);
      console.log("------ Group.Page.tsx  removeMemberHandler");
      
    }
    
  };

  const GroupName = 
    (<div>
      {
        isEdit ? 
          <>
            <input type="text" name="group_name_inp" value={groupNameUpdated} onChange={(e) => setGroupNameUpdated(e.target.value)} />
            <button onClick={updateGroupName}><MdDone /></button>
          </>
          :
          <>
            <div>{groupName}</div>
            <button onClick={() => setIsEdit(true)}><BiEdit /></button>
          </> 
      }
    </div>)

    useEffect(() => {
      getMyGroupChats();
    }, []);
    useEffect(() => {
      if (chatID) {
        getChatDetailes();
      }

      return () => {
        setGroupName("");
        setGroupNameUpdated("");
        setIsEdit(false);
        setIsMobileMenuOpen(false);
      };
    }, [chatID]);

    return (
      <div className="group_cont">
        <Toaster />

        <div className="group_list">
          {/* <pre>{JSON.stringify(members, null, `\t`)}</pre> */}
          <GroupsList myGroups={chats} chatID={chatID!} />
        </div>

        <div className="group_details">
          <div className="back_btn">
            <BiLeftArrowAlt className="BiLeftArrowAlt" onClick={() => navigate("/")} />
            <GiHamburgerMenu className="GiHamburgerMenu" onClick={() => setIsMobileMenuOpen((prev) => !prev)} />
          </div>
          {
            GroupName && (
              <>
                {GroupName}
                <div>Members</div>
                <div></div>
                <div className="btn_group">
                  <button onClick={openAddMemberHandler}>Add Member</button>
                  <button onClick={openConfirmDeleteHandler}>Delete Group</button>
                </div>
              </>
            )
          }

          <div className="members_list_cont">
            {
              members.map((i) => (
                <UserItem key={i._id} user={i} isUserAdded={true} handler={(e) => removeMemberHandler(e, i._id)} />
              ))
            }
          </div>

          {
            isAddMember && <Suspense fallback={<div>Loading...</div>}><AddMemberDialog purpose="Ad Members"/></Suspense>
          }

          {
            confirmDeleteDialog && <Suspense fallback={<div>Loading...</div>}><ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} /></Suspense>
          }

        </div>

        <div className="hamburger_overlay" style={{left:isMobileMenuOpen?"0%":"-97%"}}>
          <div className="left_part">
            <GroupsList w={"50vw"} myGroups={chats} chatID={chatID!} />
          </div>
          <div className="right_part" style={{background:isMobileMenuOpen?"rgba(0,0,0,0.7)":""}} onClick={() => setIsMobileMenuOpen(false)} ></div>
        </div>

      </div>
    )
};

const GroupsList = ({myGroups=[], chatID}:{w?:string; myGroups:ChatTypes[]; chatID:string;}) => (
  <div>
    {
      myGroups.length > 0 ? 
        (
          myGroups.map((group) => (<GroupListItem group={group} chatID={chatID} key={group._id} />))
        )
        :
        (
          <div>No Groups</div>
        )
    }
  </div>
);

const GroupListItem = memo(({group, chatID}:{group:ChatTypes; chatID:string;}) => {
  const {name, avatar, _id} = group;

  return(
    <Link to={`?group=${_id}`} onClick={(e) => {if(chatID === _id) e.preventDefault()}}>
      <AvatarCard avatar={avatar} />
      <div>{name}</div>
    </Link>
  )
});


  
export default Groups;
  