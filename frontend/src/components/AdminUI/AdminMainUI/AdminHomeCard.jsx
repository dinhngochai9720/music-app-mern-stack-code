import React from "react";
import { FaUsers } from "react-icons/fa";

//

const AdminHomeCard = ({ icon, name, count }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 p-8 rounded-3xl bg-adminBgColor3 cursor-pointer  hover:scale-105 duration-300 ease-in-out transition-all hover:bg-textHover text-headingColor hover:text-black">
      {icon}
      <p className="text-xl font-semibold  ">{name}</p>
      <p className="text-xl  ">{count}</p>
    </div>
  );
};

export default AdminHomeCard;
