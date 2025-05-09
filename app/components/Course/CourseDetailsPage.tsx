import { useGetCourseDetailsQuery } from '@/app/redux/features/courses/coursesApi';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';

const CourseDetails = dynamic(() => import('./CourseDetails'), {
  loading: () => <Loader message='Loading Course Details...'/>, 
  ssr: false,
});

type Props = {
    id: string;
}

const CourseDetailsPage = ({ id }: Props) => {
    
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading, isError } = useGetCourseDetailsQuery(id); 

    if (isError) {
        return <div>Error loading course details. Please try again.</div>;
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    {data ? (
                        <>
                            <Heading
                                title={`${data.course.name} - EDU GRANTORS`}
                                description="EDU GRANTORS is a platform for learning."
                                keywords={data.course.tags}
                            />

                            <Header
                                open={open}
                                setOpen={setOpen}
                                activeItem={2}
                                setRoute={setRoute}
                                route={route}
                            />

                            <CourseDetails id={id} setOpen={setOpen} />

                        </>
                    ) : (
                        <div>No course details available.</div>
                    )}
                </div>
            )}
        </>
    );
}

export default CourseDetailsPage;
