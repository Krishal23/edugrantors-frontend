// pages/FAQ.tsx
import React, { useState } from 'react';

type FAQItem = {
    question: string;
    answer: string;
};

const faqs: FAQItem[] = [
    {
        question: " How does personal mentorship work?",
        answer: "Each student is assigned an expert mentor who provides one-on-one guidance, progress tracking, and personalized study strategies."
    },
    {
        question: "What courses do you offer?",
        answer: "We offer a wide range of services, including Mock Tests, Personal Mentorship, JEE PYQ Resources, and Live Doubt Sessions, to ensure your success."
    },
    {
        question: "How can I enroll in a course?",
        answer: "To enroll in a course, simply visit the course page, select the course you're interested in, and follow the enrollment instructions provided."
    },
    {
        question: "Are the mock tests based on the latest syllabus?",
        answer: "Yes, our mock tests are designed to reflect the latest syllabus and exam patterns of JEE and NEET."
    },
    {
        question: "Are study materials and PYQs included?",
        answer: "Absolutely! We provide comprehensive study resources and fully solved previous years' questions to strengthen your preparation."
    },
    {
        question: "How can I clarify my doubts?",
        answer: "You can join our live doubt-solving sessions or connect with mentors directly for quick resolution."
    },
    {
        question: "Is the course suitable for droppers?",
        answer: "Yes, our course is designed to cater to both freshers and droppers, with customized plans for individual needs."
    },

];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle answer visibility
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center py-10 bg-gradient-to-br from-[#9b88bc] to-[#a188d7] dark:from-gray-800 dark:to-gray-900 text-white">
            <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[65%] m-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 leading-tight">
                    Frequently Asked Questions
                </h1>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 transition-transform duration-300 hover:scale-105"
                        >
                            <button
                                className="w-full text-left bg-[#19043c2b] dark:bg-[#22083e19] p-4 sm:p-6 md:p-8 hover:bg-[#5b2ebc39] dark:hover:bg-[#3d1b4c] transition-colors duration-300 focus:outline-none"
                                onClick={() => handleToggle(index)}
                            >
                                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                                    {faq.question}
                                </h2>
                            </button>
                            {activeIndex === index && (
                                <div className="p-4 sm:p-6 md:p-8 bg-[#2d2d2d] dark:bg-gray-900 rounded-b-lg shadow-md transition-opacity duration-300">
                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
