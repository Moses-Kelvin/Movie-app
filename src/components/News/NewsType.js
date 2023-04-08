import React from "react";
import '../../styles/News/NewsType.scss';
import { Link, useLocation } from "react-router-dom";

const NewsType = ({ NewsHeader, TopStoriesNewsData }) => {

    const { pathname } = useLocation();
    const userOnNewsPage = pathname.includes('News');


    return (
        <section className="NewsType-section">
            <div className="NewsType-header">
                <h1>{NewsHeader}</h1>
                {!userOnNewsPage &&
                    <Link to="/News">
                        SEE ALL NEWS...
                    </Link>
                }
            </div>
            <div className="NewsType-body  horizontalScroll">
                {TopStoriesNewsData?.map((news, index) =>
                    <div className="News" key={index}>
                        <img src={news.urlToImage} alt="" />
                        <h2>{news.title}</h2>
                        <p>
                            {news.content?.slice(0, 85)}
                            <a href={news.url}><span>...seemore</span> </a>
                        </p>
                        <div className="NewsType-info">
                            <p>{news.source.name}</p>
                            <p>{new Date(news.publishedAt).toDateString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
};

export default NewsType;