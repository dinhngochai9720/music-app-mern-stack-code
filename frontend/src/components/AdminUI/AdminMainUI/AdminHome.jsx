import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";

import { NavLink } from "react-router-dom";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  getAllUsers,
} from "../../../api";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";

import AdminHomeCard from "./AdminHomeCard";

const AdminHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        // console.log(data); //Thong tin cac user da dang nhap

        dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.users });
      });
    }

    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists,
        });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.albums });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({ type: actionType.SET_ALL_SONGS, allSongs: data.songs });
      });
    }
  }, []);

  return (
    <section className="w-full h-[100%] grid grid-cols-12 text-adminTextColor">
      {/* Users */}
      <div className="col-start-1 col-end-4 flex items-center justify-center ">
        {/* <NavLink
          to={"/admin/songs"}
          className="w-full flex flex-col items-center justify-center gap-4 mx-20 p-6 bg-adminBgColor3 rounded-3xl"
        >
          <FaUsers />
          <p>Songs</p>
          <p>2</p>
        </NavLink> */}

        <NavLink to={"/admin/users"} className="w-full m-20">
          <AdminHomeCard
            icon={<FaUsers className="text-3xl  text-iconSongs" />}
            name={"Tài khoản"}
            count={allUsers?.length > 0 ? allUsers?.length : 0}
          />
        </NavLink>
      </div>

      {/* Songs */}
      <div className="col-start-4 col-end-7 flex items-center">
        <NavLink to={"/admin/songs"} className="w-full m-20">
          <AdminHomeCard
            icon={<GiLoveSong className="text-3xl  text-button" />}
            name={"Bài hát"}
            count={allSongs?.length > 0 ? allSongs?.length : 0}
          />
        </NavLink>
      </div>

      {/* Artists */}
      <div className="col-start-7 col-end-10 flex items-center ">
        <NavLink to={"/admin/artists"} className="w-full m-20">
          <AdminHomeCard
            icon={<RiUserStarLine className="text-3xl  text-seconday" />}
            name={"Nghệ sĩ"}
            count={allArtists?.length > 0 ? allArtists?.length : 0}
          />
        </NavLink>
      </div>

      {/* Albums */}
      <div className="col-start-10 col-end-13 flex items-center ">
        <NavLink to={"/admin/albums"} className="w-full m-20">
          <AdminHomeCard
            icon={<GiMusicalNotes className="text-3xl  text-iconPlayList" />}
            name={"Albums"}
            count={allAlbums?.length > 0 ? allAlbums?.length : 0}
          />
        </NavLink>
      </div>
    </section>
  );
};

export default AdminHome;
