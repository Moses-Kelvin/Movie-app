import React from "react";
import interceptor from "../../../assets/images/interceptor.jpg";
import "../../../styles/UI/Search/SearchItem.scss";

const SearchItem = () => {
    return (
        <div className="searchItem">
            <img src={interceptor} />
            <div>
                <h3>interceptor</h3>
                <p>When M which tends to bring the ship back to its upright position...</p>
            </div>
        </div>
    )
};

export default SearchItem;