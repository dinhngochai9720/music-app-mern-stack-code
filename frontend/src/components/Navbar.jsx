import React from "react";
import { NavLink } from "react-router-dom";

import { BsMusicPlayer, BsFileEarmarkMusic } from "react-icons/bs";
import {
  AiOutlinePlus,
  AiOutlineContacts,
  AiOutlineTag,
  AiOutlineStar,
} from "react-icons/ai";
import { RiPlayListLine } from "react-icons/ri";
import { IoRadioOutline, IoMusicalNotesOutline } from "react-icons/io5";
import { GiMusicalScore } from "react-icons/gi";
import { FaCrown } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";

import Logo from "../assets/img/logo.png";

import { isActiveStyles, isNotActiveStyles } from "../utils/style";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Navbar = () => {
  const [{ isMenuUser }, dispatch] = useStateValue();

  const handleOffMenuUser = () => {
    dispatch({ type: actionType.TOGGLE_MENU_USER, isMenuUser: false });
  };

  return (
    <nav
      className="w-full h-screen grid grid-rows-12 md:py-2 overflow-y-scroll scrollbar"
      onClick={handleOffMenuUser}
    >
      {/* Logo */}
      <div className="row-start-1 row-end-2 flex items-center justify-center p-2">
        {/* Click logo --> home page */}
        <NavLink to={"/"}>
          <img src={Logo} alt="Logo" className="w-16 h-16  " />
        </NavLink>
      </div>

      <div className="row-start-2 row-end-5 p-4 border-b-[1px]  border-b-card flex flex-col justify-around font-medium gap-2">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <BsMusicPlayer className="w-[20px] h-[20px]" />
          <span>Trang chủ</span>
        </NavLink>

        <NavLink
          to="/musics"
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <GiMusicalScore className="w-[20px] h-[20px]" />
          <span>Bài hát</span>
        </NavLink>

        <NavLink
          to="/premium"
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <FaCrown className="w-[20px] h-[20px]" />
          <span>Premium</span>
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <AiOutlineContacts className="w-[20px] h-[20px]" />
          <span>Liên hệ</span>
        </NavLink>

        <NavLink
          to="/tag"
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <AiOutlineTag className="w-[20px] h-[20px]" />
          <span>#sonymusic</span>
        </NavLink>

        <NavLink
          to="/radio"
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          <IoRadioOutline className="w-[20px] h-[20px]" />
          <span>Radio</span>
          <button className="bg-button text-xs px-2 rounded-md">Live</button>
        </NavLink>
      </div>

      <div className="row-start-5 row-end-7  p-4 flex flex-col justify-around font-medium gap-2">
        <div className="flex items-center justify-start gap-2 p-2 hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all">
          <IoMusicalNotesOutline className="w-[20px] h-[20px]" />
          <span>Nhạc mới</span>
        </div>
        <div className="flex items-center justify-start gap-2 p-2 hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all">
          <BiCategoryAlt className="w-[20px] h-[20px]" />
          <span>Thể loại</span>
        </div>
        <div className="flex items-center justify-start gap-2 p-2 hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all">
          <AiOutlineStar className="w-[20px] h-[20px]" />
          <span>Top 100</span>
        </div>
        <div className="flex items-center justify-start gap-2 p-2 hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all">
          <SiYoutubemusic className="w-[20px] h-[20px]" />
          <span>MV</span>
        </div>
      </div>

      <div className="row-start-7 row-end-9 bg-gradient-to-r from-cyan-500 to-blue-500  rounded-md my-2 p-2 flex flex-col justify-around  font-medium m-2">
        <span className="text-center text-sm  text-textHover">
          Nghe nhạc không quảng cáo cùng kho nhạc VIP
        </span>
        <button className="bg-button2 rounded-md p-2 text-textColor hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all">
          Nâng cấp VIP
        </button>
      </div>

      <div className="row-start-9 row-end-11 p-4 flex flex-col gap-4 justify-around border-b-[1px] border-b-card ">
        <div className="uppercase font-medium px-2">Thư viện</div>
        <div className="flex flex-col gap-2 p-2">
          <div className="flex items-center justify-start gap-2 py-2 text-sm font-normal hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all">
            <BsFileEarmarkMusic className="bg-iconSongs rounded-md p-[2px] w-[20px] h-[20px]" />
            <span>Bài hát</span>
          </div>
          <div className="flex items-center justify-start gap-2 py-2 text-sm font-normal hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all ">
            <RiPlayListLine className="bg-iconPlayList rounded-md p-[2px] w-[20px] h-[20px]" />
            <span>Playlist</span>
          </div>
        </div>
      </div>

      <div className="row-start-11 row-end-13 p-4">
        <div className="flex items-center justify-start gap-2  hover:text-textHover cursor-pointer duration-100 ease-in-out transition-all">
          <AiOutlinePlus className="w-[20px] h-[20px]" />
          <span>Tạo Playlist mới</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
