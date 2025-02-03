import React from 'react';
import { QuizDetailsType } from './CreateQuiz';
import { useGetAllCourseQuery } from '@/app/redux/features/courses/coursesApi';

interface QuizDetailsProps {
  quizDetails?: QuizDetailsType;
  setQuizDetails: any;
  setActiveStep?: (step: number) => void;
  handleSubmit: () => void;
  isEdit?:boolean;


}

const QuizDetails: React.FC<QuizDetailsProps> = ({
  quizDetails,
  setQuizDetails,
  setActiveStep,
  handleSubmit,
  isEdit,


}) => {

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizDetails({ ...quizDetails, [name]: value });
  };


  const { data, isLoading } = useGetAllCourseQuery({}, { refetchOnMountOrArgChange: true });



  const theme = 'dark'; // Replace with your theme management logic
  const inputClass = theme === 'dark' ? 'border-gray-600 focus:border-indigo-500 bg-gray-700 text-gray-200' : 'border-gray-300 focus:border-indigo-500 bg-gray-50';
  const labelClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const buttonClass = theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white';

  return (
    <div className="m-auto w-[80%] mt-11">
      <form className={`p-6 rounded-lg shadow-md ${labelClass}`}>
        <h2 className="text-xl font-bold mb-5">Quiz Details</h2>


        <h2 className="text-xl font-bold mb-5">Quiz Details</h2>

        {/* Course Selection */}
        <div className="mb-5">
          <label htmlFor="courseId" className={`block text-sm font-medium mb-2 ${labelClass}`}>
            Select Course
          </label>
          <select
            id="courseId"
            name="courseId"
            value={quizDetails?.courseId}
            onChange={handleChange}
            required
            className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
          >
            <option value="" disabled>Select a course</option>
            {!isLoading && data?.courses && data.courses.map((course:any) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quiz Title */}
        <div className="mb-5">
          <label htmlFor="title" className={`block text-sm font-medium mb-2 ${labelClass}`}>
            Quiz Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter quiz title"
            value={quizDetails?.title}
            onChange={handleChange}
            required
            className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
          />
        </div>

        {/* Quiz Description */}
        <div className="mb-5">
          <label htmlFor="description" className={`block text-sm font-medium mb-2 ${labelClass}`}>
            Quiz Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Enter a brief description of the quiz"
            value={quizDetails?.description}
            onChange={handleChange}
            required
            className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
          ></textarea>
        </div>

        {/* Quiz Start Time */}
        <div className="mb-5">
          <label htmlFor="startTime" className={`block text-sm font-medium mb-2 ${labelClass}`}>
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={quizDetails?.startTime}
            onChange={handleChange}
            required
            className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
          />
        </div>

        {/* Quiz Duration */}
        <div className="mb-5">
          <label htmlFor="duration" className={`block text-sm font-medium mb-2 ${labelClass}`}>
            Duration (in minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            placeholder="Enter quiz duration"
            value={quizDetails?.duration}
            onChange={handleChange}
            required
            className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
          />
        </div>

        {/* Next Button */}


        <button
          type="button"
          onClick={handleSubmit}
          // onClick={() => setActiveStep(1)}
          className={`w-full p-2 mt-4 rounded-md font-semibold transition duration-300 ${buttonClass}`}
        >
          {
            isEdit ? "Save": "Create Quiz"
          }
        </button>
      </form>
    </div>
  );
};

export default QuizDetails;
