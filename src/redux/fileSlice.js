import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'files',
  initialState: [],
  reducers: {
    setFiles: (_, action) => action.payload,
  },
});

export const { setFiles } = fileSlice.actions;
export default fileSlice.reducer;