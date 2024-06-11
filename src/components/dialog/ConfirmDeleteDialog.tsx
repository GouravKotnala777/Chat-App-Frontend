import { MouseEvent, ReactEventHandler } from "react";
import "../../styles/dialog/confirm-delete-dialog.scss";


const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}:{open:boolean; handleClose:(e:MouseEvent<HTMLDivElement|HTMLButtonElement|HTMLDialogElement>|ReactEventHandler<HTMLDialogElement>) => void; deleteHandler:(e:MouseEvent<HTMLButtonElement>) => void;}) => {


    return(
        <div id="confirm_delete_dialog_cont" className="confirm_delete_dialog_cont" onClick={handleClose}>
            <dialog className="confirm_delete_dialog" open={open}>
                <div className="dialog_title">Confirm Delete</div>
                <div className="dialog_content">Are you sure you want to delete this group</div>
                <div className="dialog_btns">
                    <button className="cancell_btn" onClick={handleClose}>No</button>
                    <button className="ok_btn" onClick={deleteHandler}>Yes</button>
                </div>
            </dialog>
        </div>
    )
};

export default ConfirmDeleteDialog;