import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import generalReducer from "./generalSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    products: productReducer,
    general: generalReducer,
    user: userReducer,
  },
});
