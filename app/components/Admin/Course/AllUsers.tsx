"use client";
import React, { FC, useEffect, useState } from 'react';
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { AiOutlineEdit, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/app/redux/features/user/userApi';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import toast from 'react-hot-toast';
import { FaRegEye } from 'react-icons/fa';
import { TbDatabaseExport } from "react-icons/tb";
import Link from 'next/link';
import * as XLSX from 'xlsx';

type Props = {
    isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
    const { theme } = useTheme();
    const [, setRole] = useState("admin");
    const [userId, setUserId] = useState<string>("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const { data, isLoading } = useGetAllUsersQuery({});
    const [updateUserRole, { isSuccess }] = useUpdateUserRoleMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Role Updated Successfully");
        }
    }, [isSuccess]);

    const columns = [
        { field: "id", headerName: "ID", minWidth: 70, flex: 0.3 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params: any) => (
                <div className="flex items-center justify-between w-full">
                    <span>{params.row.name}</span>
                    <Link href={`/admin/user/${params.row.id}`} passHref>
                        <FaRegEye size={20} color="gray" />
                    </Link>
                </div>
            )
        },
        { field: "email", headerName: "Email", minWidth: 120, flex: 0.4 },
        { field: "contact", headerName: "Contact", minWidth: 120, flex: 0.4 },
        {
            field: "role",
            headerName: "Role",
            minWidth: 120,
            flex: 0.4,
            renderCell: (params:any) => (
                <div className="flex items-center justify-between w-full">
                    <span>{params.row.role}</span>
                    {params.row.role !== "admin" && (
                        <Button
                            onClick={(e) => handleRoleMenuOpen(e, params.row.id)}
                        >
                            <AiOutlineEdit size={20} />
                        </Button>
                    )}
                </div>
            )
        },
        { field: "courses", headerName: "Purchased Courses", minWidth: 60, flex: 0.5 },
        { field: "created_at", headerName: "Joined At", minWidth: 80, flex: 0.5 },
        {
            field: "email_icon",
            headerName: "",
            minWidth: 100,
            flex: 0.2,
            renderCell: (params:any) => (
                <a href={`mailto:${params.row.email}`}>
                    <AiOutlineMail size={20} color="gray" />
                </a>
            )
        }
    ];

    const rows: any[] = [];
    console.log("Data", data);

    if (isTeam) {
        const newData = data?.users.filter((user: any) =>
            user.role === 'admin' || user.role === 'teacher'
        );
        newData?.forEach((user: any) => {
            rows.push({
                id: user._id,
                name: user.name || "",
                email: user.email || "N/A",
                contact: user.contactnumber || "N/A",
                role: user.role || "null",
                courses: user.courses.length || 0,
                created_at: format(user.created_at)
            });
        });
    } else if (data && data.users) {
        data.users.forEach((user: any) => {
            rows.push({
                id: user._id,
                name: user.name || "",
                email: user.email || "N/A",
                contact: user.contactnumber || "N/A",
                role: user.role || "null",
                courses: user.courses.length || 0,
                created_at: format(user.created_at)
            });
        });
    }

    const handleRoleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: string) => {
        setUserId(userId);
        setAnchorEl(event.currentTarget);
    };

    const handleRoleChange = async (newRole: string) => {
        await updateUserRole({ id: userId, role: newRole });
        setRole(newRole);
        setAnchorEl(null);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        XLSX.writeFile(wb, "Users_Data.xlsx");
    };

    return (
        <div className="mt-[80px]">
            <div className="flex justify-between items-end">
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                        mb: 1,
                        ml: 4,
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        width: "fit-content",
                        color: theme === 'dark' ? '#E0E0E0' : '#333333',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        backgroundColor: theme === 'dark' ? '#2D2D3A' : '#A4A9FC',
                        padding: '12px 12px',
                        borderRadius: '12px',
                        boxShadow: theme === 'dark'
                            ? '0px 4px 12px rgba(0, 0, 0, 0.6)'
                            : '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    {isTeam ? 'Manage Team' : 'All Users'}
                </Typography>

                <Button onClick={exportToExcel} variant="contained" color="primary">
                    <TbDatabaseExport />
                </Button>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <Box mb="8px" mx="20px">
                    <Box
                        m="40px 16px"
                        height="60vh"
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "1px solid #333",
                                color: theme === "dark" ? "#fff" : "#000",
                                backgroundColor: theme === "dark" ? "#1E1E2F" : "#FFF",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme === "dark" ? "#333A56" : "#A4A9FC",
                                color: "#000",
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
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20]}
                        />
                    </Box>
                </Box>
            )}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => handleRoleChange('teacher')}>Assign as Teacher</MenuItem>
                <MenuItem onClick={() => handleRoleChange('user')}>Assign as User</MenuItem>
            </Menu>
        </div>
    );
};

export default AllUsers;
