import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/Cart/cartSlice";
import customerReducer from "./features/Customer/customerSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    customer: customerReducer,
  },
});
