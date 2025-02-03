"use client";

import React, { FC } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetEnrolledUsersQuery, useUnEnrollUserMutation } from "@/app/redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { useGetCourseDetailsQuery } from '@/app/redux/features/courses/coursesApi';
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

type Props = {
  id: string;
};


const UserEnrollmentActions = dynamic(() => import('./UserEnrollmentActions'), {
  loading: () => <Loader message='Loading Question BANK...' />,
});
const EnrolledUsers: FC<Props> = ({ id }) => {
  const { theme } = useTheme();
  const { data, error, isLoading } = useGetEnrolledUsersQuery(id);
  const { data:course, error:courseError, isLoading:courseLoading } = useGetCourseDetailsQuery(id);
  const [ unEnrollUser ] = useUnEnrollUserMutation();

  const columns = [
    { field: "id", headerName: "ID", minWidth: 70, flex: 0.3 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 120, flex: 0.5 },
    { field: "contactNumber", headerName: "Contact Number", minWidth: 150, flex: 0.5 },
    { field: "gender", headerName: "Gender", minWidth: 80, flex: 0.3 },
    { field: "role", headerName: "Role", minWidth: 80, flex: 0.4 },
    {
      field: "enrollment",
      headerName: "Enrollment",
      minWidth: 150,
      flex: 0.6,
      renderCell: (params: any) => (
        <UserEnrollmentActions
          userId={params.row.id}
          courseId={id}
          isEnrolled={params.row.isEnrolled}
          onUnenroll={async(userId, courseId) => {
            const response=await unEnrollUser({userId,courseId})
          }}
        />
      ),
    },
  ];

  const rows =
    data?.enrolledUsers?.map((user: any) => ({
      id: user._id,
      name: user.name || "N/A",
      email: user.email || "N/A",
      contactNumber: user.contactnumber || "N/A",
      gender: user.gender || "N/A",
      role: user.role || "N/A",
      isEnrolled: true
      // isVerified: user.isVerified ? "Yes" : "No",
      // courses: user.courses?.map((course: any) => course.courseId) || [],
      // testsAttempted: user.testsAttempted || [],
    })) || [];

  return (
    <div className=" text-gray-900 dark:text-white mt-[80px] ml-[3rem] w-[70vw]">
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <div>Error loading data</div>
      ) : (
        <Box mb="20px" mx="20px">
          <h1 className="text-2xl font-bold mb-4">
            Enrolled Users for {course.course.name}
          </h1>
          {rows.length === 0 ? (
            <p>No users enrolled in this course.</p>
          ) : (
            <Box
              m="40px 16px"
              height="70vh"
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
                },
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                disableColumnMenu
                initialState={{
                  pagination: {
                      paginationModel: { pageSize: 5 }, // ✅ Correct way to set the default page size
                  },
              }}
              pageSizeOptions={[5, 10, 20]}
              />
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

export default EnrolledUsers;
