"use client"
import React, { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Modal, Typography } from '@mui/material';
import { AiOutlineEdit } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useDeleteCourseMutation, useGetAllCourseQuery } from '@/app/redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import toast from 'react-hot-toast';
import Link from 'next/link';


const AllCourses = () => {
    const { theme } = useTheme();

    const [open, setOpen] = useState(false)
    const [courseId] = useState("")
    const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({})

    const { data, isLoading, refetch } = useGetAllCourseQuery({},{ refetchOnMountOrArgChange: true });



    const rows: any[] = [];

    if (data && data.courses) {
        data.courses.forEach((item:any) => {
            rows.push({
                id: item._id,
                title: item.title || "",
                purchased: item.purchased || "N/A",
                ratings: item.ratings || "null",
                created_at: format(item.created_at),
                updated_at: format(item.updated_at),
            });
        });
    }

    const columns = [
        { field: "id", headerName: "ID", minWidth: 70, flex: 0.3 },
        {
            field: "title",
            headerName: "Course Title",
            minWidth: 200,
            flex: 1,
            renderCell: (params:any) => (
                <Link href={`/admin/course/${params.row.id}`} passHref>
                    {params.row.title}

                </Link>
            ),
        },
        // { field: "ratings", headerName: "Ratings", minWidth: 100, flex: 0.4 },
        { field: "purchased", headerName: "Purchased", minWidth: 120, flex: 0.4 },
        { field: "created_at", headerName: "Created At", minWidth: 130, flex: 0.5 },
        { field: "updated_at", headerName: "Updated At", minWidth: 130, flex: 0.5 },
        {
            field: "edit",
            headerName: "Edit",
            minWidth: 100,
            flex: 0.2,
            renderCell: (params: any) => (
                <Link href={`/admin/edit-course/${params.row.id}`} className='flex justify-center items-center h-full'>
                    <AiOutlineEdit
                        className={theme === "dark" ? "text-white" : "text-black"}
                        size={20}
                    />
                </Link>
            )
        },
        // {
        //     field: "delete",
        //     headerName: "Delete",
        //     minWidth: 100,
        //     flex: 0.2,
        //     renderCell: (params: any) => (
        //         <Button
        //             onClick={() => {
        //                 setOpen(!open)
        //                 setCourseId(params.row.id)
        //             }}
        //         >
        //             <AiOutlineDelete
        //                 className={theme === "dark" ? "text-white" : "text-black"}
        //                 size={20}
        //                 color='red'
        //             />
        //         </Button>
        //     )
        // }
    ];

    

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            refetch();
            toast.success("Course deleted successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as { data: { message: string } };
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, refetch])

    const handleDelete = async () => {
        const id = courseId
        await deleteCourse(id);

    }

    return (
        <div className="mt-[80px]">
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    mb: 1,
                    ml: 4,
                    fontWeight: 'bold',
                    fontSize: '2rem',
                    width: "fit-content",
                    color: theme === 'dark' ? '#E0E0E0' : '#333333', // Light gray for text in dark theme
                    textTransform: 'uppercase', // Capitalize the title for a more prominent look
                    letterSpacing: '1px', // Add letter spacing for a more styled look
                    backgroundColor: theme === 'dark' ? '#2D2D3A' : '#A4A9FC', // Dark background for dark theme, light background for light theme
                    padding: '12px 12px', // Add padding for better spacing around the title
                    borderRadius: '12px', // Slightly rounded corners for a smooth aesthetic
                    boxShadow: theme === 'dark' ? '0px 4px 12px rgba(0, 0, 0, 0.6)' : '0px 4px 12px rgba(0, 0, 0, 0.2)', // Stronger shadow for dark theme
                }}
            >
                My Courses
            </Typography>

            {isLoading ? (
                <Loader />
            ) : (
                <Box m="20px">
                    <Box
                        m="8px 16px"
                        height="60vh"
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "1px solid #333",
                                color: theme === "dark" ? "#fff" : "#000",
                                backgroundColor: theme === "dark" ? "#1E1E2F" : "#FFF",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme === "dark" ? "#333A56" : "#A4A9FC",
                                color: theme === "dark" ? "#000" : "#000",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                borderBottom: theme === "dark" ? "1px solid #444" : "1px solid rgba(224, 224, 224, 1)",
                            },
                            "& .MuiDataGrid-cell": {
                                color: theme === "dark" ? "#FFF" : "#000",
                                padding: "8px",
                            },
                            "& .MuiDataGrid-row": {
                                borderBottom: theme === "dark" ? "1px solid #333" : "1px solid #ccc",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: theme === "dark" ? "#333A56" : "#A4A9FC",
                                color: theme === "dark" ? "#FFF" : "#000",
                                borderTop: theme === "dark" ? "1px solid #444" : "1px solid rgba(224, 224, 224, 1)",
                                padding: "10px",
                            },
                            "& .MuiSvgIcon-root, & .MuiTablePagination-root": {
                                color: theme === "dark" ? "#FFF" : "#000",
                            },
                            "& .MuiCheckbox-root": {
                                color: theme === "dark" ? "#FFF" : "#000",
                            }
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            disableColumnMenu
                            // checkboxSelection
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 5 }, // ✅ Correct way to set the default page size
                                },
                            }}
                            pageSizeOptions={[5, 10, 20]}
                        />
                    </Box>
                    {open && (
                        <Modal
                            open={open}
                            onClose={() => setOpen(!open)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box
                                className={`absolute top-[50%] left-[50%] -translate-x-1/2 p-8 rounded-lg shadow-lg 
                   dark:bg-gray-800 dark:text-white bg-white text-gray-900`}
                            >
                                <h1
                                    className={`text-[2.5rem] font-bold leading-tight 
          dark:text-white  text-gray-900
        `}
                                >
                                    Are you sure you want to delete the user?
                                </h1>
                                <div className="flex w-full items-center justify-between mt-6">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className={`px-4 py-2 font-semibold rounded-md dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"  bg-gray-200 text-gray-800 bg-gray-300`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}

                                        className={`px-4 py-2 font-semibold rounded-md dark:bg-red-600 dark:text-white hover:bg-red-700" bg-red-500 text-white hover:bg-red-600`}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Box>
                        </Modal>
                    )}

                </Box>
            )}
        </div>
    );
};

export default AllCourses;
