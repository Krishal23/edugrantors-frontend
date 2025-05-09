"use client";
import { FC, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import WebIcon from "@mui/icons-material/Web";
// import QuizIcon from "@mui/icons-material/Quiz";
// import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
// import SettingsIcon from "@mui/icons-material/Settings";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import AnalyticsIcon from "@mui/icons-material/Analytics";
import Diversity3Icon from "@mui/icons-material/Diversity3";

// Fixed typo in path
import { useSelector } from "react-redux";
import Link from "next/link";

import { useTheme } from "next-themes";
import { MdAutoStories } from "react-icons/md";

import ThemeSwitcher from "@/app/utils/ThemeSwitcher";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (value: string) => void;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link href={to} passHref>
        <Typography className="text-[16px] text-black dark:text-white !font-Poppins">
          {title}
        </Typography>
      </Link>
    </MenuItem>
  );
};

const Sidebar = () => {
  const logo = "/assets/edugrantorsLogo.png";
  const avatarDefault = "/assets/avatar.png";
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background:
            theme === "dark" ? "#111C43 !important" : "#fff !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: theme === "dark" ? "#fff" : "#000",
        },
      }}
      className="bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0px 20px 0px",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  {/* <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                                        EDU GRANTORS
                                    </h3> */}
                  <img
                    src={logo}
                    alt="User Avatar"
                    width={180}
                    height={180}
                    // className="mb-4"
                  />
                </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <ArrowBackIosIcon className="text-black dark:text-white" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user?.avatar?.url || avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                    display: "block",
                    objectFit: "cover",
                    height: "100px",
                    width: "100px",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  className="text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <div className="flex justify-around">
                  <ThemeSwitcher />
                  <Typography
                    variant="subtitle1"
                    sx={{ m: "4px 0 0 0" }}
                    className=" text-black dark:text-[#ffffffc1] capitalize"
                  >
                    {user?.role}
                  </Typography>
                </div>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <Item
                            title="Dashboard"
                            to="/admin"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            
                        /> */}

            {user.role === "admin" && (
              <>
                <Typography
                  variant="h5"
                  sx={{ m: "15px 0 5px 25px" }}
                  className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                >
                  {!isCollapsed && "Data"}
                </Typography>
                <Item
                  title="Users"
                  to="/admin/users"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {/* <Item
                            title="Invoices"
                            to="/admin/invoices"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                         */}
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Item
                            title="Create Quiz"
                            to="/admin/create-quiz"
                            icon={<WebIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}
            <Item
              title="Create Quiz"
              to="/admin/create-quiz2"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!isCollapsed && "Resources"}
            </Typography>
            <Item
              title="Question Bank"
              to="/admin/question-bank"
              icon={<MdAutoStories size={20} />}
              selected={selected}
              setSelected={setSelected}
            />

            {user.role === "admin" && (
              <>
                <Typography
                  variant="h5"
                  sx={{ m: "15px 0 5px 25px" }}
                  className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                >
                  {!isCollapsed && "Controllers"}
                </Typography>
                <Item
                  title="ManageTeam"
                  to="/admin/team"
                  icon={<Diversity3Icon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {/* <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                        >
                            {!isCollapsed && "Customization"}
                        </Typography>
                        <Item
                            title="Hero"
                            to="/admin/customize-hero"
                            icon={<WebIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ"
                            to="/admin/customize-faq"
                            icon={<QuizIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Categories"
                            to="/admin/customize-categories"
                            icon={<ManageHistoryIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                        >
                            {!isCollapsed && "Controllers"}
                        </Typography>
                        <Item
                            title="ManageTeam"
                            to="/admin/team"
                            icon={<Diversity3Icon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                        >
                            {!isCollapsed && "CourseAnalytics"}
                        </Typography>
                        <Item
                            title="Courses Analytics"
                            to="/admin/customize-analytics"
                            icon={<AnalyticsIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}
            {/* <Typography
                            variant="h5"
                            sx={{ m: "15px 0 5px 25px" }}
                            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
                        >
                             {!isCollapsed && "CourseAnalytics"}
                        </Typography>
                        <Item
                            title="Courses Analytics"
                            to="/admin/courses-analytics"
                            icon={<AnalyticsIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
