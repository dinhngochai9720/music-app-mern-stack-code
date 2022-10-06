import React, { useState } from 'react';

import { motion } from 'framer-motion';
import moment from 'moment';
import { useStateValue } from '../../../context/StateProvider';
import { changingUserRole, getAllUsers, removeUser } from '../../../api';
import { actionType } from '../../../context/reducer';

import { RiDeleteBin6Line } from 'react-icons/ri';

const AdminUsersCard = ({ data, index }) => {
  const [{ user, allUsers }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);

  const createdAt = moment(new Date(data.createdAt)).format('MMMM Do YYYY');

  const updateUserRole = (userId, role) => {
    setIsUserRoleUpdated(false);

    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.users });
        });
      }
    });
  };

  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.users });
        });
      }
    });
  };

  return (
    <motion.div className="w-full grid grid-cols-12 gap-2 bg-adminBgColor2 py-6 rounded-md  hover:bg-adminBgFocus hover:shadow-md text-sm mb-2 cursor-pointer duration-200 ease-in-out transition-all">
      {/* icon delete */}
      {/* data._id !== user?.user._id (Khong cho phep hien icon delete o tai khoan co quyen Admin cao nhat) */}
      {data._id !== user?.user._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="col-start-1 col-end-2 flex items-center justify-center"
        >
          <RiDeleteBin6Line
            className="text-xl text-cartNumBg hover:text-button cursor-pointer duration-200 ease-in-out transition-all"
            onClick={() => deleteUser(data._id)}
          />
        </motion.div>
      )}

      {/* image */}
      <div className="col-start-2 col-end-3 flex items-center justify-center">
        <img
          src={data.imageUrl}
          alt="imageUrl"
          className="h-10 w-10 object-cover rounded-full min-w-[40px] shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* name */}
      <p className="col-start-3 col-end-5  flex items-center justify-center text-sm text-textColor2">
        {data.name}
      </p>

      <p className="col-start-5 col-end-7  flex items-center justify-center text-sm text-textColor2">
        {data.email}
      </p>

      <p className="col-start-7 col-end-9  flex items-center justify-center text-sm text-textColor2">
        {data.email_verified ? 'True' : 'False'}
      </p>

      <p className="col-start-9 col-end-11  flex items-center justify-center text-sm text-textColor2">
        {createdAt}
      </p>

      {/* <p className="col-start-11 col-end-13  flex items-center justify-center text-sm text-textColor2">
        {data.role}
      </p> */}

      <div className="relative col-start-11 col-end-13  flex items-center justify-center text-sm text-textColor2 gap-2">
        <p className="flex items-center justify-center text-sm text-textColor2">
          {data.role}
        </p>

        {/* data._id !== user?.user._id (user?.user._id là: admin duy nhất(dinhngochai2kqn@gmail.com có quyền admin cao nhất - đăng ký admin trong firebase - xem tại backend/config), data._id là: các user member đã đăng nhập khác)*/}
        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.5 }}
            className="flex items-center justify-center text-[10px] font-semibold text-textColor2 px-1 bg-seconday rounded-sm cursor-pointer duration-200 ease-in-out transition-all hover:bg-activeColor hover:text-textHover"
            onClick={() => {
              setIsUserRoleUpdated(true);
            }}
          >
            {data.role === 'Admin' ? 'Member' : 'Admin'}
          </motion.p>
        )}

        {isUserRoleUpdated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-8 right-4 p-2 flex flex-col gap-2 bg-textHover shadow-xl rounded-md"
          >
            <p className="text-headingColor text-xs font-normal text-center">
              Bạn có muốn phân quyền thành
              <span>{data.role === 'Admin' ? ' Member' : ' Admin'}</span> ?
            </p>

            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none bg-adminBgDanger text-xs font-normal text-adminTextDanger px-2 rounded-md"
                onClick={() =>
                  updateUserRole(
                    data._id,
                    data.role === 'Admin' ? 'Member' : 'Admin'
                  )
                }
              >
                Có
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none bg-adminBgSuccess text-xs font-normal text-adminTextSuccess px-2 rounded-md"
                onClick={() => {
                  setIsUserRoleUpdated(false);
                }}
              >
                Không
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminUsersCard;
