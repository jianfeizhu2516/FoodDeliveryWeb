import { createSlice } from '@reduxjs/toolkit'
// const items = localStorage.getItem("cartItems") !== null
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];
const items = []
const initialState = {
  cartItems: items,
  totalQuantity: 0,
  subTotal: 0,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    
      subtractCartItem: (state,action) => {
      state.totalQuantity -= 1;

      const newItem = action.payload;

      const existingItem = state.cartItems.find(item => item.id == newItem.id);

      existingItem.quantity -= 1;

      state.subTotal -= newItem.price;

      if(existingItem.quantity === 0){
        state.cartItems = state.cartItems.filter(item=>item.id != newItem.id);
      }
    },
    
    addItemToCart: (state, action) => {
      state.totalQuantity += 1
   
      const newItem = action.payload;
      console.log('newItem是',newItem)
      state.subTotal += newItem.price;

      const existingItem = state.cartItems.find(item => item.title == newItem.title)
      if (existingItem) {
        existingItem.quantity += 1;
      }
      else {
        state.cartItems.push(
          {
            id: newItem.id,
            title: newItem.title,
            price: newItem.price,
            imgUrl: newItem.img.data.attributes.url,
            category: newItem.category,
            quantity:1
          }
        )
      }

    },





  },
})

// Action creators are generated for each case reducer function
export const {addItemToCart,subtractCartItem } = cartSlice.actions

export default cartSlice