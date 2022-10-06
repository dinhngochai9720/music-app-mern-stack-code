import React from "react";

const AlbumCard = ({ data }) => {
  return (
    <div className="w-[32%] h-[80px] flex gap-4 cursor-pointer bg-adminBgFocus rounded-md hover:bg-adminBgFocus2 transition-all duration-200 ease-in-out">
      <img
        src={data.imageURL}
        alt=""
        className="w-[80px] h-[80px] rounded-md"
      />

      <div className="w-full flex flex-col p-2 items-center justify-center">
        <p className="text-textColor2 text-md">
          {data.name.length > 30 ? `${data.name.slice(0, 30)}...` : data.name}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;
