import React from "react";
import { useStateValue } from "../../context/StateProvider";
import MusicCard from "./MusicCard";

const Music = () => {
  const [{ allSongs }, dispatch] = useStateValue();

  return (
    <div className="w-full h-full flex flex-wrap content-start gap-4">
      {allSongs &&
        allSongs.map((data, i) => (
          <MusicCard data={data} key={data._id} index={i} type="song" />
        ))}
    </div>
  );
};

export default Music;
