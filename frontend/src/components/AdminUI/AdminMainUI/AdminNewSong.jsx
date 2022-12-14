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

const AdminNewSong = () => {
  const [songName, setSongName] = useState("");

  // Image
  const [songImageCover, setSongImageCover] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageUpLoadingProgress, setImageUpLoadingProgress] = useState(0);

  // Audio
  const [audioImageCover, setAudioImageCover] = useState(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioUpLoadingProgress, setAudioUpLoadingProgress] = useState(0);

  // Artist
  const [artistName, setArtistName] = useState("");
  const [facebookName, setFacebookName] = useState("");
  const [instagramName, setInstagramName] = useState("");

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [isArtistLoading, setIsArtistLoading] = useState(false);
  const [artistUpLoadingProgress, setArtistUpLoadingProgress] = useState(0);

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

  //S??? d???ng useEffect ????? m???i l???n th??m m???i l?? render l???i c??c m???c
  useEffect(() => {
    if (!allArtists) {
      // Call API trong backend tim kiem cac ca si va hien thi trong muc Ca s??
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists,
        });
      });
    }

    if (!allAlbums) {
      // Call API trong backend tim kiem cac album v?? hi???n th??? trong m???c Album
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.albums });
      });
    }
  }, []);

  //Xo?? ???nh c???a b??i h??t khi kh??ng mu???n th??m ???nh ????
  const deleteFileObjectImage = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setSongImageCover(null);
      setIsImageLoading(false);
    });

    //Xo?? ???nh -> alert danger
    dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
    //Sau 8s -> ???n alert
    setInterval(() => {
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
    }, 8000);
  };

  //Xo?? ???nh c???a nghe s?? khi kh??ng mu???n th??m ???nh ????
  const deleteFileObjectArtist = (url, isImage) => {
    if (isImage) {
      setIsArtistLoading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setArtistImageCover(null);
      setIsArtistLoading(false);
    });

    //Xo?? ???nh -> alert danger
    dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
    //Sau 8s -> ???n alert
    setInterval(() => {
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
    }, 8000);
  };

  //Xo?? ???nh c???a album khi kh??ng mu???n th??m ???nh ????
  const deleteFileObjectAlbum = (url, isImage) => {
    if (isImage) {
      setIsAlbumLoading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setAlbumImageCover(null);
      setIsAlbumLoading(false);
    });

    //Xo?? ???nh -> alert danger
    dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
    //Sau 8s -> ???n alert
    setInterval(() => {
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
    }, 8000);
  };

  //Xo?? file audio
  const deleteFileObjectAudio = (url, isImage) => {
    if (isImage) {
      setIsAudioLoading(true);
    }

    const deleteRef = ref(storage, url);
    deleteObject(deleteRef).then(() => {
      setAudioImageCover(null);
      setIsAudioLoading(false);
    });

    //Xo?? audio -> alert danger
    dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
    //Sau 8s -> ???n alert
    setInterval(() => {
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
    }, 8000);
  };

  const saveInfoSong = () => {
    if (!songImageCover || !audioImageCover || !songName) {
      //throw the alert (Luu that bai)
      // alert danger
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
      //Sau 8s -> ???n alert
      setInterval(() => {
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
      }, 8000);
    } else {
      setIsImageLoading(true);
      setIsAudioLoading(true);

      const data = {
        name: songName,
        imageURL: songImageCover,
        songURL: audioImageCover,
        album: filterAlbum,
        artist: filterArtist,
        language: filterLanguage,
        category: filterCategory,
      };

      saveNewSong(data).then((res) => {
        getAllSongs().then((data) => {
          dispatch({ type: actionType.SET_ALL_SONGS, allSongs: data.songs });
        });
      });
      //Luu thanh cong
      //alert success
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "success" });
      //Sau 8s -> ???n alert
      setInterval(() => {
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
      }, 8000);

      //Sau khi nh???n n??t L??u --> reset l???i input nh???p v??? ban ?????u (ch??a x??? l?? ???????c Filter Button v??? ban ?????u)
      setSongName("");
      setSongImageCover(null);
      setIsImageLoading(false);

      setAudioImageCover(null);
      setIsAudioLoading(false);

      dispatch({ type: actionType.SET_FILTER_ARTIST, filterArtist: null });
      dispatch({ type: actionType.SET_FILTER_ALBUM, filterAlbum: null });
      dispatch({ type: actionType.SET_FILTER_LANGUAGE, filterLanguage: null });
      dispatch({ type: actionType.SET_FILTER_CATEGORY, filterCategory: null });
    }
  };

  const saveInfoArtist = () => {
    if (!artistImageCover || !artistName || !facebookName || !instagramName) {
      //throw the alert (Luu that bai)
      // alert danger
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
      //Sau 8s -> ???n alert
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
      //Sau 8s -> ???n alert
      setInterval(() => {
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
      }, 8000);

      //Sau khi nh???n n??t L??u --> reset l???i input nh???p v??? ban ?????u (ch??a x??? l?? ???????c Filter Button v??? ban ?????u)
      setArtistName("");
      setFacebookName("");
      setInstagramName("");
      setArtistImageCover(null);
      setIsArtistLoading(false);
    }
  };

  const saveInfoAlbum = () => {
    if (!albumImageCover || !albumName) {
      //throw the alert (Luu that bai)
      //alert danger
      dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
      //Sau 8s -> ???n alert
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
      //Sau 8s -> ???n alert
      setInterval(() => {
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
      }, 8000);

      //Sau khi nh???n n??t L??u --> reset l???i input nh???p v??? ban ?????u (ch??a x??? l?? ???????c Filter Button v??? ban ?????u)
      setAlbumName("");
      setAlbumImageCover(null);
      setIsAlbumLoading(false);
    }
  };

  return (
    <section className="w-full h-full p-16">
      {/* <div className="border-2 border-textHover w-full h-full grid grid-cols-12 bg-adminBgColor2"> */}
      <div className="border-2 border-textHover w-full h-full bg-adminBgColor2">
        {/* <div className="w-full h-full col-start-1 col-end-7 border-r-2 border-r-textHover"> */}
        <div className="w-full h-[10%] p-4 flex items-center ">
          <input
            type="text"
            placeholder="Nh???p t??n b??i h??t "
            className="w-full p-1 border-none rounded-md outline-none text-headingColor placeholder:text-textColor text-md"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
        </div>

        <div className="w-full h-[15%] p-4 flex items-center justify-between">
          <FilterButton filterData={allArtists} flag={"Ngh??? s??"} />
          <FilterButton filterData={allAlbums} flag={"Album"} />
          <FilterButton filterData={filterByLanguage} flag={"Ng??n ng???"} />
          <FilterButton filterData={filterByCategory} flag={"Th??? lo???i"} />
        </div>

        <div className="w-full h-[65%] p-4  flex items-center justify-around">
          {/* Image */}
          <div className="w-[40%] h-full">
            {/* H??nh tr??n loading */}
            {isImageLoading && <FileLoader progress={imageUpLoadingProgress} />}

            {!isImageLoading && (
              <div className="w-full h-full">
                {/* Kh??ng ph???i h??nh ???nh th?? hi???n l??n component FileUploader ????? click v??o v?? t???i ???nh t??? folder tr??n m??y */}
                {!songImageCover ? (
                  <FileUploader
                    // Set l???i c??c State khi t???i ???nh l??n
                    updateState={setSongImageCover}
                    setProgress={setImageUpLoadingProgress}
                    isLoading={setIsImageLoading}
                    isImage={true}
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center ">
                    <img
                      src={songImageCover}
                      alt=""
                      className="w-[80%] h-[80%] object-fit mb-2 rounded-md"
                    />

                    <button
                      type="button"
                      className="w-[30px] h-[30px] flex items-center rounded-full bg-button text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out "
                      onClick={() =>
                        deleteFileObjectImage(songImageCover, true)
                      }
                    >
                      <RiDeleteBinLine className="w-full h-full text-textHover p-[6px]" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Audio */}
          <div className="w-[40%] h-full">
            {/* H??nh tr??n loading */}
            {isAudioLoading && <FileLoader progress={audioUpLoadingProgress} />}

            {!isAudioLoading && (
              <div className="w-full h-full">
                {/* Kh??ng ph???i h??nh ???nh th?? hi???n l??n component FileUploader ????? click v??o v?? t???i ???nh t??? folder tr??n m??y */}
                {!audioImageCover ? (
                  <FileUploader
                    // Set l???i c??c State khi t???i ???nh l??n
                    updateState={setAudioImageCover}
                    setProgress={setAudioUpLoadingProgress}
                    isLoading={setIsAudioLoading}
                    isImage={false}
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center ">
                    <audio
                      src={audioImageCover}
                      className="w-full  object-center mb-2 rounded-md"
                      controls
                      autoPlay
                    />

                    <button
                      type="button"
                      className="w-[30px] h-[30px] flex items-center rounded-full bg-button text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out "
                      onClick={() =>
                        deleteFileObjectAudio(audioImageCover, false)
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

        {isImageLoading || isAudioLoading ? (
          <div className="w-full h-[10%] flex items-center justify-center ">
            <DisableButton />
          </div>
        ) : (
          <div className="w-full h-[10%] flex items-center justify-end px-20">
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="bg-button p-2 rounded-md text-textHover text-md font-semibold hover:shadow-lg transition-all duration-200 ease-in-out cursor-pointer"
              onClick={saveInfoSong}
            >
              L??u
            </motion.button>
          </div>
        )}
        {/* </div> */}
      </div>
    </section>
  );
};

export default AdminNewSong;
