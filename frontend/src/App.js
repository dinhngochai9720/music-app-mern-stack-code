import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { AnimatePresence, motion } from "framer-motion";

import { Home, Login, Admin, Musics } from "./components";
import { app } from "./config/firebase.config";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

import AdminMusicPlayer from "./components/AdminUI/AdminMainUI/AdminMusicPlayer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  // const [authState, setAuthState] = useState(false);

  const [{ user, isSongPlaying }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  //Trang dang nhap duoc chi duoc loading lan dau tien
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      // console.log(userCred); //Thong tin user dang nhap

      // Da dang nhap
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log("Token: " + token); //Ma token khi trang dang nhap load

          validateUser(token).then((data) => {
            // console.log(data);
            dispatch({ type: actionType.SET_USER, user: data });
          });
        });
      }

      //Chua dang nhap
      else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");

        dispatch({ type: actionType.SET_USER, user: null });

        //Chuyen den trang login khi chua dang nhap thanh cong
        navigate("/login");
      }
    });
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="h-screen min-w-[680px] ">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>

        {/* isSongPlaying là trình phát nhạc */}
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed min-w-[700px] h-[80px] inset-x-0 bottom-0 bg-adminBgFocus2 drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <AdminMusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App;
