'use client';
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

// Configure the Redux store
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Redux slice for API calls
        auth: authSlice, // Redux slice for authentication
    },
    devTools: false, // Disable devTools for production
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), // Add API middleware
});

// Function to refresh token and load user on every page load
const initializeApp = async () => {
    try {
        // Dispatch refresh token API call
        await store.dispatch(apiSlice.endpoints.refreshToken.initiate({forceRefetch : true}));
        //  load the user
        await store.dispatch(apiSlice.endpoints.loadUser.initiate({forceRefetch : true}));
    } catch (error) {
    console.error("Error during app initialization:", error);
}
};

// Initialize the application
initializeApp();
