import "../../styles/specific/profile-card.component.scss"
import { BiCalendar, BiUser, BiUserCheck } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import moment from "moment";
import { useSelector } from "react-redux";
import { initialSelectedChatReducerTypes } from "../../redux/reducers/selectedChatReducer";
import { AuthReducerInitialState } from "../../redux/reducers/authReducer";
import { imageWithFallbackHandler } from "../../utils/imageFallback";

const ProfileCard = () => {
    const {chat} = useSelector((state:{selectedChatReducer:initialSelectedChatReducerTypes}) => state.selectedChatReducer);
    const {user} = useSelector((state:{authReducer:AuthReducerInitialState}) => state.authReducer);

    const selectedChatUser = chat?.members.find((q) => q._id.toString() !== user?._id.toString());


    console.log({selectedChatUser});
    
    return(
        <div className="profile_card_cont">
            <div className="img_cont">
                <img src={selectedChatUser?.avatar.url} alt={selectedChatUser?.avatar.public_id} onError={(e) => imageWithFallbackHandler(e)} />
            </div>
            <div className="profile_info_cont">
                <div className="profile_info">
                    <div className="detail_heading">Bio</div>
                    <div className="detail_value"><BiUserCheck /> {selectedChatUser?.bio}</div>
                </div>
                <div className="profile_info">
                    <div className="detail_heading">Username</div>
                    <div className="detail_value"><MdEmail /> {selectedChatUser?.userName}</div>
                </div>
                <div className="profile_info">
                    <div className="detail_heading">Name</div>
                    <div className="detail_value"><BiUser /> {selectedChatUser?.name}</div>
                </div>
                <div className="profile_info">
                    <div className="detail_heading">Joined</div>
                    <div className="detail_value"><BiCalendar /> {moment(selectedChatUser?.createdAt).fromNow()}</div>
                </div>
            </div>
        </div>
    )
};

export default ProfileCard;