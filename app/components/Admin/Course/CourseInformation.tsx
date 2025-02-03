import React, { FC, useState } from "react";
import { useTheme } from "next-themes";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0]; // Get the first file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0]; // Get the first file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass =
    theme === "dark"
      ? "border-gray-600 focus:border-indigo-500 bg-gray-700 text-gray-200"
      : "border-gray-300 focus:border-indigo-500 bg-gray-50";
  const labelClass = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const buttonClass =
    theme === "dark"
      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
      : "bg-indigo-500 hover:bg-indigo-600 text-white";

  return (
    <div className={`m-auto  w-[80%] mt-11`}>
      <form
        onSubmit={handleSubmit}
        className={`p-6  text-zinc-800 dark:text-white rounded-lg shadow-md ${labelClass}`}
      >
        {/* Course Name */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className={`block text-sm font-medium mb-2 ${labelClass}`}
          >
            Course Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="MERN stack LMS platform with Next.js 13"
            className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
          />
        </div>

        {/* Course Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className={`block text-sm font-medium mb-2 ${labelClass}`}
          >
            Course Description
          </label>
          <textarea
            id="description"
            rows={5}
            required
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            placeholder="A brief description of the course"
            className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
          ></textarea>
        </div>

        {/* File Upload for Thumbnail */}
        <div className="mb-5">
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="thumbnail"
            className={`w-full min-h-[10vh] dark:border-[#fffffff] border-[#ffffff26] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="Course Thumbnail"
                className=" max-h-full w-full object-cover "
                height={1200}
                width={1800}
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop or click to upload a thumbnail
              </span>
            )}
          </label>
        </div>

        {/* Course Price */}
        <div className="flex w-full justify-between">
          <div className="w-[45%]">
            <label className={`${labelClass}`}>Course Price</label>
            <input
              type="number"
              id="price"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="29"
              className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
            />
          </div>

          {/* Estimated Price */}
          <div className="w-[50%]">
            <label className={`${labelClass}`}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              id="estimatedPrice"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="79"
              className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
            />
          </div>
        </div>

        <br />

        {/* Course Tags */}
        <div>
          <label className={`${labelClass}`} htmlFor="tags">
            Course Tags
          </label>
          <input
            type="text"
            id="tags"
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            placeholder="Mern, Next 13, React, Node"
            className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
          />
        </div>

        <br />

        {/* Course Level & Demo URL */}
        <div className="flex w-full justify-between">
          <div className="w-[45%]">
            <label className={`${labelClass}`}>Course Level</label>
            <input
              type="text"
              id="level"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="Beginner/Intermediate/Expert"
              className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
            />
          </div>

          <div className="w-[50%]">
            <label className={`${labelClass}`}>Demo URL</label>
            <input
              type="text"
              id="demoUrl"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="eer74fbsgd342s"
              className={`w-full p-2 rounded-md border focus:ring focus:outline-none transition ${inputClass}`}
            />
          </div>
        </div>

        <br />

        {/* Submit Button */}
        <button
          type="submit"
          value="Next"
          className={`w-full p-2 rounded-md font-semibold transition duration-300 ${buttonClass}`}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default CourseInformation;
