'use client'
import React, {  useState } from 'react'
import { FaPlayCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';



const CourseContentList= ({ data = [], activeVideo, setActiveVideo }:any) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    const sections = data.reduce((acc: any, video:any) => {
        acc[video.videoSection] = acc[video.videoSection] || [];
        acc[video.videoSection].push(video);
        return acc;
    }, {});

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div className="p-4 space-y-8 dark:bg-gray-900 text-gray-200 rounded-lg shadow-lg">
            {Object.keys(sections).map((section) => (
                <div key={section} className="mb-6">
                    <div
                        onClick={() => toggleSection(section)}
                        className="flex items-center justify-between cursor-pointer mb-4 border-b border-gray-700 pb-2"
                    >
                        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 ">{section}</h2>
                        {expandedSections[section] ? (
                            <FaChevronUp className="text-gray-400" />
                        ) : (
                            <FaChevronDown className="text-gray-400" />
                        )}
                    </div>
                    {expandedSections[section] && (
                        <div className="space-y-3">
                            {sections[section].map((video:any) => (
                                <button
                                    key={video._id}
                                    onClick={() => setActiveVideo(data.findIndex((v:any) => v._id === video._id))}
                                    className={`flex items-center h-9 p-3 rounded-lg transition-all duration-200 ease-in-out ${activeVideo === data.findIndex((v:any) => v._id === video._id)
                                            ? "bg-blue-700 text-white shadow-md"
                                            : "bg-gray-800 text-gray-300 hover:bg-blue-800"
                                        } overflow-hidden`}
                                >
                                    <FaPlayCircle
                                        className={`mr-3 h-5 text-2xl ${activeVideo === data.findIndex((v:any) => v._id === video._id)
                                                ? "text-yellow-400"
                                                : "text-blue-400"
                                            }`}
                                    />
                                    <span className="max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis  block flex-1 text-left font-medium text-lg">
                                        {video.title}
                                    </span>
                                    {activeVideo === data.findIndex((v:any) => v._id === video._id) && (
                                        <span className="px-3 py-1 h-5 m-2 bg-yellow-500 text-yellow-100 rounded-full text-[10px]">Now Playing</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CourseContentList;
