import React from "react";
import NewsType from "../components/News/NewsType";
import '../styles/Pages/News.scss';

const News = () => {
    const NewsClass = ["HEADLINES", "TOP STORIES", "TRENDING"];
    const TopStoriesNewsResult = JSON.parse(localStorage.getItem('TopStoriesNews'));

    return (
        <section className="News-section">
            <NewsType TopStoriesNewsData={TopStoriesNewsResult.articles} NewsHeader={NewsClass[0]} />
            <NewsType TopStoriesNewsData={TopStoriesNewsResult.articles} NewsHeader={NewsClass[1]} />
            <NewsType TopStoriesNewsData={TopStoriesNewsResult.articles} NewsHeader={NewsClass[2]} />
        </section>
    )
};

export default News;