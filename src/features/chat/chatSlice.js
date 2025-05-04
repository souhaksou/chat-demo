import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatList: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
  },
});

export const { setChatList } = chatSlice.actions;

export default chatSlice.reducer;
