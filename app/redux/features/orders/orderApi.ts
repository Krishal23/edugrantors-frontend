import { apiSlice } from "../api/apiSlice"

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: "get-orders",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        createOrder: builder.mutation({
            query: ({ amount, currency = "INR", receipt, notes }) => ({
                url: "/razorpay/create-order",
                method: "POST",
                credentials: "include" as const,
                body: { 
                    amount, 
                    currency, 
                    receipt, 
                    notes 
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        verifyResponse: builder.mutation({
            query: ({ paymentResponse }) => ({
                url: "/razorpay/create-order",
                method: "POST",
                credentials: "include" as const,
                body: JSON.stringify(paymentResponse),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        updateCourse: builder.mutation({
            query: ({courseId,courseName ,payment_info,couponCode }) => ({
                url: "create-order",
                method: "POST",
                credentials: "include" as const,
                body: {
                    courseId,
                    courseName,
                    payment_info,
                    couponCode
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
        
    }),
})
export const {
   useGetAllOrdersQuery,
   useCreateOrderMutation,
   useVerifyResponseMutation,
   useUpdateCourseMutation
} = ordersApi;