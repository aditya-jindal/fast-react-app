import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      return [
        ...state,
        { ...action.payload, qty: 1, totalPrice: action.payload.unitPrice },
      ];
    },
    changeQty: {
      prepare(menuItem, val) {
        return { payload: { id: menuItem.id, val } };
      },
      reducer(state, action) {
        const itemIndex = state.findIndex(
          (cartItem) => cartItem.id === action.payload.id,
        );
        const updatedQty = state[itemIndex].qty + action.payload.val;
        if (updatedQty === 0) state.splice(itemIndex, 1);
        else {
          state[itemIndex] = {
            ...state[itemIndex],
            qty: updatedQty,
            totalPrice: state[itemIndex].unitPrice * updatedQty,
          };
        }
      },
    },
    deleteItem(state, action) {
      state.splice(
        state.findIndex((cartItem) => cartItem.id === action.payload.id),
        1,
      );
    },
    clearCart(state, action) {
      return initialState;
    },
  },
});

export const { addToCart, changeQty, deleteItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
