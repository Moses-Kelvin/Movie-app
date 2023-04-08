import React from "react";
import '../../../styles/UI/Spinners/CardSkeleton.scss';

const CardSkeleton = () => {
    return (
            <div className="CardSkeleton-loader">
                <div className="inner"></div>
            </div>
    )
}

export default CardSkeleton;
