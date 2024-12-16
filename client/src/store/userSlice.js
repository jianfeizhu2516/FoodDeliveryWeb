import { createSlice } from '@reduxjs/toolkit'
const initialState = {
 currentUser: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {    
    userLogin: (state, action) => {
        state.currentUser = action.payload
    },
    userLogout:(state,action)=>{
        state.currentUser = undefined
    }
  },
})

// Action creators are generated for each case reducer function
export const {userLogin,userLogout } = userSlice.actions

export default userSlice