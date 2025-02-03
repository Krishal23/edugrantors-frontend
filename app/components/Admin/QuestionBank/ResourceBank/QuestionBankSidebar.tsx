import { useGetAllCourseNamesQuery } from "@/app/redux/features/courses/coursesApi";
import React from "react";

type Props = {
  mappedData: any;
  courseId?: string; 
  topic?: string; 
  subTopic?: string;
  type?: string;
  setCourseId: (courseId: string) => void;
  setTopic: (topic: string) => void;
  setSubTopic: (subTopic: string) => void;
  setType: (type: string) => void;
};

const QuestionBankSidebar = ({
  mappedData,
  courseId = "",
  topic = "",
  subTopic = "",
  type = "",
  setCourseId,
  setTopic,
  setSubTopic,
  setType,
}: Props) => {

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = event.target.value;
    setCourseId(selectedCourse);
    setTopic("");
    setSubTopic(""); 
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopic = event.target.value;
    setTopic(selectedTopic);
    setSubTopic(""); 
  };

  const handleSubTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubTopic(event.target.value);
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  return (
    <div className="w-fit bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-semibold">Filter Questions</h2>

      <div className="space-y-4 flex w-[80vw] justify-between items-end">
        {/* Course Filter */}
        <div>
          <label htmlFor="course" className="block font-medium">
            Course
          </label>
          <select
            id="course"
            value={courseId}
            onChange={handleCourseChange}
            className="w-full dark:bg-gray-700 text:black dark:text-white p-2 rounded-lg mt-2"
          >
            <option value="">Select a Course</option>
            {mappedData.map((course:any) => (
              <option key={course.courseId} value={course.courseId}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Topic (Chapter) Filter */}
        <div>
          <label htmlFor="topic" className="block font-medium">
            Chapter
          </label>
          <select
            id="topic"
            value={topic}
            onChange={handleTopicChange}
            className={`w-full dark:bg-gray-700 text:black dark:text-white p-2 rounded-lg mt-2 ${!courseId && 'cursor-not-allowed'}`}
            disabled={!courseId}
          >
            <option value="">Select a topic</option>
            {courseId &&
              mappedData
                .find((course) => course.courseId === courseId)
                ?.topics.map((chapter) => (
                  <option key={chapter.topics} value={chapter.topics}>
                    {chapter.topics}
                  </option>
                ))}
          </select>
        </div>

        {/* Sub-topic Filter */}
        <div>
          <label htmlFor="subTopic" className="block font-medium">
            SubTopic
          </label>
          <select
            id="subTopic"
            value={subTopic}
            onChange={handleSubTopicChange}
            className={`w-full dark:bg-gray-700 text:black dark:text-white p-2 rounded-lg mt-2 ${!topic && 'cursor-not-allowed'}`}
            disabled={!topic} 
          >
            <option value="">Select a Sub Topic</option>
            {topic &&
              mappedData
                .find((course) => course.courseId === courseId)
                ?.topics.find((t) => t.topics === topic)
                ?.subtopics.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label htmlFor="type" className="block font-medium">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={handleTypeChange}
            className="w-full dark:bg-gray-700 text:black dark:text-white p-2 rounded-lg mt-2"
          >
            <option value="">Select a Sub Topic</option>
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
            <option value="numerical">Numerical</option>
            <option value="phrase">Phrase</option>

          </select>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankSidebar;
