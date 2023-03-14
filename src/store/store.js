import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { moviesApiSlice } from "./features/moviesApiSlice";
import { newsApiSlice } from "./features/newsApiSlice";
import { userDataApi } from "./features/userDataSlice";

export const store = configureStore({
    reducer: {
        [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
        [newsApiSlice.reducerPath]: newsApiSlice.reducer,
        [userDataApi.reducerPath]: userDataApi.reducer,
    },
    middleware:
        (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([moviesApiSlice.middleware,
            newsApiSlice.middleware,
            userDataApi.middleware
            ]),
});

setupListeners(store.dispatch);