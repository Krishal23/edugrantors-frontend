import Loader from '@/app/components/Loader/Loader';
import { useDeleteQuestionMutation, useGetTestDetailsAdminQuery, useUpdateTestMutation } from '@/app/redux/features/courses/coursesApi';
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic';
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillPlusCircle } from 'react-icons/ai';
import { BiX } from 'react-icons/bi';
import { IoChevronBackCircle } from 'react-icons/io5'

const QuestionBank = dynamic(() => import('../../QuestionBank/QuestionBank'), {
    loading: () => <Loader message='Loading Question BANK...' />,
});
const QuestionCard = dynamic(() => import('@/app/components/Admin/Course/Quiz/QuestionCard'), {
    loading: () => <Loader message='Loading Question Card...' />,
});
const QuizDetailsPreview = dynamic(() => import('@/app/components/Admin/Course/Quiz/QuizDetailsPreview'), {
    loading: () => <Loader message='Loading Question Card...' />,
});


type Props = {
    courseId: any;
    quizId: any;
    isEdit?: boolean;
}

const QuizDetailsAdmin = ({
    courseId,
    quizId,
    isEdit
}: Props) => {
    const { theme } = useTheme();
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]); // Track selected questions


    const { data, refetch } = useGetTestDetailsAdminQuery({
        courseId,
        quizId,
    });

    const courseName=data?.courseName


    const [updateTest, { isSuccess, error }] = useUpdateTestMutation();
    const [deleteQuestion] = useDeleteQuestionMutation();

    const [isFabClicked, setIsFabClicked] = useState(false); // To toggle FAB options
    const [isPopupOpen, setIsPopupOpen] = useState(false); // To control popup visibility

    const handleFabClick = () => {
        setIsFabClicked((prev) => !prev);
    };

    // Handle Add Question option click
    const handleAddQuestionClick = () => {
        setIsPopupOpen(true); // Open the popup for adding a question
        setIsFabClicked(false); // Optionally close the FAB options after selection
    };
    // Handle Add Question option click
    const handleSave = async () => {
        const updatedQuiz = {
            ...data.quiz,
            questions: [...data.quiz.questions, ...selectedQuestions],
        };
        await updateTest({
            courseId: updatedQuiz?.course,
            quizId: updatedQuiz._id,
            title: updatedQuiz.title,
            description: updatedQuiz.description,
            questions: updatedQuiz.questions,
            duration: updatedQuiz.duration,
            startTime: updatedQuiz.startTime,
            maxMarks: updatedQuiz.maxMarks,

        }).unwrap()
        setSelectedQuestions([])
        setIsPopupOpen(false); // Open the popup for adding a question
        setIsFabClicked(false); // Optionally close the FAB options after selection
        await refetch()
    };

    const handleRemove = async (courseId: string, quizId: string, questionId: string) => {
        await deleteQuestion({ courseId, quizId, questionId })
        await refetch()
    }


    console.log(selectedQuestions,"gvjhbkj")

    const containerClass = theme === 'dark' ? 'text-white' : 'text-gray-900';


    return (
        <div className={`w-[90%] m-auto py-5 mb-5 ${containerClass} rounded-lg shadow-lg p-4`}>
            <div className="relative">
                <Link
                    href={`/admin/course/${courseId}`}
                    className=" w-[220px] my-5 p-1 z-1000  flex items-center gap-2 text-white hover:text-gray-200 transition"
                >
                    <IoChevronBackCircle size={32} />
                    <span className="text-sm font-medium">Back to Course</span>
                </Link>
            </div>
            {/* Quiz Details */}
            <QuizDetailsPreview
                quizDetails={{
                    title: data?.quiz.title,
                    description: data?.quiz.description,
                    duration: data?.quiz.duration,
                    courseId: data?.quiz.course,
                    quizId: quizId,
                    startTime: data?.quiz.startTime,
                    maxMarks: data?.quiz.maxMarks,
                    totalQuestion: data?.quiz?.questions.length,
                    attemptedBy: data?.quiz?.attemptedBy
                }}
                isEdit={isEdit}
                courseName={courseName}
            />

            {
                isPopupOpen && (
                    <div className={`fixed ml-14 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
                        <div className={` h-[90vh] overflow-scroll p-6 bg-gray-800 text-white rounded-lg shadow-lg`}>
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Add New Question</h2>
                                <button
                                    onClick={() => handleSave()}
                                    className="px-4 py-2 rounded-lg text-black bg-indigo-400 border border-gray-600 hover:text-white hover:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                                >
                                    Save
                                </button>

                                {/* <button
                                    onClick={() => setIsPopupOpen(false)}
                                    className="text-gray-400 hover:text-gray-300"
                                >
                                    ✕
                                </button> */}
                                <BiX
                                        size={35}
                                            onClick={() => setIsPopupOpen(false)}
                                            color="red"
                                        />
                            </div>
                            <div>

                                <QuestionBank
                                    isQuiz={true}
                                    isEdit={isEdit}
                                    selectedQuestions={selectedQuestions}
                                    setSelectedQuestions={setSelectedQuestions}
                                />
                            </div>

                        </div>
                    </div>
                )
            }


            {/* Questions */}
            <div className="mt-6 mx-8">
                <div className="flex justify-between items-center m-3">

                    <h3 className="text-lg font-semibold">Questions</h3>
                    {
                        isEdit && (
                            <div className='flex justify-between gap-2 items-center my-1 '>

                                {/* FAB Options */}
                                
                                    <div className=" z-10  bg-gray-700 hover:bg-gray-800 p-4 rounded-lg shadow-lg">
                                        <button
                                            className="text-gray-300 hover:text-gray-400"
                                            onClick={handleAddQuestionClick}
                                        >
                                            Add Question
                                        </button>
                                    </div>
                            
                                {/* Floating Action Button */}
                                <AiFillPlusCircle
                                    size={50}
                                    className=" text-gray-500 cursor-pointer"
                                    onClick={handleFabClick}
                                />
                            </div>
                        )
                    }
                </div>
                {data?.quiz?.questions.length === 0 ? (
                    <p>No questions added yet.</p>
                ) : (
                    data?.quiz?.questions.map((question, index) => (
                        <QuestionCard
                            key={index}
                            index={index}
                            question={question.question}
                            questionId={question._id}
                            courseId={courseId}
                            quizId={quizId}
                            correctAnswer={question.correctAnswer}
                            type={question.type}
                            options={question.options}
                            marks={question.marks}
                            negativeMarks={question.negativeMarks}
                            explanation={question.explanation}
                            image={question.image}
                            isEdit={isEdit}
                            handleRemove={handleRemove}
                        />
                    ))
                )}
            </div>


        </div>
    )
}

export default QuizDetailsAdmin