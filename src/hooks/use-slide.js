import  { useState } from "react";
import film1 from '../assets/images/film1.jpg';
// import film1 from '../assets/images/film1.jpg';

const movieData = [
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    },
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    },
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    },
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    },
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    },
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    },
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    },
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    },
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    },
    {
            title: "The Walk",
            img: film1,
            year: "2022",
            rating: "7.5"
    }
];


const useSlide = () => {
    const [scrollX, setScrollX] = useState(-400);

    const handleLeftArrow = () => {
            let x = scrollX + Math.round(Math.round(window.innerWidth / 2));

            if (x > 0) {
                    x = 0;
            }

            setScrollX(x);
    }

    const handleRightArrow = () => {
            let x = scrollX - Math.round(window.innerWidth / 2);

            let movie_card_width = 207;

            let listWidth = movieData.length * movie_card_width;

            if ((window.innerWidth - listWidth) > x) {
                    x = (window.innerWidth - listWidth);
            }

            setScrollX(x)
    }

    return {handleLeftArrow, handleRightArrow, scrollX, movieData}
};

export default useSlide;