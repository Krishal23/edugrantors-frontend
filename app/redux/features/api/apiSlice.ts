import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    credentials: "include",  // Include credentials globally if needed
  }),
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: () => ({
        url: "/refresh-token",
        method: "GET",
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
    
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          // Handle 401 Unauthorized and refresh logic
          if (error?.meta?.response?.status === 401) {
            try {
              const refreshResult = await dispatch(apiSlice.endpoints.refreshToken.initiate()).unwrap();
    
              if (refreshResult?.accessToken) {
                dispatch(
                  userLoggedIn({
                    accessToken: refreshResult.accessToken,
                    user: refreshResult.user,
                  })
                );
    
                // Retry the original request
                await dispatch(apiSlice.endpoints.loadUser.initiate());
              }
            } catch (refreshError) {
              console.error("Token refresh failed:", refreshError);
            }
          } else {
            console.error("Error loading user:", error);
          }
        }
      },
    }),
    
  }),
});

// Export hooks for usage in components
export const { useRefreshTokenMutation, useLoadUserQuery } = apiSlice;
