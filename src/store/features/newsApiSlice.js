import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = "a15c3c88ccda4d9ea78e65b050303c41";

export const newsApiSlice = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
    endpoints: (builder) => ({
        getTopStoriesNews: builder.query({
            query: () => `top-headlines?country=us&category=entertainment&apiKey=${api_key}`,
        }),
    }),
});

export const { useGetTopStoriesNewsQuery } = newsApiSlice