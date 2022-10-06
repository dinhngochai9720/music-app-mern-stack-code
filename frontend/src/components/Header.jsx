import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaRegUserCircle, FaCrown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsHeart } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiVipDiamondLine } from "react-icons/ri";

import { useStateValue } from "../context/StateProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { actionType } from "../context/reducer";

const Header = () => {
  const [{ user, isMenuUser }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const navigate = useNavigate();

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

  // const handleToggleMenuUser = () => {
  //   setIsMenu(!isMenu);
  // };

  const handleToggleMenuUser = () => {
    // setIsMenu(!isMenu);
    dispatch({ type: actionType.TOGGLE_MENU_USER, isMenuUser: !isMenuUser });
  };

  const handleOffMenuUser = () => {
    dispatch({ type: actionType.TOGGLE_MENU_USER, isMenuUser: false });
  };
  return (
    // w-full flex items-center p-4 md:py-2 md:px-6
    <header
      className="flex items-center justify-between md:py-6 md:px-6  border-b-[1px] border-b-card w-full h-[15%] "
      // onClick={handleOffMenuUser}
    >
      {/* Header left */}
      <div
        className="flex items-center justify-center gap-6 text-xl "
        onClick={handleOffMenuUser}
      >
        <AiOutlineArrowLeft className="hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all" />
        <AiOutlineArrowRight className="hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all" />
      </div>

      {/* Header middle */}

      <div
        className="flex items-center w-[500px] gap-2  bg-seconday py-2 px-4 rounded-full mr-[250px] focus-within:bg-activeColor text-textHover "
        onClick={handleOffMenuUser}
      >
        <IoSearchOutline className="text-2xl" />
        <input
          type="text"
          placeholder="Tìm kiếm bài hát, nghệ sĩ, album,..."
          className="border-none outline-none w-full  bg-seconday  focus:bg-activeColor placeholder:text-textHover"
        />
      </div>

      {/* Header right */}
      <div className="flex items-center justify-around w-[300px] relative">
        <AiOutlineCloudDownload
          onMouseEnter={() => setIsDownloadIconHover(true)}
          onMouseLeave={() => setIsDownloadIconHover(false)}
          onClick={handleOffMenuUser}
          className="w-[40px] h-[40px] p-[10px] bg-seconday rounded-full  hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all"
        />
        {isDownloadIconHover && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-11 right-[240px] w-[70px] text-xs font-light  bg-loaderOverlay text-textHover rounded-lg shadow-lg backdrop-blur-sm py-[2px]flex items-center text-center"
          >
            Tải xuống
          </motion.div>
        )}

        <FiSettings
          onMouseEnter={() => setIsSettingIconHover(true)}
          onMouseLeave={() => setIsSettingIconHover(false)}
          onClick={handleOffMenuUser}
          className="w-[40px] h-[40px] p-[10px] bg-seconday rounded-full  hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all"
        />
        {isSettingIconHover && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-11 right-[185px] w-[70px] text-xs font-light  bg-loaderOverlay text-textHover rounded-lg shadow-lg backdrop-blur-sm py-[2px]flex items-center text-center"
          >
            Cài đặt
          </motion.div>
        )}

        {/* <FaRegUserCircle className="w-[50px] h-[50px] p-4 bg-seconday rounded-full  hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all" /> */}

        <img
          //   onMouseEnter={() => setIsMenu(true)}
          //   onMouseLeave={() => setIsMenu(false)}
          onClick={handleToggleMenuUser}
          src={user?.user.imageUrl}
          alt="img"
          className="w-[40px] h-[40px] min-w-[20px] object-cover rounded-full shadow-lg cursor-pointer"
          referrerPolicy="no-referrer"
        />

        <div className="flex flex-col" onClick={handleOffMenuUser}>
          <p className="text-textColor2  text-sm  hover:text-textHover font-semibold">
            {user?.user?.name}
          </p>
          {user?.user?.role === "Admin" ? (
            <p className="flex items-center gap-2 text-xs text-textColor2  hover:text-textHover font-normal">
              Admin
              <FaCrown className="text-sm -ml-1 text-yellow-500" />
            </p>
          ) : (
            <p className="flex items-center gap-2 text-xs text-textColor2  hover:text-textHover font-normal">
              Member
              <RiVipDiamondLine className="text-sm -ml-1 text-blue-400" />
            </p>
          )}
        </div>

        {isMenuUser && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-[140px] w-[180px] gap-2 bg-seconday text-textColor2 rounded-lg shadow-lg backdrop-blur-sm flex flex-col py-4"
          >
            <NavLink to={"/userProfile"} onClick={handleOffMenuUser}>
              <p className="flex  items-center gap-4 py-2 px-4 text-base hover:text-textHover hover:bg-activeColor cursor-pointer duration-100 ease-in-out transition-all">
                <CgProfile className="text-blue-500" />
                Tài khoản
              </p>
            </NavLink>

            <NavLink to={"/myfavourites"} onClick={handleOffMenuUser}>
              <p className="flex  items-center gap-4 py-2 px-4 text-base hover:text-textHover hover:bg-activeColor cursor-pointer duration-100 ease-in-out transition-all">
                <BsHeart className="text-red-600" />
                Yêu thích
              </p>
            </NavLink>

            <hr className="border-1 border-card border-solid" />

            {/* Role = "Admin" ==> show screen */}
            {user?.user?.role === "Admin" && (
              <NavLink to={"/admin/home"} onClick={handleOffMenuUser}>
                <p
                  className="flex  items-center gap-4 py-2 px-4 text-base hover:text-textHover hover:bg-activeColor cursor-pointer duration-100 ease-in-out transition-all"
                  // onClick={handleOffMenuUser}
                >
                  <MdOutlineAdminPanelSettings className="text-card " />
                  Admin
                </p>
              </NavLink>
            )}

            <p
              onClick={() => {
                handleLogOut();
                handleOffMenuUser();
              }}
              className="flex  items-center gap-4 py-2 px-4 text-base hover:text-textHover hover:bg-activeColor cursor-pointer duration-100 ease-in-out transition-all"
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

export default Header;
