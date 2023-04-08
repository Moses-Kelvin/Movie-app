import { createSlice } from "@reduxjs/toolkit";

 const FavouriteSlice = createSlice({
    name: 'Favourite', 
    initialState: {
        message: "",
        isFav: false
    },
    reducers: {
         showPopUpMsg:  (state, action) => {
          state.message = action.payload
         },
         addBumpToFav: (state, action) => {
            state.isFav = action.payload
         }
    }
});

export const { showPopUpMsg, addBumpToFav } = FavouriteSlice.actions;

export default FavouriteSlice;