'use client'

import React, { FC, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

type Props = {
    data: any;
    activeVideo?: number;
    setActiveVideo?: (index: number) => void;
    isDemo?: boolean;
    theme?: 'light' | 'dark'; // New prop for theme
};

const CourseContentList: FC<Props> = ({ data ,isDemo = 'light' }) => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>());

    const videoSections: string[] = Array.from(new Set(data?.map((item: any) => item.videoSection)));

    // let totalCount = 0;

    // Toggles the visibility of a specific section
    const toggleSectionVisibility = (section: string) => {
        const newVisibleSections = new Set(visibleSections);
        if (newVisibleSections.has(section)) {
            newVisibleSections.delete(section);
        } else {
            newVisibleSections.add(section);
        }
        setVisibleSections(newVisibleSections);
    };

    return ( 
        <div className={`mt-[15px]  text-zinc-800 dark:text-white  w-full `}>
            {videoSections.map((section: string) => {
                const isSectionVisible = visibleSections.has(section);
                
                // Filter videos by section
                const sectionVideos = data.filter((item: any) => item.videoSection === section);
                
                // Video count and total length of videos in this section
                const sectionVideoCount = sectionVideos.length;
               
                return (
                    <div className={`${!isDemo && 'border-b border-[#ffffff8e] pb-2 '}`} key={section} >
                        <div className="w-full flex">
                            {/* Render video Section  */}
                            <div className="w-full flex justify-between items-center ">
                                <h2 className='text-[22px] text-black dark:text-white  '>{section}</h2>
                                <button
                                    className='mr-4 cursor-pointer text-black daark:text-white'
                                    onClick={()=>toggleSectionVisibility(section)}
                                >
                                    {isSectionVisible?(
                                        <BsChevronUp size={20}/>
                                    ):(
                                        <BsChevronDown size={20}/>
                                    )
                                }
                                </button>
                            </div>
                        </div>
                        <h5 className='text-black dark:text-white'>
                            {sectionVideoCount} Lessons {" "}
                            
                        </h5>
                        <br />
                        {
                            isSectionVisible && (
                                <div className="w-full">

                                </div>
                            )
                        }

                    </div>
                );
            })}
        </div>
    );
};

export default CourseContentList;
