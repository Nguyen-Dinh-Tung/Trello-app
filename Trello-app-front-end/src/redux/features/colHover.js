import {createSlice} from "@reduxjs/toolkit";

const colHoverSlice = createSlice({
  name: "colHover",
  initialState: {
    column: {},
    idItemTarget: "",
  },
  reducers: {
    setColHover: (state, actions) => {
      state.column = actions.payload;
    },
    setIdItemTarget: (state, actions) => {
      state.idItemTarget = actions.payload;
    },
  },
});
export const {setColHover, setIdItemTarget} = colHoverSlice.actions;
export default colHoverSlice.reducer;
