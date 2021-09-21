import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction
} from '@reduxjs/toolkit';
import { Product } from 'libs/ui/data-storage/src/models/product';
import { getDataStorageInstance } from '@wawa-kiosk/ui/data-storage';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState extends EntityState<Product> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | undefined;
}

export const stateproductsAdapter = createEntityAdapter<Product>({
  selectId: (p) => p._id
});

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchProducts())
 * }, [dispatch]);
 * ```
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getStateproductss()`;
     * Right now we just return an empty array.
     */
    const ds = getDataStorageInstance();
    const products = await ds.getProducts();

    return Promise.resolve(products);
  }
);

export const initialStateproductsState: ProductsState = stateproductsAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: undefined
});

export const stateproductsSlice = createSlice({
  name: PRODUCTS_FEATURE_KEY,
  initialState: initialStateproductsState,
  reducers: {
    add: stateproductsAdapter.addOne,
    remove: stateproductsAdapter.removeOne
    // ...
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state: ProductsState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state: ProductsState, action: PayloadAction<Product[]>) => {
        stateproductsAdapter.setAll(state, action.payload);
        state.loadingStatus = 'loaded';
      })
      .addCase(fetchProducts.rejected, (state: ProductsState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  }
});

/*
 * Export reducer for store configuration.
 */
export const productsReducer = stateproductsSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(stateproductsActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const stateproductsActions = stateproductsSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllStateproducts);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = stateproductsAdapter.getSelectors();

export const getStateproductsState = (rootState: any): ProductsState => rootState[PRODUCTS_FEATURE_KEY];

export const selectAllStateproducts = createSelector(getStateproductsState, selectAll);

export const selectStateproductsEntities = createSelector(getStateproductsState, selectEntities);
