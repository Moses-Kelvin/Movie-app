import { createSlice } from "@reduxjs/toolkit";

 const FavouritePopUpSlice = createSlice({
    name: 'FavouritePopUp', 
    initialState: {
        message: ""
    },
    reducers: {
         showPopUpMsg:  (state, action) => {
          state.message = action.payload
         }
    }
});

export const { showPopUpMsg } = FavouritePopUpSlice.actions;

export default FavouritePopUpSlice;