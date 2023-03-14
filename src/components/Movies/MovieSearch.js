import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import '../../styles/Movies/MovieSearch.scss';
import Button from "../UI/Button";
import InputField from "../UI/InputField";

const MovieSearch = () => {

    const handleChange = () => {

    };

    return (
        <section className="MovieSearch-section">
            <div>
                <h2>Search for a movie</h2>
            </div>
            <div className="MovieSearch-card">
                <form className="MovieSearch-form">
                    <InputField
                        id="standard-basic"
                        label="Enter name"
                        textColor="white"
                        className="MovieSearch-input"
                        Width='100%'
                        variant="filled" />
                    <FormControl className="MovieSearch-formControl">
                        <InputLabel variant="filled" id="demo-simple-select-label">Select Genre</InputLabel>
                        <Select variant="filled"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value="genre"
                            label="Genre"
                            onChange={handleChange}>
                            <MenuItem value="jjj">Adventure</MenuItem>
                            <MenuItem value="uuu">Action</MenuItem>
                            <MenuItem value="jjj">Horror</MenuItem>
                            <MenuItem value="yuu">Drama</MenuItem>
                            <MenuItem value="jjj">Sci-fi</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl  className="MovieSearch-formControl">
                        <InputLabel variant="filled" id="demo-simple-select-label">Ratings Range</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value="genre"
                            label="Ratings Range"
                            onChange={handleChange}>
                            <MenuItem value="">0 - 3</MenuItem>
                            <MenuItem value="">4 - 7</MenuItem>
                            <MenuItem value="">8 - 10</MenuItem>
                        </Select>
                    </FormControl>
                    <Button className="MovieSearch-btn">Submit</Button>
                </form>
            </div>
        </section>
    )
};

export default MovieSearch;