import {configureStore} from "@reduxjs/toolkit";
import isShowModalReducer from "../redux/features/showModal.slice";
import broadReducer from "../redux/features/broad.slice";
import colHoverReducer from "../redux/features/colHover";
export const store = configureStore({
  reducer: {
    isShowModal: isShowModalReducer,
    broad: broadReducer,
    colHover: colHoverReducer,
  },
});
export default store;
