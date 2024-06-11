import "../../styles/layout/header.scss";
import logo from "../../../public/vite.svg";
import { BiAddToQueue, BiCopy, BiCut, BiGroup, BiLogOut, BiMenu, BiNotification, BiPaste, BiSearch } from "react-icons/bi";
import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { MiscInitialStateTypes, setIsForwardMessageActive, setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/reducers/miscReducer";
import { ActivityStateReducerInitialStateType } from "../../redux/reducers/activityStateReducer";
import { MdDelete } from "react-icons/md";
import { BsForward } from "react-icons/bs";
import { InitialSelectedMessagesReducerStateType } from "../../redux/reducers/selectedMessagesReducer";
import toast, {Toaster} from "react-hot-toast";


const SearchDialogBox = lazy(() => import("../specific/Search.Component"));
const NotificationDialog = lazy(() => import("../specific/Notification.Component"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup.Component"));


const Header = () => {
    const {isMobile,isSearch,isNewGroup,isNotification} = useSelector((state:{miscReducer:MiscInitialStateTypes}) => state.miscReducer);
    const {isnormalActive, isMessageSelectionActive} = useSelector((state:{activityStateReducer:ActivityStateReducerInitialStateType}) => state.activityStateReducer);
    const {selectedMessages} = useSelector((state:{selectedMessagesReducer:InitialSelectedMessagesReducerStateType}) => state.selectedMessagesReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [] = useState<boolean>(false);


    const handleMobile = () => {
        dispatch(setIsMobile(!isMobile));
        dispatch(setIsSearch(false));
        dispatch(setIsNewGroup(false));
        dispatch(setIsNotification(false));
    };
    const openSearchDialog = () => {
        dispatch(setIsMobile(false));
        dispatch(setIsSearch(!isSearch));
        dispatch(setIsNewGroup(false));
        dispatch(setIsNotification(false));
    };
    const openNewGroup = () => {
        dispatch(setIsMobile(false));
        dispatch(setIsSearch(false));
        dispatch(setIsNewGroup(!isNewGroup));
        dispatch(setIsNotification(false));
    };
    const openNotification = () => {
        dispatch(setIsMobile(false));
        dispatch(setIsSearch(false));
        dispatch(setIsNewGroup(false));
        dispatch(setIsNotification(!isNotification));
    };
    const closeAllModels = () => {
        dispatch(setIsMobile(false));
        dispatch(setIsSearch(false));
        dispatch(setIsNewGroup(false));
        dispatch(setIsNotification(false));
    };
    const logoutHandler = async() => {
        try {
            const res = await fetch(`${server}/api/v1/user/logout`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data = await res.json();

            console.log("------Header.Component.tsx logoutHandler");
            console.log(data);
            console.log("------Header.Component.tsx logoutHandler");

            if (data.success) {
                toast.success("Logout Successfull", {
                    position:"bottom-center",
                    duration:1000
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            }
            else{
                toast.error(data.message, {
                    position:"bottom-center",
                    duration:1000
                });           
            }
            
            
        } catch (error) {
            toast.error("Errro Occured", {
                position:"bottom-center",
                duration:1000
            });
            console.log("------Header.Component.tsx logoutHandler");
            console.log(error);
            console.log("------Header.Component.tsx logoutHandler");
        }
    };
    const deleteMessageHandler = async() => {
        try {
            const res = await fetch(`${server}/api/v1/message/delete`, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({messageID:selectedMessages.flatMap((q) => Object.keys(q))})
            });

            const data = await res.json();

            console.log("----- Header.Component  deleteMessageHandler");
            console.log(data);
            console.log("----- Header.Component  deleteMessageHandler");
            
            } catch (error) {
            console.log("----- Header.Component  deleteMessageHandler");
            console.log(error);
            console.log("----- Header.Component  deleteMessageHandler");
        }
    };

    return(
        <div className="header_outer_cont">
            <Toaster />
            <div className="header_cont">
                <div className="hamburger_logo">
                    <BiMenu className="nav_link" onClick={() => handleMobile()} />
                </div>
                <div className="logo_cont">
                    <img src={logo} alt={logo} />
                </div>
                {
                    isnormalActive &&
                        <div className="navbar_cont">
                            {/* <BiSearch className="nav_link" onClick={() => setIsSearch(!isSearch)} /> */}
                            <BiSearch className="nav_link" onClick={() => openSearchDialog()} />
                            <BiAddToQueue className="nav_link" onClick={() => openNewGroup()} />
                            <BiGroup className="nav_link" onClick={() => navigate("/groups")} />

                            <BiNotification className="nav_link" onClick={() => openNotification()} />
                            <BiLogOut className="nav_link" onClick={() => logoutHandler()} />
                        </div>
                }
                {
                    isMessageSelectionActive &&
                        <div className="navbar_cont">
                            <BiCopy className="nav_link" onClick={() => openSearchDialog()} />
                            <BiCut className="nav_link" onClick={() => openNewGroup()} />
                            <BiPaste className="nav_link" onClick={() => navigate("/groups")} />
                            <BsForward className="nav_link" onClick={(e) => {e.stopPropagation(); dispatch(setIsForwardMessageActive(true));}} />
                            <MdDelete className="nav_link" onClick={() => deleteMessageHandler()} />
                        </div>
                }
            </div>
            {
                isSearch && (
                    <Suspense fallback={<div>...Loading</div>}>
                        <SearchDialogBox closeAllModels={closeAllModels} />
                    </Suspense>
                )
            }
            {
                isNotification && (
                    <Suspense fallback={<div>...Loading</div>}>
                        <NotificationDialog closeAllModels={closeAllModels} />
                    </Suspense>
                )
            }
            {
                isNewGroup && (
                    <Suspense fallback={<div>...Loading</div>}>
                        <NewGroupDialog closeAllModels={closeAllModels} />
                    </Suspense>
                )
            }
        </div>
    )
};

export default Header;