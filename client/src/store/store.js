import { configureStore } from '@reduxjs/toolkit'
import cartSlice from "../store/cartSlice.js"
import userSlice from "../store/userSlice.js"
const store = configureStore({
  reducer: {
    cart:cartSlice.reducer,
    user:userSlice.reducer
  },
})

export default store;