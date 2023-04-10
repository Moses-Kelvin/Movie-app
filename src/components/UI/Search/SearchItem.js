import React from "react";
import  { useNavigate } from "react-router-dom";
import "../../../styles/UI/Search/SearchItem.scss";

const SearchItem = ({ title, img, overview, id, setSearchIsVisible, filteredTerm}) => {

    const navigate = useNavigate();

    const handleClick = (id) => {
        setSearchIsVisible(false);
        navigate(`/${filteredTerm}/${id}`);
    };

    return (
        <div className="searchItem" onClick={() => handleClick(id)}>
            <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="" />
            <div>
                <h3>{title >=50 ? `${title.slice(0, 50)}...` : `${title.slice(0, 50)}`}</h3>
               {overview && <p>{`${overview.slice(0, 40)}...`}</p>}
            </div>
        </div>
    )
};

export default SearchItem;