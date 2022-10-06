import React from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { isActiveStylesButton, isNotActiveStylesButton } from "../utils/style";
import { ContentSlider, Music, Album } from "./ContentUI";

import { NavLink, Route, Routes } from "react-router-dom";

const Content = () => {
  const [{ isMenuUser }, dispatch] = useStateValue();

  const handleOffMenuUser = () => {
    dispatch({ type: actionType.TOGGLE_MENU_USER, isMenuUser: false });
  };

  return (
    <section className="h-[85%] " onClick={handleOffMenuUser}>
      <div className="w-[90%] h-[200px] ml-16 ">
        <ContentSlider />
      </div>

      <p className="w-full mt-4 text-xl text-textHover font-semibold ml-12">
        Mới Phát Hành
      </p>

      <div className="ml-12 mt-4 w-[200px] flex items-center justify-between">
        <NavLink
          to={"/music"}
          className={({ isActive }) =>
            isActive ? isActiveStylesButton : isNotActiveStylesButton
          }
        >
          Bài hát
        </NavLink>

        <NavLink
          to={"/album"}
          className={({ isActive }) =>
            isActive ? isActiveStylesButton : isNotActiveStylesButton
          }
        >
          Album
        </NavLink>
      </div>

      <div className="w-full h-fit p-10">
        <Routes>
          <Route path="/music" element={<Music />} />
          <Route path="/album" element={<Album />} />
        </Routes>
      </div>
    </section>
  );
};

export default Content;
