import React from "react";
import ReactDOM from "react-dom";
import "../../styles/UI/AddedToFavourite.scss";
import { BackDrop } from "./Search/SearchModal";

const Message = ({popUpMsg}) => {
    return (
        <div className="AddedToFavourite">
            <p>{popUpMsg}</p>
        </div>
    )
};

const portalElement = document.getElementById("overlays");

const AddedToFavourite = ({ popUpMsg }) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop className="popUp-backdrop" />, portalElement)}
            {ReactDOM.createPortal((<Message popUpMsg={popUpMsg} />), portalElement)}
        </>
    );
};

export default AddedToFavourite;