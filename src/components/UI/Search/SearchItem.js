import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/UI/Search/SearchItem.scss";

const SearchItem = ({ title, img, overview, id, setSearchIsVisible }) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        setSearchIsVisible(false);
        navigate(`/Movies/${id}`);
    };

    return (
        <div className="searchItem" onClick={() => handleClick(id)}>
            <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="" />
            <div>
                <h3>{`${title.slice(0, 50)}...`}</h3>
                <p>{`${overview.slice(0, 40)}...`}</p>
            </div>
        </div>
    )
};

export default SearchItem;