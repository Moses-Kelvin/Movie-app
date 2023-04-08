import React from "react";
import ReactDOM from "react-dom";
import "../../../styles/UI/Modal/PopUp.scss";
 import { BackDrop } from "./SearchModal";

const Message = ({popUpMsg}) => {
    return (
        <div className="AddedToFavourite">
            <p>{popUpMsg}</p>
        </div>
    )
};

const portalElement = document.getElementById("overlays");

const PopUp = ({ popUpMsg }) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop className="popUp-backdrop" />, portalElement)}
            {ReactDOM.createPortal((<Message popUpMsg={popUpMsg} />), portalElement)}
        </>
    );
};

export default PopUp;