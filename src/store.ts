import authSlice from "./slice/auth.slice";
import alertSlice from "./slice/alert.slice";
import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "./services/category.services";
import { authApi } from "./services/auth.services";
import { productApi } from "./services/product.services";
import { dashboardApi } from "./services/dashboard.services";
import { bannerApi } from "./services/banner.services";
import { profileApi } from "./services/profile.services";
import { orderApi } from "./services/order.services";

const store = configureStore({
    reducer: {
        auth:authSlice,
        alert:alertSlice,
        [authApi.reducerPath]:authApi.reducer,
        [categoryApi.reducerPath]:categoryApi.reducer,
        [productApi.reducerPath]:productApi.reducer,
        [dashboardApi.reducerPath]:dashboardApi.reducer,
        [bannerApi.reducerPath]:bannerApi.reducer,
        [profileApi.reducerPath]:profileApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer
    },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        authApi.middleware,
        categoryApi.middleware,
        productApi.middleware,
        dashboardApi.middleware,
        bannerApi.middleware,
        profileApi.middleware,
        orderApi.middleware
     ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;