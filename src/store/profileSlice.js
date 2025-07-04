import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
  image: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.name = action.payload.name || '';
      state.email = action.payload.email || '';
      state.phoneNumber = action.payload.phoneNumber || '';
      if (action.payload.image !== undefined) {
        state.image = action.payload.image;
      }
    },
    clearProfile: (state) => {
      state.name = '';
      state.email = '';
      state.phoneNumber = '';
      state.image = '';
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
