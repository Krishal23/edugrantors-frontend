'use client'
import React, { useEffect, useState } from 'react'
import { useEditCourseMutation, useGetAllCourseQuery } from '@/app/redux/features/courses/coursesApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic';
import Loader from '../../Loader/Loader'

const CourseInformation = dynamic(() => import('./CourseInformation'), {
  loading: () => <Loader message='Loading Course Information...'/>,
});
const CourseOptions = dynamic(() => import('./CourseOptions'), {
  loading: () => <Loader message='Loading Course Data...'/>,
});
const CourseData = dynamic(() => import('./CourseData'), { 
  loading: () => <Loader message='Loading Course Data...'/>,
});
const CourseContent = dynamic(() => import('./CourseContent'), { 
  loading: () => <Loader message='Loading Course Content...'/>,
});
const CoursePreview = dynamic(() => import('./CoursePreview'), { 
  loading: () => <Loader message='Loading Course Preview...'/>,
});




const EditCourse = ({ id }: any) => {

    const[editCourse, {isSuccess, error}]= useEditCourseMutation();


    const { data, isLoading } = useGetAllCourseQuery({}, { refetchOnMountOrArgChange: true });

    const editCourseData = data && data.courses.find((i: any) => i._id === id);

    useEffect(()=>{
        if(isSuccess){
            toast.success("Course updated successfully");
           redirect("/admin/courses") 
        }
        if(error){
        if("data"  in error){

            const errorMessage = error as any;
            toast.error(errorMessage.data.message);
        }}
    },[isLoading,isSuccess,error])

    const [active, setActive] = useState(0);

    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData?.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData.thumbnail?.url,
            })
            setBenefits(editCourseData.benefits)
            setPrerequisites(editCourseData.prerequisites)
            setCourseContentData(editCourseData.courseData)
        }
    },[editCourseData])

   

    const [courseInfo, setCourseInfo] = useState({
        name: '',
        description: '',
        price: '',
        estimatedPrice: '',
        tags: '',
        level: '',
        demoUrl: '',
        thumbnail: '',
    });
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);
    const [courseData, setCourseData] = useState({});


    const handleSubmit = async () => {
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));

        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoSection: courseContent.videoSection,
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url
            })),
        }));

        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            estimatedPrice: courseInfo.estimatedPrice,
            price: courseInfo.price,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData
        };
        setCourseData(data);

    };

    const handleCourseCreate = async () => {
        const data = courseData;
        
        await editCourse({id: editCourseData?._id ,data})
        


    }

    return (
        <div className="  text-gray-900 dark:text-white">
            <div className="w-full flex min-h-screen ">
                <div className="w-[80%]">
                    {
                        active === 0 && (
                            <CourseInformation
                                courseInfo={courseInfo}
                                setCourseInfo={setCourseInfo}
                                active={active}
                                setActive={setActive}
                            />

                        )
                    }
                    {
                        active === 1 && (
                            <CourseData
                                benefits={benefits}
                                setBenefits={setBenefits}
                                prerequisites={prerequisites}
                                setPrerequisites={setPrerequisites}
                                active={active}
                                setActive={setActive}
                            />

                        )
                    }
                    {
                        active === 2 && (
                            <CourseContent
                                active={active}
                                setActive={setActive}
                                courseContentData={courseContentData}
                                setCourseContentData={setCourseContentData}
                                handleSubmit={handleSubmit}
                            />

                        )
                    }
                    {
                        active === 3 && (
                            <CoursePreview
                                active={active}
                                setActive={setActive}
                                courseData={courseData}
                                handleCourseCreate={handleCourseCreate}
                                isEdit={true}
                                isloading={isLoading}
                            />

                        )
                    }
                </div>
                <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                    <CourseOptions
                        active={active}
                        setActive={setActive}
                        
                    />
                </div>
            </div>
        </div>
    )
}

export default EditCourse