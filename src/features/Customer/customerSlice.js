import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  phoneNo: "",
  address: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createName(state, action) {
      state.name = action.payload;
    },
    createPhoneNo(state, action) {
      state.phoneNo = action.payload;
    },
    createAddress(state, action) {
      state.address = action.payload;
    },
  },
});

export const { createName, createPhoneNo, createAddress } =
  customerSlice.actions;
export default customerSlice.reducer;
