import React, { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { getAllArtists, getAllUsers } from "../../../api";
import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";

import AdminUsersCard from "./AdminUsersCard";

const AdminUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      // Call API trong backend tim kiem so luong tai khoan
      getAllUsers().then((data) => {
        dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.users });
      });
    }
  }, []);

  return (
    <section className="text-textHover h-full w-full flex flex-col items-center">
      {/* Filter Search */}
      <div className="mt-8 flex items-center justify-center h-[10%] mb-4">
        <div className="flex items-center w-[750px] h-full gap-2 bg-adminBgColor2 py-2 px-4 rounded-full  focus-within:bg-adminBgFocus text-textHover ">
          <IoSearchOutline className="text-2xl" />
          <input
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, album,..."
            className="border-none outline-none w-full  bg-adminBgColor2  focus:bg-adminBgFocus placeholder:text-textHover"
          />
        </div>

        <button className="bg-adminBgColor2 hover:bg-adminBgFocus cursor-pointer duration-300 ease-in-out transition-all ml-6 w-[150px] h-full flex items-center justify-center text-textHover rounded-full text-md">
          Tìm kiếm
        </button>
      </div>

      {/* Table data form */}
      <div className="relative bg-adminBgColor w-[90%] h-[90%]  px-10 overflow-y-scroll scrollbaradmin m-8 flex flex-col items-center justify-start border border-textHover rounded-md">
        {/* Count */}
        <div className="absolute w-full h-[10%] flex items-center text-textHover px-10">
          <p className="text-md font-bold ">
            Tài khoản:
            <span className="text-md font-bold ml-2">
              {allUsers?.length > 0 ? allUsers?.length : 0}
            </span>
          </p>
        </div>

        {/* Table */}
        <div className="absolute w-full h-full flex flex-col p-10">
          {/* Table Heading */}
          <div className=" w-full h-[10%] mb-2 grid grid-cols-12 gap-2  border-b-textHover border-b-[1px]">
            <p className="text-md text-textHover font-semibold col-start-2 col-end-3 flex items-center justify-center">
              Ảnh
            </p>
            <p className="text-md text-textHover font-semibold col-start-3 col-end-5 flex items-center justify-center">
              Tài khoản
            </p>
            <p className="text-md text-textHover font-semibold col-start-5 col-end-7 flex items-center justify-center">
              Email
            </p>
            <p className="text-md text-textHover font-semibold col-start-7 col-end-9 flex items-center justify-center">
              Verified
            </p>
            <p className="text-md text-textHover font-semibold col-start-9 col-end-11 flex items-center justify-center">
              Ngày tạo
            </p>
            <p className="text-md text-textHover font-semibold col-start-11 col-end-13 flex items-center justify-center">
              Role
            </p>
          </div>

          {/* Table Content */}
          <div className=" w-full h-[90%] ">
            {allUsers &&
              allUsers.map((data, i) => <AdminUsersCard data={data} key={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUsers;
