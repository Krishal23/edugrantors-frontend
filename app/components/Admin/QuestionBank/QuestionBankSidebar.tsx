import React from "react";

type Props = {
  mappedData: any;
  courseId?: string; // Filter by courseId
  topic?: string; // Filter by topic
  subTopic?: string; // Filter by subTopic
  type?:string;
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
  type="",
  setCourseId,
  setTopic,
  setSubTopic,
  setType,
}: Props) => {
 
  // Handle selection changes
  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourse = event.target.value;
    setCourseId(selectedCourse);
    // console.log(courseId)
    setTopic(""); // Reset topic when course changes
    setSubTopic(""); // Reset sub-topic when course changes
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopic = event.target.value;
    setTopic(selectedTopic);
    setSubTopic(""); // Reset sub-topic when topic changes
  };

  const handleSubTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubTopic(event.target.value);
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  return (
    <div className="w-64 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-semibold">Filter Questions</h2>

      <div className="space-y-4">
        {/* Course Filter */}
        <div>
          <label htmlFor="course" className="block font-medium">
            Course
          </label>
          <select
            id="course"
            value={courseId}
            onChange={handleCourseChange}
            className="w-full bg-gray-700 text-white p-2 rounded-lg mt-2"
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
            className={`w-full bg-gray-700 text-white p-2 rounded-lg mt-2 ${!courseId && 'cursor-not-allowed'}`}
            disabled={!courseId} // Disable if no course is selected
          >
            <option value="">Select a topic</option>
            {courseId &&
              mappedData
                .find((course:any) => course.courseId === courseId)
                ?.topics.map((chapter:any) => (
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
            className={`w-full bg-gray-700 text-white p-2 rounded-lg mt-2 ${!topic && 'cursor-not-allowed'}`}
            disabled={!topic} // Disable if no topic is selected
          >
            <option value="">Select a Sub Topic</option>
            {topic &&
              mappedData
                .find((course:any) => course.courseId === courseId)
                ?.topics.find((t:any) => t.topics === topic)
                ?.subtopics.map((sub:any) => (
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
            className="w-full bg-gray-700 text-white p-2 rounded-lg mt-2"
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
