import { createSlice } from '@reduxjs/toolkit'
const initialState = {
 currentUser:'asb@outlook.com',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {    
    Login: (state, action) => {
        state.currentUser = action.payload
    },
    Logout:(state,action)=>{
        state.currentUser = undefined
    }
  },
})

// Action creators are generated for each case reducer function
export const {Login,Logout } = userSlice.actions

export default userSlice