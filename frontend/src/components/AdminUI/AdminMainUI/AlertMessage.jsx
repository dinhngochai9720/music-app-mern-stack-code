import React from "react";

import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from "react-icons/hi";
import { motion } from "framer-motion";

const AlertMessage = ({ type }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        initial={{ translateX: 200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: 200, opacity: 0 }}
        key={type}
        className={`w-[20%] fixed top-0 p-2 rounded-md backdrop-blur-md flex items-center justify-center shadow-md text-sm  ${
          type === "success" && "bg-adminBgSuccess text-adminTextSuccess"
        } ${type === "danger" && "bg-adminBgDanger text-adminTextDanger"}`}
      >
        {type === "success" && (
          <div className="flex items-center justify-center">
            <HiOutlineEmojiHappy className="" />
            <p className="ml-2">Thành công</p>
          </div>
        )}

        {type === "danger" && (
          <div className="flex items-center justify-center">
            <HiOutlineEmojiSad className="" />
            <p className="ml-2">Thất bại. Vui lòng thử lại!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AlertMessage;
