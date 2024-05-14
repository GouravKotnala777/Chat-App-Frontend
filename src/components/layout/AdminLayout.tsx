import "../../styles/layout/admin-layout.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import { ReactElement, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdExitToApp, MdGroup, MdManageAccounts, MdMessage } from "react-icons/md";


const adminTabs = [
    {
        name:"Dashboard",
        path:"/admin/dashboard",
        icon:<MdDashboard />
    },
    {
        name:"Users",
        path:"/admin/users",
        icon:<MdManageAccounts />
    },
    {
        name:"Chats",
        path:"/admin/chats",
        icon:<MdGroup />
    },
    {
        name:"Messages",
        path:"/admin/messages",
        icon:<MdMessage />
    }
]
const isAdmin:boolean = true;
const AdminLayout = ({children}:{children:ReactElement|string}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = () => {
        console.log("logout successfull");
    };

    if (!isAdmin) {return <Navigate to="/admin" />}

    return(
        <div className="admin_layout_cont">

            <div className="left_section">
                aaaa

            </div>

            <div className="right_section">
                <div className="back_btn">
                    <BiLeftArrowAlt className="BiLeftArrowAlt" onClick={() => navigate("/")} />
                    <GiHamburgerMenu className="GiHamburgerMenu" onClick={() => setIsMobileMenuOpen((prev) => !prev)} />
                </div>
                {children}
            </div>

            <div className="hamburger_overlay" style={{left:isMobileMenuOpen?"0%":"-97%"}}>
                <div className="left_part">
                    <h2>Messanger</h2>
                    <div className="hamburger_items">
                        {
                            adminTabs.map((tab) => (
                                <Link key={tab.path} to={tab.path} className="hamburger_nav_link" style={location.pathname === tab.path ? 
                                    {
                                    background:"linear-gradient(90deg, #ff3153, white)",
                                     color:"white",
                                     fontWeight:"bold"
                                     }
                                     :
                                     {
                                     background:"",
                                      color:"#515151",
                                      fontWeight:"thin"
                                      }
                                    }>
                                    <div className="nav_icon">{tab.icon}</div>
                                    <div className="nav_heading">{tab.name}</div>
                                </Link>
                            ))
                        }
                        <div className="hamburger_nav_link" onClick={logoutHandler}>
                            <div className="nav_icon"><MdExitToApp /></div>
                            <div className="nav_heading">Logout</div>
                        </div>
                    </div>
                    
                </div>
                <div className="right_part" style={{background:isMobileMenuOpen?"rgba(0,0,0,0.7)":""}} onClick={() => setIsMobileMenuOpen(false)}>
                    Right Part
                </div>
            </div>
        </div>
    )
};

export default AdminLayout;