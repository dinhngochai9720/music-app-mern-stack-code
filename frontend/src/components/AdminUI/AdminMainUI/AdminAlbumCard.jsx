import React, { useState } from "react";
import { motion } from "framer-motion";

import { RiDeleteBinLine } from "react-icons/ri";
import { useStateValue } from "../../../context/StateProvider";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../config/firebase.config";
import { getAllAlbums, removeAlbum } from "../../../api";
import { actionType } from "../../../context/reducer";

const AdminAlbumCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);

  const [{ alertType, allAlbums }, dispatch] = useStateValue();

  const deleteAlbum = (data) => {
    if (type === "album") {
      //Xoa image trong firebase
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});

      removeAlbum(data._id).then((res) => {
        if (res.data) {
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "success" });

          setInterval(() => {
            dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
          }, 8000);

          // Call API trong backend cap nhat so luong album sau khi xoa
          getAllAlbums().then((data) => {
            dispatch({
              type: actionType.SET_ALL_ALBUMS,
              allAlbums: data.albums,
            });
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

  return (
    <div className="w-[15%] bg-adminBgFocus h-[60%] cursor-pointer rounded-xl ">
      <motion.div className="relative flex flex-col w-full h-full">
        {/* Info song */}
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex items-center justify-center w-[100%] h-[90%]">
            <motion.img
              src={data.imageURL}
              alt={data.name}
              className="w-full h-full cursor-pointer rounded-t-xl "
            />
          </div>

          <p className="w-full h-[10%] text-xs text-textColor2 flex items-center justify-center bg-adminBgColor2 hover:text-textHover duration-200 ease-in-out transition-all ">
            {/* Neu ten dai qua 25 ky tu */}
            {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
          </p>
        </div>

        {/* Delete button */}
        <motion.div
          whileTap={{ scale: 0.75 }}
          className=" w-full h-[10%] flex items-center justify-center text-button cursor-pointer "
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
                  deleteAlbum(data);
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

export default AdminAlbumCard;
