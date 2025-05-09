import React, { useState } from "react";
import { useGetAllQuestionQuery } from "@/app/redux/features/question-bank/questionBankApi";
import { useGetAllCourseNamesQuery } from "@/app/redux/features/courses/coursesApi";
import dynamic from "next/dynamic";
import Loader from "../../Loader/Loader";


const QuestionsList = dynamic(() => import('./ResourceBank/QuestionsList'), {
    ssr: false,
    loading: () => <Loader message='Loading Question...' />,
});
const QuestionBankSidebar = dynamic(() => import('./ResourceBank/QuestionBankSidebar'), {
    ssr: false,
    loading: () => <Loader message='Loading Sidebar...' />,
});


const QuestionBank = () => {
    const { data } = useGetAllQuestionQuery({}, { refetchOnMountOrArgChange: true });
    const { data: allCourses } = useGetAllCourseNamesQuery({});
    const [courseId, setCourseId] = useState("");
    const [topic, setTopic] = useState("");
    const [subTopic, setSubTopic] = useState("");
    const [type, setType] = useState("");

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

    console.log(mappedData)


    return (
        <div className='flex-col min-h-[120vh] justify-center gap-2 items-center my-1'>
            <div className="m-4 ">
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

            </div>
            <div className="  w-[70vw] ">
                {
                    data?.questions && (
                        <QuestionsList
                            data={data?.questions}
                            courseId={courseId}
                            topic={topic}
                            subTopic={subTopic}
                            type={type}
                        />
                    )
                }
            </div>

        </div>
    )
}
export default QuestionBank;
