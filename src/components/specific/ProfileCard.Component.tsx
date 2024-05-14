import "../../styles/specific/profile-card.component.scss"
import logo from "../../assets/react.svg";
import { BiCalendar, BiUser, BiUserCheck } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import moment from "moment";

const ProfileCard = () => {

    return(
        <div className="profile_card_cont">
            <div className="img_cont">
                <img src={logo} alt={logo} />
            </div>
            <div className="profile_info_cont">
                <div className="profile_info">
                    <div className="detail_heading">Bio</div>
                    <div className="detail_value"><BiUserCheck /> dksflkasn sdlkf sdlkk ksa</div>
                </div>
                <div className="profile_info">
                    <div className="detail_heading">Username</div>
                    <div className="detail_value"><MdEmail /> Gourav@gmail.com</div>
                </div>
                <div className="profile_info">
                    <div className="detail_heading">Name</div>
                    <div className="detail_value"><BiUser /> Gourav Kotnala</div>
                </div>
                <div className="profile_info">
                    <div className="detail_heading">Joined</div>
                    <div className="detail_value"><BiCalendar /> {JSON.stringify(moment("2023-11-04T18:30:00.000Z").fromNow())}</div>
                </div>
            </div>
        </div>
    )
};

export default ProfileCard;