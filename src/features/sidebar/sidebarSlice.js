import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pcShow: true,
  phoneShow: false
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setPcShow: (state, action) => {
      state.pcShow = action.payload;
    },
    setPhoneShow: (state, action) => {
      state.phoneShow = action.payload;
    },
  },
});

export const { setPcShow, setPhoneShow } = sidebarSlice.actions;

export default sidebarSlice.reducer;
