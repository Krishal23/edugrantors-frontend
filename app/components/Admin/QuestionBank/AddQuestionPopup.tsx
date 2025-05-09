import React, { useState } from "react";
import BasicInfoForm from "./BasicQuestionInfoForm";
import { BiX } from "react-icons/bi";
import dynamic from "next/dynamic";
import Loader from "../../Loader/Loader";

const QuestionInfoForm = dynamic(() => import('./QuestionInfoForm'), {
  ssr: false,
  loading: () => <Loader message='Loading Form...' />,
});


const AddQuestionPopup= ({ onClose,mappedData,courseId,topic,subTopic,type,question,isEdit,queId,refetch }:any) => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    courseId: courseId||"",
    topic: topic||"",
    subTopic:subTopic|| "",
  });

  const handleNext = (data: { courseId: string; topic: string; subTopic: string }) => {
    setFormData(data);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-gray-900 p-2 top-14 w-[50vw] max-w-full   rounded-lg shadow-lg relative text-gray-200">

        <BiX
        size={35}
            onClick={onClose}
            color="red"
        />
      {step === 1 ? (
        <BasicInfoForm onNext={handleNext} mappedData={mappedData} />
      ) : (
        <QuestionInfoForm
          {...formData}
          onClose={onClose}
          question={question}
          type={type}
          isEdit={isEdit}
          queId={queId}
          refetch={refetch}
        />
      )}
        </div>
    </div>
  );
};

export default AddQuestionPopup;


//   return (
//     <div className="fixed w-[46vw] h-[40vw] overflow-scroll p-6 bg-gradient-to-r from-gray-800 to-zinc-900 rounded-xl shadow-lg mb-6 hover:shadow-2xl transition-all duration-300">
//       <h2 className="text-2xl text-white font-semibold mb-4">Create New Question</h2>

//       {/* Question Field */}
//       <div className="mb-4">
//         <label className="text-white text-sm">Question</label>
//         <input
//           type="text"
//           value={questionData.question}
//           onChange={(e) => handleFieldChange("question", e.target.value)}
//           className="w-full p-2 mt-2 rounded-md text-gray-400 "
//           placeholder="Enter your question"
//         />
//       </div>

//       {/* Options Fields */}
//       <div className="mb-4">
//         <label className="text-white text-sm">Options</label>
//         {questionData.options.map((option, index) => (
//           <div key={index} className="flex items-center mb-2">
//             <input
//               type="text"
//               value={option.text}
//               onChange={(e) => handleOptionChange(index, e.target.value)}
//               className="w-full p-2 mt-2 rounded-md text-gray-400"
//               placeholder={`Option ${index + 1}`}
//             />
//             <input
//               type="radio"
//               checked={option.isCorrect}
//               onChange={() => handleCorrectAnswerChange(index)}
//               className="ml-2"
//             />
//             <span className="text-white ml-2">Correct</span>
//             {questionData.options.length > 2 && (
//               <button
//                 type="button"
//                 onClick={() => handleRemoveOption(index)}
//                 className="ml-2 text-red-500"
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddOption}
//           className="text-indigo-500 flex items-center mt-2"
//         >
//           <FaCheckCircle className="mr-2" /> Add Option
//         </button>
//       </div>

//       {/* Marks */}
//       <div className="mb-4">
//         <label className="text-white text-sm">Marks</label>
//         <input
//           type="number"
//           value={questionData.marks}
//           onChange={(e) => handleFieldChange("marks", parseInt(e.target.value))}
//           className="w-full p-2 mt-2 rounded-md text-gray-400"
//           placeholder="Enter the marks"
//         />
//       </div>

//       {/* Explanation */}
//       <div className="mb-4">
//         <label className="text-white text-sm">Explanation</label>
//         <textarea
//           value={questionData.explanation}
//           onChange={(e) => handleFieldChange("explanation", e.target.value)}
//           className="w-full p-2 mt-2 rounded-md text-gray-400"
//           placeholder="Enter explanation"
//           rows={4}
//         />
//       </div>

//       {/* Additional Fields */}
//       <div className="mb-4">
//         <label className="text-white text-sm">Course ID</label>
//         <input
//           type="text"
//           value={questionData.courseId}
//           onChange={(e) => handleFieldChange("courseId", e.target.value)}
//           className="w-full p-2 mt-2 rounded-md text-gray-400"
//           placeholder="Enter course ID"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="text-white text-sm">Topic</label>
//         <input
//           type="text"
//           value={questionData.topic}
//           onChange={(e) => handleFieldChange("topic", e.target.value)}
//           className="w-full p-2 mt-2 rounded-md text-gray-400"
//           placeholder="Enter topic"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="text-white text-sm">Sub Topic</label>
//         <input
//           type="text"
//           value={questionData.subTopic}
//           onChange={(e) => handleFieldChange("subTopic", e.target.value)}
//           className="w-full p-2 mt-2 rounded-md text-gray-400"
//           placeholder="Enter sub topic"
//         />
//       </div>

      

//       <div className="flex justify-between mt-4">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 bg-gray-500 text-white rounded-md"
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };


