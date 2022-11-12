import {createSlice} from "@reduxjs/toolkit";

const initial = {
  columns: {},
  columnOrder: [],
};

const broadSlice = createSlice({
  name: "broad",
  initialState: {
    data: initial,
  },
  reducers: {
    setDataBroad: (state, actions) => {
      state.data = actions.payload;
    },
    setItemBroad: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const {setDataBroad, setItemBroad} = broadSlice.actions;
export default broadSlice.reducer;
