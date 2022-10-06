import React from "react";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

const MusicCard = ({ data, index, type }) => {
  const [{ alertType, allSongs, isSongPlaying, songIndex }, dispatch] =
    useStateValue();

  //Chế độ phát nhạc
  const addToContext = () => {
    //Set thanh true  --> Phát nhạc
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true });
    }

    //Vi tri bai hat
    if (songIndex !== index) {
      dispatch({ type: actionType.SET_SONG_INDEX, songIndex: index });
    }
  };
  return (
    <div
      className="w-[32%] h-[80px] flex gap-4 cursor-pointer bg-adminBgFocus rounded-md hover:bg-adminBgFocus2 transition-all duration-200 ease-in-out"
      onClick={type === "song" && addToContext}
    >
      <img
        src={data.imageURL}
        alt=""
        className="w-[80px] h-[80px] rounded-md"
      />

      <div className="w-full flex flex-col p-2 items-center justify-between">
        <p className="text-textColor2 text-md">
          {data.name.length > 30 ? `${data.name.slice(0, 30)}...` : data.name}
        </p>
        <p className="text-textHover text-md font-semibold">{data.artist}</p>
      </div>
    </div>
  );
};

export default MusicCard;
