import React from "react";
import { useStateValue } from "../context/StateProvider";

import { AdminHeader, AdminMain } from "./AdminUI";

import { AlertMessage } from "./AdminUI/AdminMainUI";

import { motion } from "framer-motion";
import { AdminMusicPlayer } from "./AdminUI/AdminMainUI";

const Admin = () => {
  const [{ alertType, isSongPlaying }, dispatch] = useStateValue();

  return (
    <div className="w-screen h-screen bg-adminBgColor1 overflow-y-scroll scrollbaradmin ">
      <AdminHeader />

      <AdminMain />

      {alertType && <AlertMessage type={alertType} />}

      {/* isSongPlaying là trình phát nhạc */}
      {/* {isSongPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed min-w-[700px] h-[80px] inset-x-0 bottom-0 bg-adminBgFocus2 drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
        >
          <AdminMusicPlayer />
        </motion.div>
      )} */}
    </div>
  );
};

export default Admin;
