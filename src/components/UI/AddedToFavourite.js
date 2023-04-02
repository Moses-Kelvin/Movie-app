import React from "react";
import ReactDOM from "react-dom";
import "../../styles/UI/AddedToFavourite.scss";
import { BackDrop } from "./Search/SearchModal";

const PopUpmsg = ({addedToFav}) => {
    return (
        <div className="AddedToFavourite">
            <p>{addedToFav}</p>
        </div>
    )
};

const portalElement = document.getElementById("overlays");

const AddedToFavourite = ({ addedToFav }) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop className="popUp-backdrop" />, portalElement)}
            {ReactDOM.createPortal((<PopUpmsg addedToFav={addedToFav} />), portalElement)}
        </>
    );
};

export default AddedToFavourite;