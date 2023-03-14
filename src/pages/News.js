import React from "react";
import img1 from '../assets/images/img1.jpg'
import NewsType from "../components/News/NewsType";
import '../styles/Pages/News.scss';

const data = [
    {
        img: img1,
        title: "Barbara walters, television news trailblazer, dies at 93",
        description:
            "NEW YORK (AP) - Barbara Walters, the intrepid interviewer, anchor and program host who led the way as the first woman to become a TV news superstar during a network career remarkable for its duration and variety, has died.",
        published_at: "5 hours ago",
        source: "apnews.com"
    },
    {
        img: img1,
        title: "Barbara walters, television news trailblazer, dies at 93",
        description:
            "NEW YORK (AP) - Barbara Walters, the intrepid interviewer, anchor and program host who led the way as the first woman to become a TV news superstar during a network career remarkable for its duration and variety, has died.",
        published_at: "5 hours ago",
        source: "apnews.com"
    },
    {
        img: img1,
        title: "Barbara walters, television news trailblazer, dies at 93",
        description:
            "NEW YORK (AP) - Barbara Walters, the intrepid interviewer, anchor and program host who led the way as the first woman to become a TV news superstar during a network career remarkable for its duration and variety, has died.",
        published_at: "5 hours ago",
        source: "apnews.com"
    },
    {
        img: img1,
        title: "Barbara walters, television news trailblazer, dies at 93",
        description:
            "NEW YORK (AP) - Barbara Walters, the intrepid interviewer, anchor and program host who led the way as the first woman to become a TV news superstar during a network career remarkable for its duration and variety, has died.",
        published_at: "5 hours ago",
        source: "apnews.com"
    },
    {
        img: img1,
        title: "Barbara walters, television news trailblazer, dies at 93",
        description:
            "NEW YORK (AP) - Barbara Walters, the intrepid interviewer, anchor and program host who led the way as the first woman to become a TV news superstar during a network career remarkable for its duration and variety, has died.",
        published_at: "5 hours ago",
        source: "apnews.com"
    },
    {
        img: img1,
        title: "Barbara walters, television news trailblazer, dies at 93",
        description:
            "NEW YORK (AP) - Barbara Walters, the intrepid interviewer, anchor and program host who led the way as the first woman to become a TV news superstar during a network career remarkable for its duration and variety, has died.",
        published_at: "5 hours ago",
        source: "apnews.com"
    },
    {
        img: img1,
        title: "Barbara walters, television news trailblazer, dies at 93",
        description:
            "NEW YORK (AP) - Barbara Walters, the intrepid interviewer, anchor and program host who led the way as the first woman to become a TV news superstar during a network career remarkable for its duration and variety, has died.",
        published_at: "5 hours ago",
        source: "apnews.com"
    },
    {
        img: img1,
        title: "Barbara walters, television news trailblazer, dies at 93",
        description:
            "NEW YORK (AP) - Barbara Walters, the intrepid interviewer, anchor and program host who led the way as the first woman to become a TV news superstar during a network career remarkable for its duration and variety, has died.",
        published_at: "5 hours ago",
        source: "apnews.com"
    }
];

const News = () => {
    let NewsClass = ["HEADLINES", "TOP STORIES", "TRENDING"]
    return (
        <section className="News-section">
        <NewsType data={data} NewsClass={NewsClass[0]} />
        <NewsType data={data} NewsClass={NewsClass[1]} />
        <NewsType data={data} NewsClass={NewsClass[2]} />
    </section>
    )
};

export default News;