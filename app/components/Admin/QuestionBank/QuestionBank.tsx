import React, {  useState } from "react";
import { useGetAllQuestionQuery } from "@/app/redux/features/question-bank/questionBankApi";
import { BsBank2 } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { useGetAllCourseNamesQuery } from "@/app/redux/features/courses/coursesApi";
import dynamic from "next/dynamic";
import Loader from "../../Loader/Loader";


const QuestionCard = dynamic(() => import('./QuestionCard'), {
  ssr: false,
  loading: () => <Loader message='Loading Question...' />,
});
const QuestionBankSidebar = dynamic(() => import('./QuestionBankSidebar'), {
  ssr: false,
  loading: () => <Loader message='Loading Sidebar...' />,
});
const AddQuestionPopup = dynamic(() => import('./AddQuestionPopup'), {
  ssr: false,
  loading: () => <Loader message='Loading ...' />,
});
const AttemptQuestion = dynamic(() => import('./AttemptQuestion'), {
  ssr: false,
  loading: () => <Loader message='Loading Question ...' />,
});



const QuestionBank = ({ isQuiz, isEdit, isResource, selectedQuestions, setSelectedQuestions }:any) => {
  const { data, refetch } = useGetAllQuestionQuery({}, { refetchOnMountOrArgChange: true });
  const { data: allCourses } = useGetAllCourseNamesQuery({});
  const [courseId, setCourseId] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [type, setType] = useState("");
  const [, setIsFabClicked] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [attempt, setAttempt] = useState()

  // useEffect(() => {
  //   refetch()
  // }, [refetch])



  // Updated `handleSelectQuestion` function
  const handleSelectQuestion = (question: any, isSelected: boolean) => {
    setSelectedQuestions((prev: any[]) => {
      if (isSelected) {
        // Check if the question is already selected
        if (!prev.some((q) => q._id === question._id)) {
          return [...prev, question]; // Add the full question only if it's not already selected
        }
      } else {
        // Remove the question by ID
        return prev.filter((q) => q._id !== question._id);
      }
      return prev; // Return the unchanged array if the question is already selected
    });
  };


  const mappingData = (allCourses: any, data: any) => {
    const result: any[] = [];
    data?.questions?.forEach((question: any) => {
      let course = result.find((item) => item.courseId === question.courseId);
      if (!course) {
        course = { courseId: question.courseId, topics: [], name: "" };
        result.push(course);
      }
      let topic = course.topics.find((item:any) => item.topics === question.topic);
      if (!topic) {
        topic = { topics: question.topic, subtopics: [] };
        course.topics.push(topic);
      }
      if (!topic.subtopics.includes(question.subTopic)) {
        topic.subtopics.push(question.subTopic);
      }
    });

    allCourses?.courses?.forEach((course:any) => {
      const existingCourse = result.find((item) => item.courseId === course._id);
      if (!existingCourse) {
        result.push({
          courseId: course._id,
          name: course.name,
          topics: [],
        });
      } else {
        if (!existingCourse.name) {
          existingCourse.name = course.name;
        }
      }
    });

    return result;
  };

  const mappedData = mappingData(allCourses, data);
  // console.log(mappedData)

  return (
    <div className="mx-4">
      <div className="w-full flex min-h-screen">
        <div className="w-[80%]">
          <div className="w-[50vw] ml-12 my-4 max-w-2xl p-6 rounded-lg shadow-lg space-y-6">
            <strong className="text-2xl border-b border-b-gray-400 flex gap-4 justify-between items-center">
              <BsBank2 />
              Question Bank
              <BsBank2 />
            </strong>
            {isPopupOpen && (
              <AddQuestionPopup onClose={() => {
                setIsPopupOpen(false) 
                refetch()
              }} mappedData={mappedData} refetch={refetch} />
            )}
            {isResource && attempt && (
              <AttemptQuestion onClose={() => setAttempt(undefined)} attempts={data.questions} />
            )}

            {data?.questions?.map((question: any, index: number) => (
              <QuestionCard
                isQuiz={isQuiz}
                key={index}
                question={question}
                courseId={courseId}
                topic={topic}
                subTopic={subTopic}
                type={type}
                refetch={refetch}
                mappedData={mappedData}
                queId={question._id}
                isSelected={selectedQuestions?.some((q:any) => q._id === question._id)} // Check by ID
                onSelectQuestion={(isSelected: boolean) =>
                  handleSelectQuestion(question, isSelected)
                }
                isResource={isResource}

              />
            ))}
          </div>
        </div>
        <div
          className={`w-[20%] mx-6 mt-[100px] h-screen fixed right-0  z-100 flex flex-col items-end gap-3 ${isEdit ? "top-0" : "top-18"
            }`}
        >
          <QuestionBankSidebar
            mappedData={mappedData}
            courseId={courseId}
            topic={topic}
            type={type}
            subTopic={subTopic}
            setCourseId={setCourseId}
            setTopic={setTopic}
            setSubTopic={setSubTopic}
            setType={setType}
          />
          <div className="flex justify-between gap-2 items-center my-1">
            {!isResource && (
              <div className="z-10 bg-gray-700 hover:bg-gray-800 p-4 rounded-lg shadow-lg">
                <button
                  className="text-gray-300 hover:text-gray-400"
                  onClick={() => setIsPopupOpen(true)}
                >
                  Add Question
                </button>
              </div>
            )}
            {
              !isResource && (

                <AiFillPlusCircle
                  size={50}
                  className="text-gray-500 cursor-pointer"
                  onClick={() => setIsFabClicked((prev) => !prev)}
                />
              )
            }
          </div>
        </div>
      </div>

    </div>
  );
};

export default QuestionBank;
