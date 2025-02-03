import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import Select from "react-select";
import { Dialog } from "@/app/ui/Dialog";
import { Button } from "@/app/ui/Button";

// Define types for props
interface Props {
  onNext: (data: { courseId: string; topic: string; subTopic: string }) => void;
  mappedData: any[];
}

const BasicInfoForm: React.FC<Props> = ({ onNext, mappedData }) => {
  const [courseId, setCourseId] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [subTopic, setSubTopic] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [courseOptions, setCourseOptions] = useState<{ value: string; label: string }[]>([]);
  const [topicOptions, setTopicOptions] = useState<{ value: string; label: string }[]>([]);
  const [subTopicOptions, setSubTopicOptions] = useState<{ value: string; label: string }[]>([]);

  const [isCreateTopicOpen, setCreateTopicOpen] = useState(false);
  const [isCreateSubTopicOpen, setCreateSubTopicOpen] = useState(false);

  const [newTopic, setNewTopic] = useState("");
  const [newSubTopic, setNewSubTopic] = useState("");

  useEffect(() => {
    setCourseOptions(
      mappedData.map((course) => ({ value: course.courseId, label: course.name }))
    );
  }, [mappedData]);

  useEffect(() => {
    if (courseId) {
      const selectedCourse = mappedData.find((course) => course.courseId === courseId);
      setTopicOptions(
        (selectedCourse?.topics || []).map((t: any) => ({ value: t.topics, label: t.topics }))
      );
    } else {
      setTopicOptions([]);
    }
  }, [courseId, mappedData]);

  useEffect(() => {
    if (topic) {
      const selectedCourse = mappedData.find((course) => course.courseId === courseId);
      const selectedTopic = selectedCourse?.topics.find((t: any) => t.topics === topic);
      setSubTopicOptions(
        (selectedTopic?.subtopics || []).map((sub: string) => ({ value: sub, label: sub }))
      );
    } else {
      setSubTopicOptions([]);
    }
  }, [topic, courseId, mappedData]);

  const handleSearch = debounce((inputValue: string, type: string) => {
    if (type === "course") {
      setCourseOptions(
        mappedData
          .filter((course) => course.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map((course) => ({ value: course.courseId, label: course.name }))
      );
    }
  }, 300);

  const handleSubmit = () => {
    if (!courseId) {
      setError("Course is required.");
      return;
    }
    setError(null);
    onNext({ courseId, topic, subTopic });
  };

  const handleCreateTopic = () => {
    if (newTopic.trim()) {
      setTopicOptions((prev) => [...prev, { value: newTopic, label: newTopic }]);
      setTopic(newTopic);
      setNewTopic("");
      setCreateTopicOpen(false);
    }
  };

  const handleCreateSubTopic = () => {
    if (newSubTopic.trim()) {
      setSubTopicOptions((prev) => [...prev, { value: newSubTopic, label: newSubTopic }]);
      setSubTopic(newSubTopic);
      setNewSubTopic("");
      setCreateSubTopicOpen(false);
    }
  };

  return (
    <div className="mb-6 max-h-[35vw] overflow-y-scroll p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-3xl text-white font-semibold mb-6">Basic Information</h2>

      {/* Course Dropdown */}
      <div className="mb-4">
        <label className="text-gray-400 text-sm font-semibold">Course</label>
        <Select
          options={courseOptions}
          onInputChange={(inputValue) => handleSearch(inputValue, "course")}
          onChange={(selectedOption) => {
            setCourseId(selectedOption?.value || "");
            setTopic("");
            setSubTopic("");
          }}
          placeholder="Search for a course"
          isClearable
          className="mt-2 border text-black border-gray-600 rounded-md"
        />
      </div>

      {/* Topic Dropdown */}
      <div className="mb-4 flex items-end gap-4">
        <div className="flex-1">
          <label className="text-gray-400 text-sm font-semibold">Topic</label>
          <Select
            options={topicOptions}
            onChange={(selectedOption) => {
              setTopic(selectedOption?.value || "");
              setSubTopic("");
            }}
            placeholder="Select a topic"
            isDisabled={!courseId}
            isClearable
            className="mt-2 border text-black border-gray-600 rounded-md"
          />
        </div>
        <Button
          onClick={() => setCreateTopicOpen(true)}
          className="bg-gray-700 text-white hover:bg-gray-600 px-4 py-2 rounded-md"
        >
          Create Topic
        </Button>
      </div>

      {/* Sub-Topic Dropdown */}
      <div className="mb-4 flex items-end gap-4">
        <div className="flex-1">
          <label className="text-gray-400 text-sm font-semibold">Sub Topic</label>
          <Select
            options={subTopicOptions}
            onChange={(selectedOption) => setSubTopic(selectedOption?.value || "")}
            placeholder="Select a sub-topic"
            isDisabled={!topic}
            isClearable
            className="mt-2 border border-gray-600 text-black rounded-md"
          />
        </div>
        <Button
          onClick={() => setCreateSubTopicOpen(true)}
          className="bg-gray-700 text-white hover:bg-gray-600 px-4 py-2 rounded-md"
        >
          Create Sub-Topic
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        className={`px-4 py-2 ${
          courseId ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        } text-white rounded-md`}
        disabled={!courseId}
      >
        Next
      </button>

      {/* Dialog for Creating Topic */}
      {isCreateTopicOpen && (
        <Dialog onClose={() => setCreateTopicOpen(false)}>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white text-lg mb-4">Create New Topic</h3>
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Enter topic name"
              className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white border border-gray-600"
            />
            <Button onClick={handleCreateTopic} className="bg-blue-600 hover:bg-blue-500">
              Create
            </Button>
          </div>
        </Dialog>
      )}

      {/* Dialog for Creating Sub-Topic */}
      {isCreateSubTopicOpen && (
        <Dialog onClose={() => setCreateSubTopicOpen(false)}>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-white text-lg mb-4">Create New Sub-Topic</h3>
            <input
              type="text"
              value={newSubTopic}
              onChange={(e) => setNewSubTopic(e.target.value)}
              placeholder="Enter sub-topic name"
              className="w-full p-2 mb-4 rounded-md bg-gray-700 text-white border border-gray-600"
            />
            <Button onClick={handleCreateSubTopic} className="bg-blue-600 hover:bg-blue-500">
              Create
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default BasicInfoForm;
