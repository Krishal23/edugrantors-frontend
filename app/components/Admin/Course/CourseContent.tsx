import { useTheme } from 'next-themes';
import React, { FC, useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BiSolidPencil } from 'react-icons/bi';
import { BsLink45Deg } from 'react-icons/bs';
import toast from 'react-hot-toast';

type Props = {
    active: number;
    setActive: (index: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: () => void; // Explicit type for handleSubmit
}

const CourseContent: FC<Props> = ({
    active,
    setActive,
    courseContentData,
    setCourseContentData,
    handleSubmit: handleCourseSubmit
}) => {
    const [activeSection, setActiveSection] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState<boolean[]>([]);

    // Initialize collapsed state based on courseContentData length
    useEffect(() => {
        setIsCollapsed(Array(courseContentData.length).fill(false));
    }, [courseContentData.length]);

    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    };

    const handleRemoveLink = (index: number, linkIndex: number) => {
        setCourseContentData((prevData: any) => {
            // Clone the main array
            const updatedData = [...prevData];

            // Clone the specific item and its links array
            const itemToUpdate = { ...updatedData[index] };
            itemToUpdate.links = itemToUpdate.links ? [...itemToUpdate.links] : [];

            // Remove the link at the specified index
            itemToUpdate.links.splice(linkIndex, 1);

            // Assign the updated item back to the main array
            updatedData[index] = itemToUpdate;

            return updatedData;
        });
    };


    const handleAddLink = (index: number) => {
        setCourseContentData((prevData: any) => {
            // Clone the main array
            const updatedData = [...prevData];

            // Clone the specific item and its links array
            const itemToUpdate = { ...updatedData[index] };
            itemToUpdate.links = itemToUpdate.links ? [...itemToUpdate.links] : [];

            // Push a new link into the cloned links array
            itemToUpdate.links.push({ title: "", url: "" });

            // Assign the updated item back to the main array
            updatedData[index] = itemToUpdate;

            return updatedData;
        });
    };


    const newContentHandler = (item: any) => {
        if (!item.title || !item.description || !item.videoUrl || !item.links[0]?.title || !item.links[0]?.url) {
            toast.error("Please fill all the fields");
            return;
        }

        let newVideoSection = item.videoSection || "";

        if (courseContentData.length > 0) {
            const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;
            if (lastVideoSection) {
                newVideoSection = lastVideoSection;
            }
        }

        const newContent = {
            videoUrl: item.videoUrl || "",
            title: item.title || "",
            description: item.description || "",
            videoSection: newVideoSection,
            links: item.links.length > 0 ? item.links : [{ title: "", url: "" }],
        };

        setCourseContentData([...courseContentData, newContent]);
    };

    const addNewSection = () => {
        const lastSection = courseContentData[courseContentData.length - 1];

        // Validate the last section before adding a new one
        if (!lastSection || !lastSection.title || !lastSection.description || !lastSection.videoUrl || !lastSection.links[0]?.title || !lastSection.links[0]?.url) {
            toast.error('Please fill all the fields.');
            return;
        }

        setActiveSection(activeSection + 1);

        const newSection = {
            videoSection: `Section ${activeSection + 1}`,
            title: '',
            description: '',
            videoUrl: '',
            links: [{ title: '', url: '' }],
        };

        setCourseContentData([...courseContentData, newSection]);
    };

    const handleOptions = () => {
        const lastSection = courseContentData[courseContentData.length - 1];

        // Validate the last section before submitting
        if (!lastSection || !lastSection.title || !lastSection.description || !lastSection.videoUrl || !lastSection.links[0]?.title || !lastSection.links[0]?.url) {
            toast.error("Please fill all the fields. Section cannot be empty.");
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    };

    const { theme } = useTheme();

    const formClass = theme === 'dark' ? '' : '';
    const inputClass = theme === 'dark' ? 'border-gray-600 focus:border-indigo-500 text-gray-200' : 'border-gray-300 focus:border-indigo-500 ';
    const labelClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const buttonClass = theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white';

    return (
        <div className=" w-[80%] m-auto p-3">
            <form onSubmit={handleCourseSubmit} className={`p-6 rounded-lg shadow-md ${formClass}`}>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput =
                        index === 0 ||
                        item.videoSection !== courseContentData[index - 1].videoSection;

                    return (
                        <div
                            key={index}
                            className={`w-full text-zinc-800 dark:text-white bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}
                        >
                            {showSectionInput && (
                                <div className=" flex w-full items-center justify-between">
                                    <input
                                        type="text"
                                        placeholder="Untitled Section"
                                        className={`text-[20px]  font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                        value={item.videoSection }
                                        onChange={(e) => {
                                            const updatedData = courseContentData.map((item: any, i: number) => {
                                                if (i === index) {
                                                    return { ...item, videoSection: e.target.value }; // Create a new object
                                                }
                                                return item;
                                            });
                                            setCourseContentData(updatedData);
                                        }}
                                       

                                    />
                                    <BiSolidPencil className="cursor-pointer dark:text-white text-black ml-2" />
                                </div>
                            )}

                            <div className={`flex justify-between items-center w-full ${labelClass}`}>
                                {isCollapsed[index] && item.title && (
                                    <p className="font-Poppins dark:text-white text-black">
                                        {index + 1}. {item.title}
                                    </p>
                                )}
                                <div className="flex items-center">
                                    <AiOutlineDelete
                                        className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                        onClick={() => {
                                            if (index > 0) {
                                                const updatedData = [...courseContentData];
                                                updatedData.splice(index, 1);
                                                setCourseContentData(updatedData);
                                            }
                                        }}
                                    />
                                    <MdOutlineKeyboardArrowDown
                                        fontSize="large"
                                        className={`dark:text-white text-black`}
                                        style={{
                                            transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)",
                                        }}
                                        onClick={() => handleCollapseToggle(index)}
                                    />
                                </div>
                            </div>

                            {!isCollapsed[index] && (
                                <>
                                    <div className="my-3">
                                        <label className={`flex justify-between items-center w-full ${labelClass}`}>
                                            Video Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Project Plan..."
                                            className={`flex justify-between border bg-transparent p-2 mt-4 items-center w-full ${inputClass}`}
                                            value={item.title}
                                            onChange={(e) => {
                                                const updatedData = courseContentData.map((item: any, i: number) => {
                                                    if (i === index) {
                                                        return { ...item, title: e.target.value }; // Create a new object
                                                    }
                                                    return item;
                                                });
                                                setCourseContentData(updatedData);
                                            }}

                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className={`flex justify-between items-center w-full ${labelClass}`}>
                                            Video URL
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="https://example.com"
                                            className={`flex justify-between border bg-transparent p-2 mt-4 items-center w-full ${inputClass}`}
                                            value={item.videoUrl}
                                            onChange={(e) => {
                                                const updatedData = courseContentData.map((item: any, i: number) => {
                                                    if (i === index) {
                                                        return { ...item, videoUrl: e.target.value }; // Create a new object
                                                    }
                                                    return item;
                                                });
                                                setCourseContentData(updatedData);
                                            }}

                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className={`flex justify-between items-center w-full ${labelClass}`}>
                                            Video Description
                                        </label>
                                        <textarea
                                            rows={6}
                                            cols={30}
                                            placeholder="Description of the video"
                                            className={`flex justify-between border !h-min bg-transparent p-2 mt-4 items-center w-full ${inputClass}`}
                                            value={item.description}
                                            onChange={(e) => {
                                                const updatedData = courseContentData.map((item: any, i: number) => {
                                                    if (i === index) {
                                                        return { ...item, description: e.target.value }; // Create a new object
                                                    }
                                                    return item;
                                                });
                                                setCourseContentData(updatedData);
                                            }}

                                        />
                                        <br />
                                    </div>
                                    {item?.links.map((link: any, linkIndex: number) => (
                                        <div className="mb-3 block" key={`link-${linkIndex}`}>
                                            <div className="w-full flex items-center justify-between">
                                                <label className={`${labelClass}`}>
                                                    Link {linkIndex + 1}
                                                </label>
                                                <AiOutlineDelete
                                                    className={`${linkIndex === 0
                                                        ? "cursor-no-drop"
                                                        : "cursor-pointer"
                                                        } text-black dark:text-white text-[20px]`}
                                                    onClick={() =>
                                                        linkIndex === 0
                                                            ? null
                                                            : handleRemoveLink(index, linkIndex)
                                                    }
                                                />
                                            </div>
                                            <input
                                                list="title-options" // Connect input with datalist
                                                type="text"
                                                placeholder="Link Title(eg: Live/Resorces/DPP)"
                                                className={`flex justify-between border bg-transparent p-2 mt-4 items-center w-full ${inputClass}`}
                                                value={link.title}
                                                onChange={(e) => {
                                                    const updatedData = courseContentData.map((item: any, i: number) => {
                                                        if (i === index) {
                                                            return {
                                                                ...item,
                                                                links: item.links.map((link: { title: string, url: string }, j: number) => {
                                                                    if (j === linkIndex) {
                                                                        return { ...link, title: e.target.value };
                                                                    }
                                                                    return link;
                                                                }),
                                                            };
                                                        }
                                                        return item;
                                                    });
                                                    setCourseContentData(updatedData);
                                                }}
                                            />

                                            {/* Datalist for predefined options */}
                                            <datalist id="title-options">
                                                <option value="Live Class" />
                                                <option value="DPP" />
                                                <option value="Resources" />
                                            </datalist>

                                            <input
                                                type='url'
                                                placeholder='Source Code URL... (Link URL)'
                                                className={`flex justify-between border bg-transparent p-2 mt-4 items-center w-full ${inputClass}`}
                                                value={link.url}
                                                onChange={(e) => {
                                                    const updatedData = courseContentData.map((item: any, i: number) => {
                                                        if (i === index) {
                                                            return {
                                                                ...item,
                                                                links: item.links.map((link: { title: string, url: string }, j: number) => {
                                                                    if (j === linkIndex) { // Use 'j' for the inner loop index
                                                                        return { ...link, url: e.target.value };
                                                                    }
                                                                    return link;
                                                                }),
                                                            };
                                                        }
                                                        return item;
                                                    });
                                                    setCourseContentData(updatedData);
                                                }}

                                            />

                                        </div>
                                    ))}
                                    <br />
                                    <div className="inline-block mb-4">
                                        <p
                                            className="flex items-center text-[18px] dark:text-white text-black cursor-pointer "
                                            onClick={() => handleAddLink(index)}
                                        >
                                            <BsLink45Deg className="mr-2" /> Add Link
                                        </p>

                                    </div>
                                </>
                            )}
                            <br />
                            {/* add new content  */}
                            {
                                index === courseContentData.length - 1 && (
                                    <div>
                                        <p
                                            className='flex items-center text-[18px] dark:text-white text-black cursor-pointer '
                                            onClick={(e: any) => newContentHandler(item)}
                                        >
                                            <AiOutlinePlusCircle className="mr-2" /> Add New Content
                                        </p>
                                    </div>
                                )
                            }

                        </div>
                    );
                })}

                <br />
                <div
                    className='flex items-center text-[20px] dark:text-white text-black cursor-pointer '
                    onClick={() => addNewSection()}
                >
                    <AiOutlinePlusCircle className="mr-2" /> Add New Section


                </div>
            </form>

            {/* Previous and Next buttons */}
            <div className="flex justify-between mt-6">
                <button
                    className={`py-2 px-6 rounded-md transition ${buttonClass}`}
                    onClick={() => setActive(active - 1)} // Replace this with your logic for 'Previous'
                >
                    Previous
                </button>

                <button
                    className={`py-2 px-6 rounded-md transition ${buttonClass}`}
                    onClick={handleOptions} // Replace this with your logic for 'Next'
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CourseContent;
