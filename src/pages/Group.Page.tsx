import "../styles/pages/group.scss";
import { BiEdit, BiLeftArrowAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MouseEvent, ReactEventHandler, Suspense, lazy, memo, useEffect, useState } from "react";
import AvatarCard from "../components/shared/AvatarCard.Component";
import { ChatTypes, sampleChats, sampleUsers } from "../constants/sampleData";
import { MdDone } from "react-icons/md";
import AddMemberDialog from "../components/dialog/AddMemberDialog";
import UserItem from "../components/shared/UserItem.Component";
const ConfirmDeleteDialog = lazy(() => import("../components/dialog/ConfirmDeleteDialog"));

const isAddMember:boolean = false;

const Groups = () => {
  const chatID = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>();
  const [groupNameUpdated, setGroupNameUpdated] = useState<string>();

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdated);
    
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
  const deleteHandler = (e:MouseEvent<HTMLButtonElement>) => {
    console.log("Delete Handler");
    closeConfirmDeleteHandler(e);
  };
  const removeMemberHandler = (id:string) => {
    console.log("removed member", id);
    
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
      if (chatID) {
        setGroupName(`Group Name ${chatID}`);
        setGroupNameUpdated(`Group Name ${chatID}`);
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

        <div className="group_list">
          <GroupsList myGroups={sampleChats} chatID={chatID} />
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

          {
            sampleUsers.map((i) => (
              <UserItem user={i} isUserAdded={true} handler={removeMemberHandler} />
            ))
          }

          {
            isAddMember && <Suspense fallback={<div>Loading...</div>}><AddMemberDialog chatID={chatID!} /></Suspense>
          }

          {
            confirmDeleteDialog && <Suspense fallback={<div>Loading...</div>}><ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} /></Suspense>
          }

        </div>

        <div className="hamburger_overlay" style={{left:isMobileMenuOpen?"0%":"-97%"}}>
          <div className="left_part">
            <GroupsList w={"50vw"} myGroups={sampleChats} chatID={chatID} />
          </div>
          <div className="right_part" style={{background:isMobileMenuOpen?"rgba(0,0,0,0.7)":""}} onClick={() => setIsMobileMenuOpen(false)} ></div>
        </div>

      </div>
    )
};

const GroupsList = ({w="100%", myGroups=[], chatID}:{w?:string; myGroups:ChatTypes[]; chatID:string;}) => (
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
  