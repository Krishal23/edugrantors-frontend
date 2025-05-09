import { useGetCourseContentQuery } from '@/app/redux/features/courses/coursesApi';
import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import dynamic from 'next/dynamic';

const CourseContentMedia = dynamic(() => import('./CourseContentMedia'), {
    loading: () => <Loader message='Loading Course Media...' />,
});
const CourseContentList = dynamic(() => import('./CourseContentList'), {
    loading: () => <Loader message='Loading Course Content...' />,
});


type Props = {
    id: string;
    user: any;
}

const CourseContent = ({ id, user }: Props) => {
    const { data: contentData, isLoading, refetch } = useGetCourseContentQuery(id,{})
    const [activeVideo, setActiveVideo] = useState(0);
    const [open, setOpen] = useState(false)
    const [route, setRoute] = useState('Login')
    const data = contentData?.content;

    return (
        <>{
            data && (
                <>
                    {
                        isLoading ? (
                            <Loader />
                        ) : (
                            <>
                                <Header
                                    activeItem={1}
                                    open={open}
                                    setOpen={setOpen}
                                    route={route}
                                    setRoute={setRoute}

                                />

                                <div className=" w-full min-h-screen pb-20 grid 800px:grid-cols-10 ">
                                    <Heading
                                        title={data[activeVideo]?.title || "EduGRANTORS"}
                                        description='anything'
                                        keywords={data[activeVideo]?.tags}
                                    />
                                    <div className=" col-span-7">
                                        <CourseContentMedia
                                            data={data}
                                            id={id}
                                            activeVideo={activeVideo}
                                            setActiveVideo={setActiveVideo}
                                            user={user}
                                            refetch={refetch}

                                        />
                                    </div>
                                    <div className="hidden 800px:block 800px:col-span-3 mt-4 mr-4">
                                        <CourseContentList
                                            data={data}
                                            activeVideo={activeVideo}
                                            setActiveVideo={setActiveVideo}

                                        />
                                    </div>

                                </div>
                            </>
                        )
                    }
                </>
            )
        }
        </>
    )
}

export default CourseContent