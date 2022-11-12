import {createSlice} from "@reduxjs/toolkit";

const showModalSlice = createSlice({
  name: "isShowModal",
  initialState: {
    isShowModal: "none",
    isShowMenudivider: "none",
    isShowEditTitleColumn: false,
    isShowModalItem: false,
    isShowWorkSpace: [],
    flag: "",
    isIdWorkSpace: "",
    isShowModalDetailsItem: false,
  },
  reducers: {
    setIdWorkSpace: (state, actions) => {
      state.isIdWorkSpace = actions.payload;
    },
    setFlag: (state, actions) => {
      state.flag = actions.payload;
    },

    setShowWorkSpace: (state, actions) => {
      state.isShowWorkSpace = actions.payload;
    },
    setShowModal: (state, actions) => {
      state.isShowModal = actions.payload;
    },
    setShowMenuDivider: (state, actions) => {
      state.isShowMenudivider = actions.payload;
    },
    setShowModalEditTitleColumn: (state, actions) => {
      state.isShowEditTitleColumn = actions.payload;
    },
    setShowModalItem: (state, action) => {
      state.isShowModalItem = action.payload;
    },
    setShowModalDetailItem: (state, action) => {
      state.isShowModalDetailsItem = action.payload;
    },
  },
});
export const {
  setShowModal,
  setShowMenuDivider,
  setShowModalEditTitleColumn,
  setShowModalItem,
  setShowWorkSpace,
  setFlag,
  setIdWorkSpace,
  setShowModalDetailItem,
} = showModalSlice.actions;
export default showModalSlice.reducer;
