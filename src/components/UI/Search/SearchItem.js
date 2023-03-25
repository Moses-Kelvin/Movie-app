import React from "react";
import "../../../styles/UI/Search/SearchItem.scss";

const SearchItem = ({title, img, overview}) => {
    return (
        <div className="searchItem">
            <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="" />
            <div>
                <h3>{`${title.slice(0,50)}...`}</h3>
                <p>{`${overview.slice(0,40)}...`}</p>
            </div>
        </div>
    )
};

export default SearchItem;