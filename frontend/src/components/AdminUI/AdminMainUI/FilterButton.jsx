import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";

const FilterButton = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);

  const [
    { filterCategory, filterArtist, filterLanguage, filterAlbum },
    dispatch,
  ] = useStateValue();

  const updateFilterButton = (name) => {
    setFilterMenu(false);
    setFilterName(name);

    if (flag === "Nghệ sĩ") {
      dispatch({ type: actionType.SET_FILTER_ARTIST, filterArtist: name }); //Click button Artist chon ten ca si -> lay gia tri do (name) gan vao filterArtist (ban dau la null) de tro thanh state global
    }

    if (flag === "Album") {
      dispatch({ type: actionType.SET_FILTER_ALBUM, filterAlbum: name });
    }

    if (flag === "Ngôn ngữ") {
      dispatch({ type: actionType.SET_FILTER_LANGUAGE, filterLanguage: name });
    }

    if (flag === "Thể loại") {
      dispatch({ type: actionType.SET_FILTER_CATEGORY, filterCategory: name });
    }
  };
  return (
    <div className="relative border-2 w-[200px] h-[25px] border-textHover bg-adminBgFocus px-2 rounded-md cursor-pointer ">
      <div
        onClick={() => setFilterMenu(!filterMenu)}
        className="flex items-center justify-around"
      >
        <p className="text-textHover font-light text-sm w-[90%]">
          {!filterName && flag}

          {filterName && (
            <>
              {filterName.length > 12
                ? `${filterName.slice(0, 12)}...`
                : filterName}
            </>
          )}
        </p>
        <MdOutlineKeyboardArrowDown
          className={`w-[20px] h-[20px] text-textHover duration-100 ease-in-out transition-all ${
            filterMenu ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {filterData && filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute top-6 left-[-2px]  w-[200px] h-[70px] z-50 backdrop-blur-sm overflow-y-scroll scrollbar flex flex-col bg-adminBgFocus rounded-md text-textHover text-xs"
        >
          {filterData?.map((data) => (
            <div
              key={data.name}
              className="w-[195px] flex items-center gap-2 p-2 hover:bg-adminBgFocus2 duration-100 ease-in-out transition-all"
              onClick={() => updateFilterButton(data.name)}
            >
              {data.name}
              {/* {data.name.length > 12
                ? `${data.name.slice(0, 12)}...`
                : data.name} */}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButton;
