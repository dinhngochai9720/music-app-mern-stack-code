import React, { useEffect, useState } from "react";
import { getAllArtists } from "../../../api";
import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";

import { IoSearchOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";

import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

import AdminArtistCard from "./AdminArtistCard";

const AdminArtists = () => {
  const [artistFilter, setArtistFilter] = useState("");

  const [{ allArtists }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      // Call API trong backend tim kiem so luong nghe si
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists,
        });
      });
    }
  }, []);

  return (
    <section className="text-textHover h-full w-full flex flex-col items-center">
      {/* Filter Search */}
      <div className="mt-8 flex items-center justify-center h-[10%] mb-4">
        <div className="flex items-center w-[750px] h-full gap-2 bg-adminBgColor2 py-2 px-4 rounded-full  focus-within:bg-adminBgFocus text-textHover ">
          <IoSearchOutline className="text-2xl" />
          <input
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, album,..."
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.target.value)}
            className="border-none outline-none w-full  bg-adminBgColor2  focus:bg-adminBgFocus placeholder:text-textHover"
          />
        </div>

        <button className="bg-adminBgColor2 hover:bg-adminBgFocus cursor-pointer duration-300 ease-in-out transition-all ml-6 w-[150px] h-full flex items-center justify-center text-textHover rounded-full text-md">
          Tìm kiếm
        </button>
      </div>

      {/* Content */}
      <div className=" bg-adminBgColor w-[90%] h-[90%]  overflow-y-scroll scrollbaradmin m-8 flex flex-col items-center justify-start border border-textHover rounded-md">
        {/* Count and Add new artist*/}
        <div className=" w-full h-[10%] flex items-center justify-between  px-10">
          <p className="text-md font-bold text-textHover">
            Nghệ sĩ:
            <span className="text-md font-bold ml-2">
              {allArtists?.length > 0 ? allArtists?.length : 0}
            </span>
          </p>

          <div className="flex items-center">
            <p className="text-md font-bold text-textHover">Thêm nghệ sĩ</p>
            <NavLink to={"/admin/newartist"}>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="ml-4 w-[25px] h-[25px] cursor-pointer flex items-center justify-center text-textColor2 hover:text-textHover duration-200 ease-in-out transition-all border border-textColor2 hover:border-textHover rounded-md"
              >
                <AiOutlinePlus />
              </motion.div>
            </NavLink>
          </div>
        </div>

        {/* Artist */}
        <div className="w-full h-[90%] py-10 px-4">
          <div className="flex flex-wrap content-start w-full h-full gap-6">
            {allArtists &&
              allArtists.map((data, i) => (
                <AdminArtistCard
                  key={data._id}
                  index={i}
                  data={data}
                  type="artist"
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminArtists;
