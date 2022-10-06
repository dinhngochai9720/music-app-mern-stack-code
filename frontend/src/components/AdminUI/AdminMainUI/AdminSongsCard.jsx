import React, { useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { motion } from "framer-motion";

import { RiDeleteBinLine } from "react-icons/ri";
import { removeSong, getAllSongs } from "../../../api";
import { actionType } from "../../../context/reducer";
import { storage } from "../../../config/firebase.config";
import { deleteObject, ref } from "firebase/storage";

const AdminSongsCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);

  const [{ alertType, allSongs, isSongPlaying, songIndex }, dispatch] =
    useStateValue();

  const deleteSong = (data) => {
    if (type === "song") {
      //Xoa image trong firebase
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});

      removeSong(data._id).then((res) => {
        if (res.data) {
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "success" });

          setInterval(() => {
            dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
          }, 8000);

          // Call API trong backend cap nhat so luong bai hat sau khi xoa
          getAllSongs().then((data) => {
            dispatch({ type: actionType.SET_ALL_SONGS, allSongs: data.songs });
          });
        } else {
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });

          setInterval(() => {
            dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
          }, 8000);
        }
      });
    }
  };

  //Chế độ phát nhạc
  const addToContext = () => {
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
    <div className="w-[15%] bg-adminBgFocus h-[60%] cursor-pointer rounded-xl hover:bg-adminBgFocus2 duration-200 ease-in-out transition-all">
      <motion.div className="relative flex flex-col w-full h-full">
        {/* Info song */}
        <div
          className="flex flex-col p-2 w-full h-[90%]"
          onClick={type === "song" && addToContext}
        >
          <div className="flex items-center justify-center w-[100%] h-[70%]">
            <motion.img
              src={data.imageURL}
              alt={data.name}
              className="w-[120px] h-[120px] rounded-full cursor-pointer hover:scale-110 duration-200 ease-in-out transition-all "
            />
          </div>

          <p className="w-full h-[15%] text-xs text-textColor2  flex items-center justify-center mt-2">
            {/* Neu ten dai qua 25 ky tu */}
            {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
          </p>

          {data.artist && (
            <p className="w-full h-[15%] text-xs flex items-center justify-center  text-textHover font-semibold">
              {data.artist.length > 25
                ? `${data.artist.slice(0, 25)}...`
                : data.artist}
            </p>
          )}
        </div>

        {/* Delete button */}
        <motion.div
          whileTap={{ scale: 0.75 }}
          className=" w-full h-[10%] flex items-center justify-center text-button cursor-pointer"
        >
          <RiDeleteBinLine
            onClick={() => {
              setIsDelete(true);
            }}
          />
        </motion.div>

        {/* Overlay Delete */}
        {isDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex flex-col items-center justify-center px-4 py-2 rounded-xl"
          >
            <p className="text-md font-semibold text-textColor text-center">
              Bạn chắc chắn muốn xoá?
            </p>

            <div className="flex items-center gap-4 mt-2">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none  text-adminTextDanger text-xs font-normal bg-adminBgDanger px-2 rounded-md"
                onClick={() => {
                  deleteSong(data);
                }}
              >
                Có
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none bg-adminBgSuccess text-xs font-normal text-adminTextSuccess px-2 rounded-md"
                onClick={() => {
                  setIsDelete(false);
                }}
              >
                Không
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminSongsCard;
