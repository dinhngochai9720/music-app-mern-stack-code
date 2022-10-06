import React from "react";

import { FaUsers } from "react-icons/fa";
import { NavLink, Route, Routes } from "react-router-dom";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import {
  AdminSongs,
  AdminUsers,
  AdminArtists,
  AdminAlbums,
  AdminHome,
  AdminNewSong,
  AdminNewArtist,
  AdminNewAlbum,
} from "./AdminMainUI";

const AdminMain = () => {
  const [{ isMenuAdmin }, dispatch] = useStateValue();

  const handleOffMenuAdmin = () => {
    dispatch({ type: actionType.TOGGLE_MENU_ADMIN, isMenuAdmin: false });
  };

  return (
    <section className="w-full h-[85%]  " onClick={handleOffMenuAdmin}>
      <Routes>
        <Route path="/home" element={<AdminHome />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/songs" element={<AdminSongs />} />
        <Route path="/artists" element={<AdminArtists />} />
        <Route path="/albums" element={<AdminAlbums />} />
        <Route path="/newsong" element={<AdminNewSong />} />
        <Route path="/newartist" element={<AdminNewArtist />} />
        <Route path="/newalbum" element={<AdminNewAlbum />} />
      </Routes>
    </section>
  );
};

export default AdminMain;
