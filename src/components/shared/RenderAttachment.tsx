import { transformImage } from "../../lib/features";
import { MdFileOpen } from "react-icons/md";

const RenderAttachment = (file:string, url:string) => {

    switch (file) {
        case "video":
            return <video src={url} preload="none" width={"200px"} controls />;
            
    
        case "image":
            return <img src={transformImage(url)} alt="Attachment" width={"200px"} height={"150px"} style={{objectFit:"contain"}} />;
            
                
        case "audio":
            return <audio src={url} preload="none" controls />;
            
    
        default:
            return <MdFileOpen />;
    }
}

export default RenderAttachment;