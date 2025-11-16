
import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/NavBar/navbar";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayot = () => {
  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayot;
