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
  // Artist
  const [artistName, setArtistName] = useState("");
  const [facebookName, setFacebookName] = useState("");
  const [instagramName, setInstagramName] = useState("");

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [isArtistLoading, setIsArtistLoading] = useState(false);
  const [artistUpLoadingProgress, setArtistUpLoadingProgress] = useState(0);

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

  //Xoá ảnh của nghệ sĩ khi không muốn thêm ảnh đó
  const deleteFileObjectArtist = (url, isImage) => {
    if (isImage) {
      setIsArtistLoading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setArtistImageCover(null);
      setIsArtistLoading(false);
    });

    //Xoá ảnh -> alert danger
    dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
    //Sau 8s -> ẩn alert
    setInterval(() => {
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
    }, 8000);
  };

  const saveInfoArtist = () => {
    if (!artistImageCover || !artistName || !facebookName || !instagramName) {
      //throw the alert (Luu that bai)
      // alert danger
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
      //Sau 8s -> ẩn alert
      setInterval(() => {
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
      }, 8000);
    } else {
      setIsArtistLoading(true);

      const data = {
        name: artistName,
        imageURL: artistImageCover,
        facebook: facebookName,
        instagram: instagramName,
      };

      saveNewArtist(data).then((res) => {
        getAllArtists().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.artists,
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
      setArtistName("");
      setFacebookName("");
      setInstagramName("");
      setArtistImageCover(null);
      setIsArtistLoading(false);
    }
  };

  return (
    <section className="w-full h-full p-16">
      <div className="border-2 border-textHover w-full h-full bg-adminBgColor2">
        {/* Artist */}
        <div className="w-full h-full  flex items-center justify-center">
          {/* Artist Image */}
          <div className="w-[50%] h-full p-8">
            {/* Image */}
            <div className="w-full h-full">
              {/* Hình tròn loading */}
              {isArtistLoading && (
                <FileLoader progress={artistUpLoadingProgress} />
              )}

              {!isArtistLoading && (
                <div className="w-full h-full">
                  {/* Không phải hình ảnh thì hiện lên component FileUploader để click vào và tải ảnh từ folder trên máy */}
                  {!artistImageCover ? (
                    <FileUploader
                      // Set lại các State khi tải ảnh lên
                      updateState={setArtistImageCover}
                      setProgress={setArtistUpLoadingProgress}
                      isLoading={setIsArtistLoading}
                      isImage={true}
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center ">
                      <img
                        src={artistImageCover}
                        alt=""
                        className="w-[80%] h-[80%] object-center mb-2 rounded-md"
                      />

                      <button
                        type="button"
                        className="w-[30px] h-[30px] flex items-center rounded-full bg-button text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out "
                        onClick={() =>
                          deleteFileObjectArtist(artistImageCover, true)
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

          {/* Artist Info */}
          <div className="w-[50%] h-full p-8 flex flex-col justify-between">
            <div className="h-[85%] flex flex-col justify-around">
              <input
                type="text"
                placeholder="Nhập tên ca sĩ "
                className="w-full h-[10%] p-1 border-none rounded-md outline-none text-headingColor placeholder:text-textColor text-md"
                value={artistName}
                onChange={(e) => {
                  setArtistName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="https://www.facebook.com/..."
                className="w-full h-[10%] p-1 border-none rounded-md outline-none text-headingColor placeholder:text-textColor text-md"
                value={facebookName}
                onChange={(e) => {
                  setFacebookName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="https://www.instagram.com/..."
                className="w-full h-[10%] p-1 border-none rounded-md outline-none text-headingColor placeholder:text-textColor text-md"
                value={instagramName}
                onChange={(e) => {
                  setInstagramName(e.target.value);
                }}
              />
            </div>

            {isArtistLoading ? (
              <div className="w-full h-[15%] flex items-center justify-center ">
                <DisableButton />
              </div>
            ) : (
              <div className="h-[15%] flex items-center justify-end">
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="h-[50%] w-[10%] flex items-center justify-center bg-button p-2 rounded-md text-textHover text-md font-semibold hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer"
                  onClick={saveInfoArtist}
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
