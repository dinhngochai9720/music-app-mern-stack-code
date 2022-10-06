import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineCloudDownload,
  AiOutlineHome,
} from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaRegUserCircle, FaCrown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsHeart, BsMusicPlayer } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiVipDiamondLine } from "react-icons/ri";
import { IoHome } from "react-icons/io5";

import { NavLink, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { useStateValue } from "../../context/StateProvider";
import { app } from "../../config/firebase.config";
import { isActiveAdminStyles, isNotActiveAdminStyles } from "../../utils/style";
import { actionType } from "../../context/reducer";

const AdminHeader = () => {
  const [{ user, isMenuAdmin }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [isMenu, setIsMenu] = useState(false);
  const [isSettingIconHover, setIsSettingIconHover] = useState(false);
  const [isDownloadIconHover, setIsDownloadIconHover] = useState(false);

  const handleLogOut = () => {
    const firebaseAuth = getAuth(app);

    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((error) => console.log(error));

    //   Dang xuat thanh cong chuyen ve trang login
    navigate("/login", { replace: true });
  };

  const handleToggleMenuAdmin = () => {
    // setIsMenu(!isMenu);
    dispatch({ type: actionType.TOGGLE_MENU_ADMIN, isMenuAdmin: !isMenuAdmin });
  };

  const handleOffMenuAdmin = () => {
    dispatch({ type: actionType.TOGGLE_MENU_ADMIN, isMenuAdmin: false });
  };
  return (
    // w-full flex items-center p-4 md:py-2 md:px-6
    <header className="flex items-center justify-between md:py-6 md:px-6 border-b-[1px] border-b-card w-full h-[15%] ">
      {/* Header left */}
      <div
        className="flex items-center justify-around gap-6 w-[70%] "
        onClick={handleOffMenuAdmin}
      >
        <NavLink
          to={"/admin/home"}
          className={({ isActive }) =>
            isActive ? isActiveAdminStyles : isNotActiveAdminStyles
          }
        >
          <IoHome className="" />
        </NavLink>

        <NavLink
          to={"/admin/users"}
          className={({ isActive }) =>
            isActive ? isActiveAdminStyles : isNotActiveAdminStyles
          }
        >
          Tài khoản
        </NavLink>

        <NavLink
          to={"/admin/songs"}
          className={({ isActive }) =>
            isActive ? isActiveAdminStyles : isNotActiveAdminStyles
          }
        >
          Bài hát
        </NavLink>

        <NavLink
          to={"/admin/artists"}
          className={({ isActive }) =>
            isActive ? isActiveAdminStyles : isNotActiveAdminStyles
          }
        >
          Nghệ sĩ
        </NavLink>

        <NavLink
          to={"/admin/albums"}
          className={({ isActive }) =>
            isActive ? isActiveAdminStyles : isNotActiveAdminStyles
          }
        >
          Albums
        </NavLink>
      </div>

      {/* Header right */}
      <div className="flex items-center justify-evenly w-[250px] relative">
        <img
          //   onMouseEnter={() => setIsMenu(true)}
          //   onMouseLeave={() => setIsMenu(false)}
          onClick={handleToggleMenuAdmin}
          src={user?.user.imageUrl}
          alt="img"
          className="w-[40px] h-[40px] min-w-[20px] object-cover rounded-full shadow-lg cursor-pointer"
          referrerPolicy="no-referrer"
        />

        <div className="flex flex-col" onClick={handleOffMenuAdmin}>
          <p className="text-textColor2  text-sm  hover:text-textHover font-semibold">
            {user?.user?.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-textColor2  hover:text-textHover font-normal">
            Admin
            <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>

        {isMenuAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-[140px] w-[180px] gap-2 bg-adminBgColor2 text-textColor2 rounded-lg shadow-lg backdrop-blur-sm flex flex-col py-4"
          >
            {/* <NavLink to={"/userProfile"}>
              <p className="flex  items-center gap-4 py-2 px-4 text-base hover:text-textHover hover:bg-activeColor cursor-pointer duration-100 ease-in-out transition-all">
                <CgProfile className="text-blue-500" />
                Tài khoản
              </p>
            </NavLink> */}

            <NavLink to={"/home"} onClick={handleOffMenuAdmin}>
              <p className="flex  items-center gap-4 py-2 px-4 text-base hover:text-textHover hover:bg-adminBgFocus cursor-pointer duration-100 ease-in-out transition-all">
                <BsMusicPlayer className="text-card" />
                Trang chủ
              </p>
            </NavLink>

            <hr className="border-1 border-card border-solid" />

            {/* Role = "admin" ==> show screen */}
            {/* {user?.user?.role === "admin" && (
              <NavLink to={"/admin/home"}>
                <p className="flex  items-center gap-4 py-2 px-4 text-base hover:text-textHover hover:bg-activeColor cursor-pointer duration-100 ease-in-out transition-all">
                  <MdOutlineAdminPanelSettings className="text-card " />
                  Admin
                </p>
              </NavLink>
            )} */}

            <p
              onClick={() => {
                handleLogOut();
                handleOffMenuAdmin();
              }}
              className="flex  items-center gap-4 py-2 px-4 text-base hover:text-textHover hover:bg-adminBgFocus cursor-pointer duration-100 ease-in-out transition-all"
            >
              <FiLogOut className="text-card" />
              Đăng xuất
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
