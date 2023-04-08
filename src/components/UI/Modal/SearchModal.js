import React, { useCallback, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import '../../../styles/UI/Modal/SearchModal.scss';
import { Cancel, KeyboardBackspace, Search } from '@mui/icons-material';
import InputField from "../InputField";
import SearchItem from "../Search/SearchItem";
import Button from "../Button";
import SearchSpinner from "../Spinners/SearchSpinner";
import { TMDB_API_KEY } from "../../../config";


export const BackDrop = ({ className, handleClick }) => {
    return <div className={`backdrop ${className}`} onClick={handleClick}></div>
};


const SearchModalOverlay = ({ setSearchIsVisible }) => {

    const [result, setResult] = useState([]);
    const [filteredTerm, setFilteredTerm] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const searchRef = useRef();

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const handleChange = async (value) => {
        setIsLoading(true);
        try {
            const filter = searchRef.current.textContent.trim();
            const res = await fetch(`https://api.themoviedb.org/3/search/${filter}?api_key=${TMDB_API_KEY}&query=${value}`);
            if (!res.ok) {
                throw new Error("No Result Found");
            }
            const result = await res.json();
            setResult(result.results);
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
        setIsLoading(false);
    };


    const optimizedFn = useCallback(debounce(handleChange), []);


    useEffect(() => {
        if (searchTerm && filteredTerm) {
            optimizedFn(searchTerm);
        }
    }, [searchTerm, filteredTerm, optimizedFn]);

    const searchOption = (
        <div className="searchOption">
            {filteredTerm && <div className="filtered-term">
                <span ref={searchRef} > {filteredTerm} </span>
                <Cancel />
            </div>}
            <p>Search from:</p>
            <div className="searchOption-btn">
                <Button
                    handleClick={() => setFilteredTerm("movie")}
                    className={filteredTerm === "movie" ? "active-filter" : "inactive-filter"}>
                    Movies
                </Button>
                <Button
                    handleClick={() => setFilteredTerm("tv")}
                    className={filteredTerm === "tv" ? "active-filter" : "inactive-filter"}>
                    TvShows
                </Button>
            </div>
        </div>
    )

    return (
        <div className="searchModal scroller">
            <div>
                <KeyboardBackspace onClick={() => setSearchIsVisible(false)} />
                <InputField className='searchInput'
                    placeholder="Search for a movie"
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    iconStart={<Search sx={{ color: 'white' }} />}
                    textColor='white' Width='100%' />
            </div>
            {searchOption}
            <div className="searchModal-container">
                <div className="searchItems">
                    {
                        !isLoading && !error && result.length > 0 && result.map((data, id) => (
                            <SearchItem
                                key={id}
                                title={data.title || data.name}
                                id={data.id}
                                overview={data.overview}
                                img={data.poster_path}
                                setSearchIsVisible={setSearchIsVisible}
                                filteredTerm={filteredTerm}
                            />
                        ))
                    }
                    {isLoading && <SearchSpinner/>}
                    {error && !isLoading && <h3 className="error">{error}</h3>}
                </div>
            </div>
        </div>
    )
};

const portalElement = document.getElementById("overlays");

const SearchModal = ({ setSearchIsVisible }) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop />, portalElement)}
            {ReactDOM.createPortal((<SearchModalOverlay setSearchIsVisible={setSearchIsVisible} />), portalElement)}
        </>
    );
};

export default SearchModal;