import { apiSlice } from "../api/apiSlice"

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-user-avatar",
                method: "PUT",
                body: avatar,
                credentials: "include" as const
            })

        }),
        editProfile: builder.mutation({
            query: ({ name, contactNumber, classes, stream, targetYear, gender }) => ({
                url: "update-user-info",
                method: "PUT",
                body: { 
                    name, 
                    contactNumber, 
                    classes, 
                    stream, 
                    targetYear, 
                    gender 
                },
                credentials: "include" as const
            })

        }),
        updatePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "update-user-password",
                method: "PUT",
                body: {
                    oldPassword,
                    newPassword
                },

                credentials: "include" as const
            })

        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "get-users",
                method: "GET",
                credentials: "include" as const
            })

        }),
        getUserData: builder.query({
            query: ({id}) => ({
                url: `get-user/${id}`,
                method: "GET",
                credentials: "include" as const
            })

        }),
        getEnrolledUsers: builder.query({
            query: (id) => ({
                url: `enrolled-users/${id}`,
                method: "GET",
                credentials: "include" as const
            })

        }),
        getEnrolledCourses: builder.query({
            query: () => ({
                url: `enrolled-courses`,
                method: "GET",
                credentials: "include" as const
            })

        }),
        getOTPVerify: builder.mutation({
            query: ({userName,userEmail}) => ({
                url: "sent-verification-mail",
                method: "POST",
                body: {
                    userName,
                    userEmail
                },
                credentials: "include" as const
            })

        }),
        userExist: builder.mutation({
            query: (email) => ({
                url: "user-exist",
                method: "PUT",
                body: {
                    email,
                    
                },
                credentials: "include" as const
            })

        }),
        forgotPasswordUpdate: builder.mutation({
            query: ({userId}) => ({
                url: "forgot-password",
                method: "POST",
                body: {
                    userId
                },
                credentials: "include" as const
            })

        }),
        updateUserRole: builder.mutation({
            query: ({ id, role }) => ({
                url: "update-user",
                method: "PUT",
                body: { id,role },
                credentials: "include" as const
            })

        }),
        unEnrollUser: builder.mutation({
            query: ({ userId, courseId }) => ({
                url: "unenroll-user",
                method: "PUT",
                body: { userId,courseId },
                credentials: "include" as const
            })

        }),

    })
});
export const { useUpdateAvatarMutation, useUnEnrollUserMutation, useEditProfileMutation, useUpdatePasswordMutation,  useGetAllUsersQuery,useGetUserDataQuery, useGetEnrolledUsersQuery, useGetEnrolledCoursesQuery, useGetOTPVerifyMutation,useUserExistMutation,useForgotPasswordUpdateMutation,useUpdateUserRoleMutation } = userApi;


