import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navLink = (
    <>
      <li>
        <NavLink to={"services"}> Services</NavLink>
      </li>
      <li>
        <NavLink to={"coverage"}> Coverage </NavLink>
      </li>
      <li>
        <NavLink to={"deshboard"}> Deshboard </NavLink>
      </li>
      <li>
        <NavLink to={"sendParcel"}> Send Parcel </NavLink>
      </li>
      <li>
        <NavLink to={"rider"}> Be A rider </NavLink>
      </li>
    </>
  );

  return (
    <div className="py-4">
      <div className="navbar bg-base-300 rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLink}
            </ul>
          </div>
          <div>
            <Logo />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button onClick={logOut} className="btn btn-primary text-black">
              sign out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-primary btn-outline mr-2 text-black"
              >
                Sign in
              </Link>
              <Link to="/be-a-rider" className="btn  btn-primary text-black">
                Be A Rider
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
