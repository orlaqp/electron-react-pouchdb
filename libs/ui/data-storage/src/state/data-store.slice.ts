import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DbConfig } from '../interfaces';
import { initializeDataStorage } from '../services/db.service';

export type DataStorageSyncStatus = 'new' | 'syncing' | 'completed' | 'error';

export interface DataStoreState {
    contentStatus: DataStorageSyncStatus;
}

const initialState: DataStoreState = {
    contentStatus: 'new'
}

export const setupContentSync = createAsyncThunk(
    'dataStore/status',
    (dbConfig: DbConfig, thunkAPI) => {
        const instance = initializeDataStorage(dbConfig);
        return instance.processContentReplication();
    }
);

export const dataStoreSlide = createSlice({
    name: 'dataStore',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(setupContentSync.pending, (state) => {
            state.contentStatus = 'syncing'
        }),
        builder.addCase(setupContentSync.rejected, (state) => {
            state.contentStatus = 'error'
        }),
        builder.addCase(setupContentSync.fulfilled, (state) => {
            state.contentStatus = 'completed'
        })
    }
});

export const dataStoreReducer = dataStoreSlide.reducer;
export const dataStoreActions = dataStoreSlide.actions;
// selectors
export const contentStatusSelector = (state: any) => state.dataStore.contentStatus;
