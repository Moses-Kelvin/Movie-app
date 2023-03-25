import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import '../../../styles/UI/Search/SearchModal.scss';
import { KeyboardBackspace, Search } from '@mui/icons-material';
import InputField from "../InputField";
import SearchItem from "./SearchItem";
import { async } from "@firebase/util";


export const BackDrop = () => {
    return <div className="backdrop"></div>
};


const SearchModalOverlay = ({ setSearchIsVisible }) => {

    const [suggestions, setSuggestions] = useState("");

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

    const api_key = "6907e99bdedc5dda9e7f9f8052111610";

    const handleChange = (value) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${value}`).then(
            (res) => res.json()).then((json) =>  setSuggestions(json.results))
    };
    

    const optimizedFn = useCallback(debounce(handleChange), []);

    return (
        <div className="searchModal scroller">
            <div>
                <KeyboardBackspace onClick={() => setSearchIsVisible(false)} />
                <InputField className='searchInput'
                    placeholder="Search for a movie"
                    type="text"
                    id="standard-basic"
                    variant="standard"
                    onChange={(e) => optimizedFn(e.target.value)}
                    iconStart={<Search sx={{ color: 'white' }} />}
                    textColor='white' Width='100%' />
            </div>
            {suggestions.length > 0 &&
                <div className="searchItems">
                    {
                        suggestions.map((el, id) => (
                            <SearchItem
                                key={id}
                                title={el.title}
                                overview={el.overview}
                                img={el.poster_path}
                            />
                        ))
                    }
                </div>
            }
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