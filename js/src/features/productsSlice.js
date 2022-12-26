// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import ProductService from "../services/ProductService";

// const initialState = [];

// export const createProduct = createAsyncThunk(
//   "product/create",
//   async ({ title, description }) => {
//     const res = await ProductService.create({ title, description });
//     return res.data;
//   }
// );

// export const retrieveProducts = createAsyncThunk(
//   "products/read",
//   async () => {
//     const res = await ProductService.getAll();
//     return res.data;
//   }
// );

// export const updateProduct = createAsyncThunk(
//   "products/update",
//   async ({ id, data }) => {
//     const res = await ProductService.update(id, data);
//     return res.data;
//   }
// );

// export const deleteProduct = createAsyncThunk(
//     "products/delete",
//     async ({ id }) => {
//         await ProductService.remove(id);
//         return { id };
//     }
// );

// export const deleteAllProducts = createAsyncThunk(
//   "products/deleteAll",
//   async () => {
//     const res = await ProductService.removeAll();
//     return res.data;
//   }
// );

// export const findProductsByTitle = createAsyncThunk(
//   "products/findByTitle",
//   async ({ title }) => {
//     const res = await ProductService.findByTitle(title);
//     return res.data;
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     [createProduct.fulfilled]: (state, action) => {
//       state.push(action.payload);
//     },
//     readProducts : (state, action) => {
//         return [...action.payload];
//     },
//     [updateProduct.fulfilled]: (state, action) => {
//       const index = state.findIndex(product => product.id === action.payload.id);
//       state[index] = {
//         ...state[index],
//         ...action.payload,
//       };
//     },
//     [deleteProduct.fulfilled]: (state, action) => {
//       let index = state.findIndex(({ id }) => id === action.payload.id);
//       state.splice(index, 1);
//     },
//     [deleteAllProducts.fulfilled]: (state, action) => {
//       return [];
//     },
//     [findProductsByTitle.fulfilled]: (state, action) => {
//       return [...action.payload];
//     },
//   },
// });

// const { reducer } = productsSlice;
// export default reducer;

import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    createProduct: (state, action) => {
      for (const key in action.payload) {
        state.products[key] = action.payload[key];
      }
    },
    readProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteProduct: (state, action) => {
      delete state.products[action.payload];
    },
  },
});

export const { readProducts, deleteProduct, createProduct, logout } = productsSlice.actions;

// selectors
export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;
