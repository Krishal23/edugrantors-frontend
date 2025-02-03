import { apiSlice } from "../api/apiSlice"

export const courseAPi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        getAllCourse: builder.query({
            query: () => ({
                url: "get-admin-courses",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getAllCourseNames: builder.query({
            query: () => ({
                url: "get-courses-name",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "PUT",
                credentials: "include" as const,
            })
        }),
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        addCoupon: builder.mutation({
            query: ({ id, data }) => ({
                url: `add-coupon/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),

        getUsersAllCourses: builder.query({
            query: () => ({
                url: `get-courses`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getCourseDetails: builder.query({
            query: (id) => ({
                url: `get-course/${id}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getCourseDetailsAdmin: builder.query({
            query: (id) => ({
                url: `get-course-admin/${id}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getCourseContent: builder.query({
            query: (id) => ({
                url: `get-course-content/${id}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        addNewQuestion: builder.mutation({
            query: ({ question, courseId, contentId }) => ({
                url: `add-question`,
                body: {
                    question,
                    courseId,
                    contentId
                },
                method: "PUT",
                credentials: "include" as const,
            })
        }),
        addAnswerInQuestion: builder.mutation({
            query: ({ answer, courseId, contentId, questionId }) => ({
                url: `add-answer`,
                body: {
                    answer,
                    courseId,
                    contentId,
                    questionId
                },
                method: "PUT",
                credentials: "include" as const,
            })
        }),
        getQuizzes: builder.query({
            query: (courseId) => ({
                url: `get-all-tests/${courseId}`,
                method: "GET",
                credentials: "include" as const,
            })

        }),
        getQuiz: builder.query({
            query: ({courseId,quizId}) => ({
                url: `get-test/${courseId}/${quizId}`,
                method: "GET",
                credentials: "include" as const,
            })

        }),
        
        attemptTest: builder.mutation({
            query: ({result} ) => ({
                url: `/attempt-test`,
                body: {
                     result
                },
                method: "PUT",
                credentials: "include" as const,
            })
        }),
        getTestReview: builder.query({
            query: ({courseId,quizId}) => ({
                url: `review-test/${courseId}/${quizId}`,
                method: "GET",
                credentials: "include" as const,
            })

        }),
        getTestDetailsAdmin: builder.query({
            query: ({courseId,quizId}) => ({
                url: `get-test-details/${courseId}/${quizId}`,
                method: "GET",
                credentials: "include" as const,
            })

        }),
        getCoupons: builder.query({
            query: ({courseId}) => ({
                url: `get-coupons/${courseId}`,
                method: "GET",
                credentials: "include" as const,
            })

        }),
        validateCoupon: builder.mutation({
            query: ({couponId,id}) => ({
                url: `/validate-coupon/${id}/${couponId}`,
                method: "PUT",
                credentials: "include" as const,
            })

        }),
        createTest: builder.mutation({
            query: ({ courseId, title, description, questions, duration, startTime, maxMarks }) => ({
                url: `/create-test/${courseId}`, // Ensure courseId is valid
                body: { title, description, questions, duration, startTime, maxMarks,isLive:false },
                method: "POST",
                credentials: "include",
              }),
              
        }),
        updateTest: builder.mutation({
            query: ({ quizId, courseId, title, description, questions, duration, startTime, maxMarks, isLive }) => {        
                return {
                    url: `/update-test/${courseId}/${quizId}`,
                    body: { title, description, questions, duration, startTime, maxMarks, isLive },
                    method: "PUT",
                    credentials: "include",
                };
            },
        }),
        
        deleteQuestion: builder.mutation({
            query: ({ quizId, courseId,questionId}) =>({
                    url: `/delete-question/${courseId}/${quizId}/${questionId}`,
                    method: "DELETE",
                    credentials: "include",
            }),
        }),
        toggleCoursePublicity: builder.mutation({
            query: ({  courseId}) =>({
                    url: `/toggle-course-public/${courseId}`,
                    method: "PUT",
                    credentials: "include",
            }),
        }),
        toggleCouponActive: builder.mutation({
            query: ({  courseId,couponId}) =>({
                    url: `/toggle-coupon-active/${courseId}/${couponId}`,
                    method: "PUT",
                    credentials: "include",
            }),
        }),
        
    }),
})
export const {
    useCreateCourseMutation,
    useToggleCoursePublicityMutation,
    useToggleCouponActiveMutation,
    useGetAllCourseQuery,
    useGetAllCourseNamesQuery,
    useDeleteCourseMutation,
    useEditCourseMutation,
    useGetUsersAllCoursesQuery,
    useGetCourseDetailsQuery,
    useGetCourseContentQuery,
    useAddNewQuestionMutation,
    useAddAnswerInQuestionMutation,
    useGetQuizzesQuery,
    useGetQuizQuery,
    useAttemptTestMutation,
    useGetTestReviewQuery,
    useCreateTestMutation,
    useGetTestDetailsAdminQuery,
    useUpdateTestMutation,
    useDeleteQuestionMutation,
    useAddCouponMutation,
    useGetCouponsQuery,
    useValidateCouponMutation,
    useGetCourseDetailsAdminQuery
} = courseAPi;