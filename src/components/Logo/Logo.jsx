import React from 'react';
import logoImage from "../../assets/logo.png";
import { Link } from 'react-router';

const Logo = () => {
    return (
      <Link to={"/"} className="pointer-coarse flex items-end ">
        <img src={logoImage} alt="" />
        <h3 className="text-3xl font-bold -ms-4">ZapShift</h3>
      </Link>
    );
};

export default Logo;