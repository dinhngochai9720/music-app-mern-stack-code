import React from "react";

const ContentSliderCard = ({ data }) => {
  return (
    <div className="relative w-full h-[200px] p-4 flex items-center ">
      <div className="flex items-center justify-center w-[100%] h-[100%]">
        <img
          src={data.imageURL}
          alt={data.name}
          className="w-full h-full cursor-pointer rounded-xl object-fit"
        />
      </div>

      {/* <p className="absolute top-[45%] left-0 right-0 w-full h-[15%] text-xl font-semibold text-primary flex items-center justify-center">
        {data.name.length > 15 ? `${data.name.slice(0, 15)}...` : data.name}
      </p> */}
    </div>
  );
};

export default ContentSliderCard;
