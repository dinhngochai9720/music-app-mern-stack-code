import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

import FilterButton from "./FilterButton";
import {
  filterByCategory,
  filterByLanguage,
} from "../../../utils/supportFunctions";
import { RiDeleteBinLine } from "react-icons/ri";

import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewSong,
  saveNewArtist,
  saveNewAlbum,
} from "../../../api";
import FileLoader from "./FileLoader";
import FileUploader from "./FileUploader";
import DisableButton from "./DisableButton";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

import { storage } from "../../../config/firebase.config";

const AdminNewArtist = () => {
  // Album
  const [albumName, setAlbumName] = useState("");

  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [isAlbumLoading, setIsAlbumLoading] = useState(false);
  const [albumUpLoadingProgress, setAlbumUpLoadingProgress] = useState(0);

  const [
    {
      allArtists,
      allAlbums,
      allSongs,
      filterCategory,
      filterArtist,
      filterLanguage,
      filterAlbum,
      alertType,
    },
    dispatch,
  ] = useStateValue();

  //Xoá ảnh của album khi không muốn thêm ảnh đó
  const deleteFileObjectAlbum = (url, isImage) => {
    if (isImage) {
      setIsAlbumLoading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setAlbumImageCover(null);
      setIsAlbumLoading(false);
    });

    //Xoá ảnh -> alert danger
    dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
    //Sau 8s -> ẩn alert
    setInterval(() => {
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
    }, 8000);
  };

  const saveInfoAlbum = () => {
    if (!albumImageCover || !albumName) {
      //throw the alert (Luu that bai)
      //alert danger
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
      //Sau 8s -> ẩn alert
      setInterval(() => {
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
      }, 8000);
    } else {
      setIsAlbumLoading(true);

      const data = {
        name: albumName,
        imageURL: albumImageCover,
      };

      saveNewAlbum(data).then((res) => {
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.albums,
          });
        });
      });
      //Luu thanh cong
      //alert success
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "success" });
      //Sau 8s -> ẩn alert
      setInterval(() => {
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
      }, 8000);

      //Sau khi nhấn nút Lưu --> reset lại input nhập về ban đầu (chưa xử lý được Filter Button về ban đầu)
      setAlbumName("");
      setAlbumImageCover(null);
      setIsAlbumLoading(false);
    }
  };

  return (
    <section className="w-full h-full p-16">
      <div className="border-2 border-textHover w-full h-full bg-adminBgColor2">
        {/* Album */}
        <div className="w-full h-[100%]  flex items-center justify-center ">
          {/* Album Image */}
          <div className="w-[50%] h-full p-8">
            {/* Image */}
            <div className="w-full h-full">
              {/* Hình tròn loading */}
              {isAlbumLoading && (
                <FileLoader progress={albumUpLoadingProgress} />
              )}

              {!isAlbumLoading && (
                <div className="w-full h-full">
                  {/* Không phải hình ảnh thì hiện lên component FileUploader để click vào và tải ảnh từ folder trên máy */}
                  {!albumImageCover ? (
                    <FileUploader
                      // Set lại các State khi tải ảnh lên
                      updateState={setAlbumImageCover}
                      setProgress={setAlbumUpLoadingProgress}
                      isLoading={setIsAlbumLoading}
                      isImage={true}
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center ">
                      <img
                        src={albumImageCover}
                        alt=""
                        className="w-[80%] h-[80%] object-center mb-2 rounded-md"
                      />

                      <button
                        type="button"
                        className="w-[30px] h-[30px] flex items-center rounded-full bg-button text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out "
                        onClick={() =>
                          deleteFileObjectAlbum(albumImageCover, true)
                        }
                      >
                        <RiDeleteBinLine className="w-full h-full text-textHover p-[6px]" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Album Info */}
          <div className="w-[50%] h-full p-8 flex flex-col justify-between">
            <div className="h-[85%] flex items-center justify-center">
              <input
                type="text"
                placeholder="Nhập tên Album "
                className="w-full h-[10%] p-1 border-none rounded-md outline-none text-headingColor placeholder:text-textColor text-md"
                value={albumName}
                onChange={(e) => {
                  setAlbumName(e.target.value);
                }}
              />
            </div>

            {isAlbumLoading ? (
              <div className="w-full h-[15%] flex items-center justify-center ">
                <DisableButton />
              </div>
            ) : (
              <div className="h-[15%] flex items-center justify-end">
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="h-[50%] w-[10%] flex items-center justify-center bg-button p-2 rounded-md text-textHover text-md font-semibold hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer"
                  onClick={saveInfoAlbum}
                >
                  Lưu
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminNewArtist;
