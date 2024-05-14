// import { MutableRefObject } from "react";
import "../../styles/dialog/file-menu.dialog.scss";

const FileMenu = ({isAttachmentMenuOpen}:{isAttachmentMenuOpen:boolean}) => {

    
    return(
        <div className="file_menu_cont">
            <dialog className="file_menu_dialog" open={isAttachmentMenuOpen}>
                File Menu
            </dialog>
        </div>
    )
};

export default FileMenu;