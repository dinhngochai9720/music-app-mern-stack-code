import React from "react";
import { useStateValue } from "../../context/StateProvider";
import AlbumCard from "./AlbumCard";

const Album = () => {
  const [{ allAlbums }, dispatch] = useStateValue();

  return (
    <div className="w-full h-full flex flex-wrap content-start gap-4">
      {allAlbums &&
        allAlbums.map((data, i) => (
          <AlbumCard data={data} key={data._id} index={i} />
        ))}
    </div>
  );
};

export default Album;
