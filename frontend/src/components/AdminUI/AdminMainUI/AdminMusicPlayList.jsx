import React, { useEffect } from "react";
import { getAllSongs } from "../../../api";
import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";

import { IoMusicalNotesOutline } from "react-icons/io5";

import { motion } from "framer-motion";

const AdminMusicPlayList = () => {
  const [{ alertType, allSongs, isSongPlaying, songIndex }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: data.songs });
      });
    }
  }, []);

  const setCurrentPlaySong = (index) => {
    //Set thanh true  --> Phát nhạc
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true });
    }

    //Vi tri bai hat
    if (songIndex !== index) {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: index });
    }
  };

  return (
    <div className="absolute left-0 bottom-[92px] gap-2 py-2 w-350 max-w-[350px] h-[425px] flex flex-col overflow-y-scroll scrollbaradmin  shadow-md bg-adminBgFocus">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group w-full h-[70px] p-4 hover:bg-adminBgFocus2 flex gap-3 items-center cursor-pointer bg-transparent"
            onClick={() => {
              setCurrentPlaySong(index);
            }}
            key={index}
          >
            <IoMusicalNotesOutline className="text-textHover group-hover:text-headingColor text-2xl cursor-pointer" />

            <div className="w-[50px] h-[50px]">
              <img
                src={music?.imageURL}
                alt=""
                className="w-full h-full rounded-full"
              ></img>
            </div>

            <div className="flex flex-col items-start ">
              <p className="text-md text-textHover font-normal">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}
                {/* <span className="text-base">{music?.album}</span> */}
              </p>

              <p className="text-textColor2 text-sm font-light">
                {music?.artist}
                {/* <span className="text-sm text-textColor font-semibold">
                  ({music?.category})
                </span> */}
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AdminMusicPlayList;
