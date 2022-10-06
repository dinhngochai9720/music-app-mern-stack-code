import React from "react";
import { BiCloudUpload } from "react-icons/bi";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

import { storage } from "../../../config/firebase.config";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";

const FileUploader = ({ updateState, setProgress, isLoading, isImage }) => {
  const [{ alertType }, dispatch] = useStateValue();

  const uploadFile = (e) => {
    isLoading(true);

    const uploadedFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `${isImage ? "image" : "audio"}/${Date.now()}-${uploadFile.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);

        // alert danger
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "danger" });
        //Sau 8s -> ẩn alert
        setInterval(() => {
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
        }, 8000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });

        //Tai len thanh cong file anh,audio --> alert success
        dispatch({ type: actionType.SET_ALERT_TYPE, alertType: "success" });
        //Sau 8s -> ẩn alert
        setInterval(() => {
          dispatch({ type: actionType.SET_ALERT_TYPE, alertType: null });
        }, 8000);
      }
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <label className="w-full h-[80%]">
        <div className="w-full h-full flex flex-col justify-center items-center cursor-pointer bg-card">
          <p className="font-bold text-2xl text-headingColor">
            <BiCloudUpload />
          </p>

          <p className="text-md text-headingColor">
            Nhấn vào để tải {isImage ? "ảnh" : "audio"} lên
          </p>
        </div>

        <input
          type="file"
          name="upload-file"
          accept={`${isImage ? "image/*" : "audio/*"}`}
          className="w-0 h-0"
          onChange={uploadFile}
        />
      </label>
    </div>
  );
};

export default FileUploader;
