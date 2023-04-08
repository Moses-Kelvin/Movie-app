import React from "react";
import NewsType from "../components/News/NewsType";
import '../styles/Pages/News.scss';
import { useGetTopStoriesNewsQuery } from "../store/features/newsApiSlice";

const News = () => {
    const NewsClass = ["HEADLINES", "TOP STORIES", "TRENDING"];
    const { data: TopStoriesNews } = useGetTopStoriesNewsQuery();
    

    const newsLength = TopStoriesNews?.articles.length;
    const newsSplit = Math.floor(newsLength / 3);



    return (
        <section className="News-section">
            <NewsType TopStoriesNewsData={TopStoriesNews?.articles.slice(0, newsSplit)} NewsHeader={NewsClass[0]} />
            <NewsType TopStoriesNewsData={TopStoriesNews?.articles.slice(2, newsSplit)} NewsHeader={NewsClass[1]} />
            <NewsType TopStoriesNewsData={TopStoriesNews?.articles.slice(4, newsSplit)} NewsHeader={NewsClass[2]} />
        </section>
    )
};

export default News;