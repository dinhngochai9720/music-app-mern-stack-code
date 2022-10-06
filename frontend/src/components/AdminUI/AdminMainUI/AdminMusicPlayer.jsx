import React, { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";

import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { BsHeart } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { actionType } from "../../../context/reducer";
import AdminMusicPlayList from "./AdminMusicPlayList";

const AdminMusicPlayer = () => {
  const [{ alertType, allSongs, isSongPlaying, songIndex }, dispatch] =
    useStateValue();
  const [isPlayList, setIsPlayList] = useState(false);

  //Chế độ phát nhạc
  const offMusicPlayer = () => {
    //Set thanh fale  --> Tắt phát nhạc
    dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: false });
  };

  const nextTrack = () => {
    //Nếu vị trí bài hát > tổng số bài hát -> click vào nút next sẽ quay trở về bài đầu tiên
    if (songIndex > allSongs.length - 2) {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: 0 });
    }
    //Ngược lại
    else {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: songIndex + 1 });
    }
  };

  const previousTrack = () => {
    //Nếu vị trí bài hát = 0 -> click vào nút prev thì vẫn giữ nguyên vị trí tại đó
    if (songIndex === 0) {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: 0 });
    }
    //Ngược lại
    else {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: songIndex - 1 });
    }
  };

  return (
    <div className="w-full  ">
      <div className={`relative w-full flex items-center gap-3 p-2 `}>
        <div className="w-[5%] flex items-center justify-center">
          <img
            src={allSongs[songIndex]?.imageURL}
            alt=""
            className="w-[60px] h-[60px] object-cover rounded-full"
          />
        </div>

        <div className="w-[15%] flex items-start flex-col ">
          <p className="text-md text-textHover font-normal">
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20) + "..."
                : allSongs[songIndex]?.name
            }`}

            {/* Album and Category */}
            {/* <span className="text-sm ml-2">({allSongs[songIndex]?.album})</span>
            <span className="text-sm  text-textHover font-semibold ml-2">
              ({allSongs[songIndex]?.category})
            </span> */}
          </p>

          <p className="text-textColor2 text-sm font-light">
            {allSongs[songIndex]?.artist}
          </p>
        </div>

        <div className="">
          {/* Danh sach bai hat */}
          <motion.div whileTap={{ scale: 0.8 }}>
            <RiPlayListFill
              className="flex items-center justify-center text-xl text-headingColor hover:text-headingColor mb-2 cursor-pointer"
              onClick={() => {
                setIsPlayList(!isPlayList);
              }}
            />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.8 }}
            className="flex items-center justify-center"
          >
            <BsHeart className="cursor-pointer" />
          </motion.div>
        </div>

        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songURL}
            onPlay={() => {
              console.log("is playing");
            }}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>

        <div className="h-[65px] ">
          <IoCloseCircleOutline
            className=" text-2xl text-textHover hover:text-button cursor-pointer transition-all duration-200 ease-in-out "
            onClick={offMusicPlayer}
          />
        </div>

        {isPlayList && <AdminMusicPlayList />}
      </div>
    </div>
  );
};

export default AdminMusicPlayer;
