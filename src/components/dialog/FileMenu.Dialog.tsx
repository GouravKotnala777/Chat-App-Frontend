import { BiFile, BiImage, BiVideo } from "react-icons/bi";
import "../../styles/dialog/file-menu.dialog.scss";
import { MdAudioFile } from "react-icons/md";
import { ChangeEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUploadingLoader } from "../../redux/reducers/miscReducer";
import { server } from "../../constants/config";

const FileMenu = ({isFileMenuOpen, chatID}:{isFileMenuOpen:boolean; chatID:string}) => {
    const imageRef = useRef<HTMLInputElement>(null);
    const audioRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const selectImage = () => imageRef?.current?.click();
    const selectAudio = () => audioRef?.current?.click();
    const selectVideo = () => videoRef?.current?.click();
    const selectFile = () => fileRef?.current?.click();


    const fileChangeHandler = async(e:ChangeEvent<HTMLInputElement>, key:string) => {
        const files = Array.from(e.target.files!);

        if (files.length <= 0) return;

        if (files.length > 5) {
            console.log(`You can only send 5 ${key} at a time`);
            return;
        }

        dispatch(setUploadingLoader(true));

        // const toastID = toast.loading(`Sending ${key}...`)

        try {
            const myForm = new FormData();
            myForm.set("chatID", chatID);
            files.forEach((file) => {
                myForm.set("files", file);
            })

            const res = await fetch(`${server}/api/v1/message/new`, {
                method:"POST",
                credentials:"include",
                body:myForm
            });



            const data = res.json();

            console.log("----- FileMenuDialog  fileChangeHandler");
            console.log(data);
            console.log("----- FileMenuDialog  fileChangeHandler");
            
        } catch (error) {
            console.log(error);
            
            // toast.error(error, {id:toastID});
        }finally{
            dispatch(setUploadingLoader(false));
        }
    };
    
    return(
        <div className="file_menu_cont">
            <dialog className="file_menu_dialog" open={isFileMenuOpen}>
                <div className="icon_label" onClick={() => selectImage()}>
                    <BiImage /> Image <input type="file" multiple accept="image/jpeg, image/png, image/gif" style={{display:"none"}} onChange={(e) => fileChangeHandler(e, "Images")} ref={imageRef} />
                </div>
                
                <div className="icon_label" onClick={() => selectAudio()}>
                    <MdAudioFile /> Audio <input type="file" multiple accept="audio/mpeg, audio/wav" style={{display:"none"}} onChange={(e) => fileChangeHandler(e, "Audios")} ref={audioRef} />
                </div>

                <div className="icon_label" onClick={() => selectVideo()}>
                    <BiVideo /> Video <input type="file" multiple accept="video/mp4, video/webm, video/ogg" style={{display:"none"}} onChange={(e) => fileChangeHandler(e, "Videos")} ref={videoRef} />
                </div>

                <div className="icon_label" onClick={() => selectFile()}>
                    <BiFile /> File <input type="file" multiple accept="*" style={{display:"none"}} onChange={(e) => fileChangeHandler(e, "Files")} ref={fileRef} />
                </div>
            </dialog>
        </div>
    )
};

export default FileMenu;