import "../../styles/layout/header.scss";
// import { NavLink } from "react-router-dom";
import logo from "../../../public/vite.svg";
import { BiAddToQueue, BiGroup, BiLogOut, BiMenu, BiNotification, BiSearch } from "react-icons/bi";
import { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";



const SearchDialogBox = lazy(() => import("../specific/Search.Component"));
const NotificationDialog = lazy(() => import("../specific/Notification.Component"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup.Component"));


const Header = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [isNewGroup, setIsNewGroup] = useState<boolean>(false);
    const [isNotification, setIsNotification] = useState<boolean>(false);
    const navigate = useNavigate();
    // const [] = useState<boolean>(false);


    // const handleMobile = () => {
                
    // };
    // const openSearchDialog = () => {

    // };
    // const openNewGroup = () => {

    // };
    // const navigateToGroup = () => {

    // };
    // const logoutHandler = () => {

    // };

    return(
        <div className="header_outer_cont">


            <div className="header_cont">
                <div className="hamburger_logo">Ham</div>
                <div className="logo_cont">
                    <img src={logo} alt={logo} />
                </div>
                <div className="navbar_cont">
                    <BiMenu className="nav_link" onClick={() => setIsMobile(!isMobile)} />

                    <BiSearch className="nav_link" onClick={() => setIsSearch(!isSearch)} />
                    <BiAddToQueue className="nav_link" onClick={() => setIsNewGroup(!isNewGroup)} />
                    <BiGroup className="nav_link" onClick={() => navigate("/groups")} />
                    <BiNotification className="nav_link" onClick={() => setIsNotification(!isNotification)} />
                    <BiLogOut className="nav_link" />
                    
                    {/* <NavLink to="/" className="nav_link">Home</NavLink>
                    <NavLink to="/login" className="nav_link">Login</NavLink>
                    <NavLink to="/logout" className="nav_link">Logout</NavLink> */}
                </div>
            </div>
            {
                isSearch && (
                    <Suspense fallback={<div>...Loading</div>}>
                        <SearchDialogBox isSearch={isSearch} />
                    </Suspense>
                )
            }
            {
                isNotification && (
                    <Suspense fallback={<div>...Loading</div>}>
                        <NotificationDialog />
                    </Suspense>
                )
            }
            {
                isNewGroup && (
                    <Suspense fallback={<div>...Loading</div>}>
                        <NewGroupDialog />
                    </Suspense>
                )
            }
        </div>
    )
};

export default Header;