import React from "react";
import ReactDOM from "react-dom";
import '../../../styles/UI/Search/SearchModal.scss';
import { KeyboardBackspace, Search } from '@mui/icons-material';
import InputField from "../InputField";
import SearchItem from "./SearchItem";


export const BackDrop = () => {
    return <div className="backdrop"></div>
};


const SearchModalOverlay = ({ setSearchIsVisible }) => {
    return (
        <div className="searchModal scroller">
            <div>
                <KeyboardBackspace onClick={() => setSearchIsVisible(false)} />
                <InputField className='searchInput'
                    placeholder="Search for a movie"
                    id="standard-basic"
                    variant="standard"
                    iconStart={<Search sx={{ color: 'white' }} />}
                    textColor='white' Width='100%' />
            </div>
            <div className="searchItems">
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
            </div>
            {/* <p>No Movie Found</p> */}
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