import React from "react";
import authImage from "../assets/authImage.png";
import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-white">
      <div className=" flex flex-col justify-center px-8 md:px-20 py-10">
        {/* Page Content */}
        <div className="max-w-md w-full">
          <Outlet />
        </div>
      </div>

      {/* RIGHT SIDE → illustration */}
      <div className="hidden md:flex justify-center items-center bg-[#F7FBEF]">
        <img src={authImage} alt="Auth Illustration" className="w-[70%]" />
      </div>
    </div>
  );
};

export default AuthLayout;
