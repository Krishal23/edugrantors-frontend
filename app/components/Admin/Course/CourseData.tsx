import { useTheme } from 'next-themes';
import React, { FC } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast from 'react-hot-toast';

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive
}) => {
  const { theme } = useTheme();

  const containerClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  const inputClass = theme === 'dark' ? 'border-gray-600 focus:border-indigo-500 bg-gray-700 text-gray-200' : 'border-gray-300 focus:border-indigo-500 bg-gray-50';
  const labelClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const buttonClass = theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white';
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = benefits.map((benefit, i) => 
      i === index ? { ...benefit, title: value } : benefit
    );
    setBenefits(updatedBenefits);
  };
  
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: '' }]);
  };
  
  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedPrerequisites = prerequisites.map((prerequisite, i) =>
      i === index ? { ...prerequisite, title: value } : prerequisite
    );
    setPrerequisites(updatedPrerequisites);
  };
  
  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: '' }]);
  };
  
  const handleNext = () => {
    const isBenefitsComplete = benefits.every(benefit => benefit.title.trim() !== "");
    const isPrerequisitesComplete = prerequisites.every(prerequisite => prerequisite.title.trim() !== "");

    if (isBenefitsComplete && isPrerequisitesComplete) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className={`m-auto w-[80%] text-zinc-800 dark:text-white mt-11 block ${containerClass}`}>
      <div>
        <label className={`block text-lg font-semibold mb-1 ${labelClass}`}>
          What are the benefits of this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            type='text'
            key={index}
            placeholder='Describe the benefit...'
            required
            className={`w-full p-2 rounded-md border mt-2 focus:ring focus:outline-none transition ${inputClass}`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          className="my-2 cursor-pointer"
          style={{ width: '30px' }}
          onClick={handleAddBenefit}
        />
      </div>

      <div>
        <label className={`block text-lg font-semibold mb-1 ${labelClass}`}>
          What are the prerequisites of this course?
        </label>
        <br />
        {prerequisites.map((prerequisite, index) => (
          <input
            type='text'
            key={index}
            placeholder='Describe the prerequisite...'
            required
            className={`w-full p-2 rounded-md border mt-2 focus:ring focus:outline-none transition ${inputClass}`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          className="my-2 cursor-pointer"
          style={{ width: '30px' }}
          onClick={handleAddPrerequisite}
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          className={`py-2 px-6 rounded-md transition ${buttonClass}`}
          onClick={() => setActive(active - 1)}
        >
          Previous
        </button>

        <button
          className={`py-2 px-6 rounded-md transition ${buttonClass}`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  )
};

export default CourseData;
