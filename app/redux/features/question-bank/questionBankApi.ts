import { apiSlice } from "../api/apiSlice"

export const questionBankApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadQuestion: builder.mutation({
            query: (data) => ({
                url: "upload-question",
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        editQuestion: builder.mutation({
            query: (data) => {
                return {
                    url: "edit-question",
                    method: "PUT",
                    body: data,
                    credentials: "include" as const,
                };
            },
        }),
        
        getAllQuestion: builder.query({
            query: () => ({
                url: "get-all-questions",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        deleteQuestion: builder.mutation({
            query: (questionId) => ({
                url: `delete-question/${questionId}`,
                method: "Delete",
                body: questionId,
                credentials: "include" as const,
            })
        }),
        
        
    }),
})
export const {
    useUploadQuestionMutation,
    useGetAllQuestionQuery,
    useDeleteQuestionMutation,
    useEditQuestionMutation
    
    
} = questionBankApi;