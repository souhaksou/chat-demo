import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: true,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setShow: (state, action) => {
      state.isShow = action.payload;
    },
  },
});

export const { setShow } = sidebarSlice.actions;

export default sidebarSlice.reducer;
