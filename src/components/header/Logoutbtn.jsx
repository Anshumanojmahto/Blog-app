import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";

const Logoutbtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logOut());
    });
  };

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100  hover:text-black hover:scale-105 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default Logoutbtn;
