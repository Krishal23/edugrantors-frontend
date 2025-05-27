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

  console.log(question)


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-gray-900 p-2 top-14 w-[50vw] max-w-full   rounded-lg shadow-lg relative text-gray-200">

        <BiX
        size={35}
            onClick={onClose}
            color="red"
        />
      {step === 1 && !isEdit ? (
        <BasicInfoForm onNext={handleNext} mappedData={mappedData} />
      ) : (
        <QuestionInfoForm
          {...formData}
          courseId={question?.courseId}
          topic={question?.topic}
          subTopic={question?.subTopic}
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

