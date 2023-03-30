import React from "react";
import ReactDOM from "react-dom";
import "../../styles/UI/AddedToFavourite.scss";
import { BackDrop } from "./Search/SearchModal";

const PopUpmsg = ({alreadyExist}) => {
    return (
        <div className="AddedToFavourite">
            <p>{`${alreadyExist ? "Movie already added to favourie" : "❤️ Added to favourite!"}`}</p>
        </div>
    )
};

const portalElement = document.getElementById("overlays");

const AddedToFavourite = ({ alreadyExist }) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop className="popUp-backdrop" />, portalElement)}
            {ReactDOM.createPortal((<PopUpmsg alreadyExist={alreadyExist} />), portalElement)}
        </>
    );
};

export default AddedToFavourite;