import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

interface QuizOptionsProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const QuizOptions: React.FC<QuizOptionsProps> = ({ activeStep, setActiveStep }) => {
  const steps = ['Quiz Details', 'Add Questions', 'Preview'];

  return (
    <div className="text-zinc-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-6">Quiz Creation Steps</h3>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
                activeStep >= index ? 'bg-blue-500' : 'bg-[#384766]'
              } relative`}
              onClick={() => setActiveStep(index)}
            >
              <IoMdCheckmark className="text-[25px]" />
              {index !== steps.length - 1 && (
                <div
                  className={`absolute h-[30px] w-1 ${
                    activeStep >= index ? 'bg-blue-500' : 'bg-[#384766]'
                  } bottom-[-100%]`}
                />
              )}
            </div>
            <h5
              className={`pl-3 ${
                activeStep === index ? 'dark:text-white text-black' : 'dark:text-[#a3a7b1] text-black'
              } text-[20px] cursor-pointer`}
              onClick={() => setActiveStep(index)}
            >
              {step}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizOptions;
