import {createSlice} from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    reloadUser :false,
  },

  reducers: {
    setUser: (state,action) => {
      state.user = action.payload;

    },
    


   
  },
});

export const { setUser } = UserSlice.actions;
