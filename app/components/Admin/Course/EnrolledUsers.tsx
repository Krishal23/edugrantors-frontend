"use client";

import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Alert, Button } from "@mui/material";
import { useTheme } from "next-themes";
import { useGetEnrolledUsersQuery, useUnEnrollUserMutation } from "@/app/redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { useGetCourseDetailsQuery } from '@/app/redux/features/courses/coursesApi';
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { IoRefreshCircleOutline } from "react-icons/io5";

type Props = {
  id: string;
};

type EnrolledUser = {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  gender: string;
  role: string;
  isEnrolled: boolean;
};

const UserEnrollmentActions = dynamic(() => import('./UserEnrollmentActions'), {
  loading: () => <div className="py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse">Loading...</div>,
});

const EnrolledUsers: FC<Props> = ({ id }) => {
  const { theme } = useTheme();
  const [, setRefreshTrigger] = useState(0);
  const [rows, setRows] = useState<EnrolledUser[]>([]);
  
  // Queries with automatic refetching
  const { 
    data: usersData, 
    error: usersError, 
    isLoading: usersLoading,
    refetch: refetchUsers,
    isError: isUsersError
  } = useGetEnrolledUsersQuery(id, {
    refetchOnMountOrArgChange: true
  });
  
  const { 
    data: courseData, 
    error: courseError, 
    isLoading: courseLoading,
    isError: isCourseError 
  } = useGetCourseDetailsQuery(id, {
    refetchOnMountOrArgChange: true
  });
  
  const [unEnrollUser, { 
    isLoading: isUnenrolling, 
    isSuccess: isUnenrollSuccess,
    isError: isUnenrollError,
    error: unenrollError 
  }] = useUnEnrollUserMutation();

  // Combined loading and error states
  const isLoading = usersLoading || courseLoading;
  const hasError = isUsersError || isCourseError;
  const errorMessage = usersError || courseError;
  
  // Update rows when data changes
  useEffect(() => {
    if (usersData?.enrolledUsers) {
      const formattedRows = usersData.enrolledUsers.map((user: any) => ({
        id: user._id,
        name: user.name || "N/A",
        email: user.email || "N/A",
        contactNumber: user.contactnumber || "N/A",
        gender: user.gender || "N/A",
        role: user.role || "N/A",
        isEnrolled: true
      }));
      setRows(formattedRows);
    }
  }, [usersData]);
  
  // Handle unenrollment success/error
  useEffect(() => {
    if (isUnenrollSuccess) {
      toast.success("User unenrolled successfully");
      refetchUsers();
    }
    
    if (isUnenrollError && unenrollError) {
      let errorMsg = "Failed to unenroll user";
      if ('data' in unenrollError && typeof unenrollError.data === 'object' && unenrollError.data && 'message' in unenrollError.data) {
        errorMsg = (unenrollError.data as { message: string }).message || errorMsg;
      }
      toast.error(errorMsg);
    }
  }, [isUnenrollSuccess, isUnenrollError, unenrollError, refetchUsers]);
  
  // Refresh data handler
  const handleRefresh = () => {
    refetchUsers();
    setRefreshTrigger(prev => prev + 1);
    toast.success("Refreshing data...");
  };
  
  // Handle unenroll
  const handleUnenroll = async (userId: string, courseId: string) => {
    try {
      await unEnrollUser({ userId, courseId }).unwrap();
    } catch  {
      toast.error("Failed to unenroll user");}
  };

  const columns: GridColDef[] = [
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
          onUnenroll={handleUnenroll}
        />
      ),
    },
  ];

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] w-full">
        <Loader message="Loading enrolled users..." />
      </div>
    );
  }

  const courseName = courseData?.course?.name || "this course";

  return (
    <div className="text-gray-900 dark:text-white mt-[80px] ml-[3rem] w-[70vw]">
      <Box mb="20px" mx="20px">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Enrolled Users for {courseName}
          </h1>
          <Button 
            variant="contained" 
            onClick={handleRefresh}
            className=""
            disabled={isLoading || isUnenrolling}
            sx={{ 
              backgroundColor: theme === "dark" ? "transparent" : "#1976d2",
              
            }}
          >
            <IoRefreshCircleOutline size={30}/>
          </Button>
        </div>
        
        {hasError && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              <Button color="inherit" size="small" onClick={handleRefresh}>
                Retry
              </Button>
            }
          >
            Error loading data: {errorMessage?.toString() || "Unknown error occurred"}
          </Alert>
        )}
        
        {isUnenrolling && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Processing unenrollment...
          </Alert>
        )}
        
        {!hasError && rows.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            No users enrolled in this course.
          </Alert>
        ) : (
          <Box
            m="20px 0"
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
              "& .MuiDataGrid-overlay": {
                backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.8)",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              disableColumnMenu
              loading={isLoading || isUnenrolling}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
                sorting: {
                  sortModel: [{ field: 'name', sort: 'asc' }],
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              getRowClassName={() => 
                isUnenrolling ? "opacity-50" : ""
              }
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default EnrolledUsers;