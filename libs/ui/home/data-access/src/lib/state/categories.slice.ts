import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction
} from '@reduxjs/toolkit';

export const CATEGORIES_FEATURE_KEY = 'statecategories';

/*
 * Update these interfaces according to your requirements.
 */
export interface StatecategoriesEntity {
  id: number;
}

export interface StatecategoriesState extends EntityState<StatecategoriesEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | undefined;
}

export const statecategoriesAdapter = createEntityAdapter<StatecategoriesEntity>();

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
 *   dispatch(fetchStatecategories())
 * }, [dispatch]);
 * ```
 */
export const fetchStatecategories = createAsyncThunk(
  'statecategories/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getStatecategoriess()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialStatecategoriesState: StatecategoriesState = statecategoriesAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: undefined
});

export const statecategoriesSlice = createSlice({
  name: CATEGORIES_FEATURE_KEY,
  initialState: initialStatecategoriesState,
  reducers: {
    add: statecategoriesAdapter.addOne,
    remove: statecategoriesAdapter.removeOne
    // ...
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStatecategories.pending, (state: StatecategoriesState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchStatecategories.fulfilled, (state: StatecategoriesState, action: PayloadAction<StatecategoriesEntity[]>) => {
        statecategoriesAdapter.setAll(state, action.payload);
        state.loadingStatus = 'loaded';
      })
      .addCase(fetchStatecategories.rejected, (state: StatecategoriesState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  }
});

/*
 * Export reducer for store configuration.
 */
export const statecategoriesReducer = statecategoriesSlice.reducer;

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
 *   dispatch(statecategoriesActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const statecategoriesActions = statecategoriesSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllStatecategories);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = statecategoriesAdapter.getSelectors();

export const getStatecategoriesState = (rootState: any): StatecategoriesState => rootState[CATEGORIES_FEATURE_KEY];

export const selectAllStatecategories = createSelector(getStatecategoriesState, selectAll);

export const selectStatecategoriesEntities = createSelector(getStatecategoriesState, selectEntities);
