import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginPopupOpen: false,
  loginRedirectUrl: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLoginPopup: (state, action) => {
      state.loginPopupOpen = true;
      if (action.payload?.returnUrl) {
        state.loginRedirectUrl = action.payload.returnUrl;
      }
    },
    closeLoginPopup: (state) => {
      state.loginPopupOpen = false;
    },
    setLoginRedirectUrl: (state, action) => {
      state.loginRedirectUrl = action.payload || null;
    },
  },
});

export const { openLoginPopup, closeLoginPopup, setLoginRedirectUrl } = uiSlice.actions;
export const selectLoginPopupOpen = (state) => state.ui.loginPopupOpen;
export const selectLoginRedirectUrl = (state) => state.ui.loginRedirectUrl;

export default uiSlice.reducer;


