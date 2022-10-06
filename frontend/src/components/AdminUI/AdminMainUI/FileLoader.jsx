import React from "react";

const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textHover">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>

      <div className="w-20 h-20  bg-button animate-ping rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-button blur-xl"></div>
      </div>
    </div>
  );
};

export default FileLoader;
