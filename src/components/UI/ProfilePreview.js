import React from 'react';
import ReactDOM from "react-dom";
import Button from './Button';
import '../../styles/UI/ProfilePreview.scss';
import { BackDrop } from './Search/SearchModal';

const ProfilePreviewOverlay = ({ file, handleSubmit, onClose}) => {
    return (
        <div className="ProfilePreview">
            <img src={`${URL.createObjectURL(file)}`} alt='' />
            <div className="ProfilePreview-btns">
                <Button className="ProfilePreview-CancelBtn"
                    handleClick={onClose}>
                    Cancel
                </Button>
                <Button className="ProfilePreview-saveBtn"
                     handleClick={handleSubmit}>
                    Save
                </Button>
            </div>
        </div>
    )
}

const ProfilePreview = ({ file, handleSubmit, onClose }) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop />, document.getElementById("overlays"))}
            {ReactDOM.createPortal(<ProfilePreviewOverlay onClose={onClose} file={file}
            handleSubmit={handleSubmit} />,
                document.getElementById("overlays"))}
        </>
    )
};

export default ProfilePreview;