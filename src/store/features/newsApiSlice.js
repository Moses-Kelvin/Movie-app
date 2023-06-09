import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { THE_NEWS_API_KEY } from "../../config";



const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': THE_NEWS_API_KEY,
        'X-RapidAPI-Host': 'community-hacker-news-v1.p.rapidapi.com'
    }
};

export const newsApiSlice = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://community-hacker-news-v1.p.rapidapi.com/", options }),
    endpoints: (builder) => ({
        getTopStoriesNews: builder.query({
            query: () => `topstories.json?print=pretty`,
        }),
    }),
});

export const { useGetTopStoriesNewsQuery } = newsApiSlice