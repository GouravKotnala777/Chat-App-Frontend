import { transformImage } from "../../lib/features";


const AvatarCard = ({avatar}:{avatar:string[];}) => {

    return(
        <div className="avatar_card_cont" style={{width:"50px", height:"50px", borderRadius:"50%", overflow:"hidden"}}>
            <div>
                {
                    avatar.map((item, index) => (
                        <img src={transformImage(item)} alt={item} key={index} style={{width:"100%"}} />
                    ))
                }
            </div>
        </div>
    )
};

export default AvatarCard;