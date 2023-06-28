import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user:null
  },
  
  reducers: {
    loginuser: (state, action) => {
     
      state.user = action.payload;
    },
    logoutuser: (state) => {
      state.user = null;
    },
    
  },
 

});

export const { loginuser, logoutuser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
