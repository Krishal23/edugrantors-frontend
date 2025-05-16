import React, { useEffect, useState } from 'react';
import { FaRegClock, FaTag, FaBook, FaInfoCircle, FaCalendarAlt, FaUsers, FaTimes, FaIdBadge, FaUser, FaEye } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import { useUpdateTestMutation } from '@/app/redux/features/courses/coursesApi';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Loader from '@/app/components/Loader/Loader';

const QuizDetails = dynamic(() => import('./QuizDetails'), {
    loading: () => <Loader message='Loading Question BANK...' />,
});

type QuizDetailsProps = {
    quizDetails: {
        courseId: string;
        quizId: string;
        title: string;
        description: string;
        startTime: string;
        duration: number;
        totalQuestion: number;
        maxMarks: number;
        attemptedBy: Array<{
            _id: string;
            name: string;
        }>;
    };
    isEdit?: boolean;
    courseName?:string;

};

const QuizDetailsPreview: React.FC<QuizDetailsProps> = ({ quizDetails, isEdit,courseName }) => {
    const [editPop, setEditPop] = useState(false)
    const [attemptsPop, setAttemptsPop] = useState(false)
    const [localQuizDetails, setLocalQuizDetails] = useState(quizDetails);
    const router = useRouter();
    const [updateTest] = useUpdateTestMutation()

    useEffect(() => {
        setLocalQuizDetails(quizDetails);
    }, [quizDetails]);


    const toggleEditPop = () => {
        setEditPop(!editPop)
    }
    const toggleAttemptsPop = () => setAttemptsPop(!attemptsPop);
    const handleSubmit = () => {
        setEditPop(false);
        updateTest(localQuizDetails)
    }
    return (
        <div className="mt-6 mx-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-between items-end">
                <h3 className="text-xl font-semibold text-white flex items-center">
                    <FaBook size={24} className="mr-2 text-yellow-300" />
                    Quiz Details
                </h3>
                {/* Total Attempts Icon */}
                <div
                    onClick={toggleAttemptsPop}
                    className="flex items-center cursor-pointer text-white hover:text-yellow-300"
                >
                    <FaUsers size={20} />
                    <span className="ml-2 text-sm font-medium">
                        Total Attempts: {quizDetails?.attemptedBy?.length}
                    </span>
                </div>
                {
                    isEdit && (

                        <div onClick={toggleEditPop}>
                            <RiEdit2Fill size={24} className="mr-2 text-gray-300" />
                        </div>
                    )
                }
            </div>

            <div className="flex justify-between">
                <div className="mt-4 space-y-4">
                    {/* Course ID */}
                    <p className="text-white flex items-center">
                        <FaTag size={20} className="mr-2 text-yellow-300" />
                        <strong>Course :  </strong>&nbsp; {courseName}
                    </p>

                    {/* Title */}
                    <p className="text-white flex items-center">
                        <FaInfoCircle size={20} className="mr-2 text-yellow-300" />
                        <strong>Title:</strong> {quizDetails.title}
                    </p>

                    {/* Description */}
                    <p className="text-white flex items-center">
                        <FaInfoCircle size={20} className="mr-2 text-yellow-300" />
                        <div className="flex flex-col">
                            <strong>Description:</strong>
                            {quizDetails.description}
                        </div>
                    </p>
                </div>

                <div className="mt-4 space-y-4">
                    {/* Start Time */}
                    <p className="text-white flex items-center">
                        <FaCalendarAlt size={20} className="mr-2 text-yellow-300" />


                        <strong>Start Time:</strong> {new Date(quizDetails.startTime).toLocaleString()}

                    </p>

                    {/* Duration */}
                    <div className="flex items-center space-x-2 text-white">
                        <FaRegClock size={20} className="text-yellow-300" />
                        <p>
                            <strong>Duration:</strong> {quizDetails.duration} minutes
                        </p>
                    </div>

                    {/* Total Questions */}
                    <p className="text-white flex items-center">
                        <FaTag size={20} className="mr-2 text-yellow-300" />
                        <strong>Total Questions:</strong> {quizDetails.totalQuestion}
                    </p>

                    {/* Maximum Marks */}
                    <p className="text-white flex items-center">
                        <FaTag size={20} className="mr-2 text-yellow-300" />
                        <strong>Max Marks:</strong> {quizDetails.maxMarks}
                    </p>
                </div>
            </div>

            {/* Attempts Popup */}
{attemptsPop && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-2xl w-[400px]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FaUsers className="text-yellow-300" /> Attempted By
                </h3>
                <button
                    onClick={toggleAttemptsPop}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                >
                    <FaTimes size={20} />
                </button>
            </div>

            <ul className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                {quizDetails.attemptedBy.map((attempt, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all"
                    >
                        <div>
                            <p className="text-sm flex items-center gap-2">
                                <FaIdBadge className="text-blue-400" /> 
                                <strong>ID:</strong> {attempt._id}
                            </p>
                            <p className="text-sm flex items-center gap-2">
                                <FaUser className="text-green-400" /> 
                                <strong>Name:</strong> {attempt.name}
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                router.push(
                                    `/quiz-review/${quizDetails.courseId}/${quizDetails.quizId}?userId=${attempt._id}`
                                )
                            }
                            className="flex items-center text-yellow-400 hover:text-yellow-300 gap-1 transition-all"
                        >
                            <FaEye size={16} />
                            <span className="text-sm">View</span>
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={toggleAttemptsPop}
                className="mt-6 bg-red-600 px-4 py-2 w-full rounded-lg text-white font-semibold hover:bg-red-700 transition-colors"
            >
                Close
            </button>
        </div>
    </div>
)}

            {
                editPop && (
                    <div className={`fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
                        <div className={` h-[90vh] w-[520px] overflow-y-scroll bg-gray-800 text-white rounded-lg shadow-lg`}>
                            <QuizDetails
                                isEdit={true}
                                handleSubmit={handleSubmit}
                                quizDetails={localQuizDetails}
                                setQuizDetails={setLocalQuizDetails}

                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default QuizDetailsPreview;
