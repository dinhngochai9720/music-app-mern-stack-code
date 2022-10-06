import React, { useEffect } from "react";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../assets/img/login-image.jpg";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { validateUser } from "../api";

import Video from "../assets/video/login_bg.mp4";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  //   Login with Google
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      //   console.log(userCred); //In ra thong tin email dang nhap

      //   Dang nhap thanh cong thi luu thong tin trong localStorage
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      }

      firebaseAuth.onAuthStateChanged((userCred) => {
        // Dang nhap thanh cong
        if (userCred) {
          //   console.log(userCred); //Thong tin user dang nhap

          userCred.getIdToken().then((token) => {
            // console.log("Token: " + token); //Ma token cua user dang nhap

            validateUser(token).then((data) => {
              // console.log(data);
              dispatch({ type: actionType.SET_USER, user: data });
            });
          });

          navigate("/", { replace: true });
        }
        //Dang nhap khong thanh cong
        else {
          setAuth(false);

          dispatch({ type: actionType.SET_USER, user: null });

          navigate("/login");
        }
      });
    });
  };

  //Dang nhap thanh cong thi khi chon localhost:3000/login thi khoong quay ve trang login duoc nua (o lai trang Home)
  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <video
        src={Video}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center px-60 py-20  ">
        <div className="w-full h-full bg-primary flex ">
          <div className="w-1/2">
            <img src={imgLogin} alt="imgLogin" className="w-full h-full" />
          </div>

          <div className="w-1/2 p-6">
            <div className="bg-slate-200 w-full h-full rounded-md">
              <div className="flex items-center justify-end p-2 gap-2">
                <span className=" text-black text-base">
                  Bạn đã có tài khoản?
                </span>
                <button className=" text-white text-base font-semibold bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 hover:shadow-md duration-300 ease-in-out transition-all">
                  Đăng ký
                </button>
              </div>

              <div className="px-14 py-6">
                <div className="flex items-center justify-center flex-col">
                  <p className="text-black font-bold text-3xl mb-4 italic uppercase">
                    Music App
                  </p>
                  <p className="text-center text-black">
                    Đăng nhập bằng email đã đăng ký.
                  </p>
                </div>

                <div className="mt-4">
                  <form>
                    <div className="flex flex-col">
                      <label className="mb-1 text-black font-semibold">
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập email"
                        className="border-none outline-none p-2 rounded-md drop-shadow-lg"
                      />
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <label className=" text-black font-semibold">
                          Mật khẩu
                        </label>
                        <span className="text-blue-500 cursor-pointer">
                          Quên mật khẩu
                        </span>
                      </div>
                      <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="border-none outline-none p-2 rounded-md
                        w-full drop-shadow-lg"
                      />
                    </div>

                    <button className=" text-white text-base font-semibold bg-red-500 px-4 py-2 rounded-md mt-6 w-full drop-shadow-lg  hover:bg-red-600 hover:shadow-md duration-300 ease-in-out transition-all">
                      Đăng nhập
                    </button>
                  </form>
                </div>

                <div className="relative w-full h-1 bg-card mt-6">
                  <p className="absolute top-[-6px] right-[170px] bg-card w-[40px] text-center text-xs px-[5px] rounded-md">
                    OR
                  </p>
                </div>

                <div className="mt-6">
                  <div
                    className=" w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md  bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-300 ease-in-out transition-all"
                    onClick={loginWithGoogle}
                  >
                    <FcGoogle className="text-xl" />
                    Đăng nhập với Google
                  </div>
                </div>

                <div className="w-full mt-6 flex items-center justify-center gap-2">
                  <span className="text-sm">Bạn chưa có tài khoản?</span>
                  {/* <Link to='/home'> */}
                  <span className="text-base font-semibold text-blue-600 cursor-pointer">
                    Đăng ký
                  </span>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex items-center justify-center">
            <div className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md  bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-300 ease-in-out transition-all">
              <FcGoogle className="text-xl" />
              Sign in with Google
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
