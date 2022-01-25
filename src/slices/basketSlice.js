import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket", //name of slice
  initialState,
  reducers: {
    // Actions
    // to add in basket
    addToBasket: (state, action) => {
      // ...state.items >>> it will store the previous one also and action.payload >>> also store the new action
      state.items = [...state.items, action.payload]
    },

    // to remove from basket
    removeFromBasket: (state, action) => {
      // to remove item...

      // taking the index of the item which we want to remove
      // findIndex() >> will give the index
      // each item will be compare with action.payload.id (means the product which we click)
      // index var contain the index of the product and if the product is not present then it will return -1
      const index = state.items.findIndex((basketItem) => basketItem.id == action.payload.id)

      // creating the copy of basket
      let newBasket = [...state.items]

      // index var contain the index of the product and if the product is not present then it will return -1
      if (index >= 0) {
        // the item exist in the basket will remove using splice function
        newBasket.splice(index, 1)
      }


      // updating the state.items after removing the item
      state.items = newBasket

    },
  },
});

// exported our action so that to use in our app
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

// to calculate total using reduce function

// we use reduce to iterated over items.

// total >>  variable use to store values
// item >> each item
// total + item.price >> for each item it will calculate the sum and store it in total
// 0 >> initial total value is 0

// reduce((total, item))
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
