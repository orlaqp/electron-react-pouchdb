import { configureStore } from "@reduxjs/toolkit"
import { dataStoreReducer } from "@wawa-kiosk/ui/data-storage";
import { productsReducer } from '@wawa-kiosk/ui/home/data-access';

export const store = configureStore({
    reducer: {
        dataStore: dataStoreReducer,
        products: productsReducer
    },
  })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch