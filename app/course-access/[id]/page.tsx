'use client'
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/app/redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const CourseContent = dynamic(() => import('../../components/Course/CourseContent'), {
  loading: () => <Loader message='Loading Content...' /> 
});

type Props = {
    params: any;
}

const Page = ({ params }: Props) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery({});
    const [isPurchased, setIsPurchased] = useState<boolean | null>(null);

    useEffect(() => {
        if (data) {
            const course = data.user.courses.find((item: any) => item.courseId === id);
            if (!course || error) {
                redirect("/");
            } else {
                setIsPurchased(true);
            }
        }
    }, [data, error, id]);

    if (isLoading || isPurchased === null) {
        return <Loader />;
    }

    return (
        
        <div>
            {isPurchased ? (
                <CourseContent id={id} user={data?.user} />
            ) : (
                <div>Access Denied</div> 
            )}
        </div>
    );
}

export default Page;
