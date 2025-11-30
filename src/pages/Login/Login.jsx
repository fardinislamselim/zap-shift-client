import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Logo from "../../components/Logo/Logo";

const Login = () => {
  const { signInUser, signInGoogle } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoginError("");

    signInUser(data.email, data.password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setLoginError(err.message.replace("Firebase: Error ", ""));
      });
  };

  const logInWithGoogle = () => {
    signInGoogle()
      .then(() => navigate(from, { replace: true }))
      .catch((err) => {
        console.error(err);
        setLoginError(err.message.replace("Firebase: Error ", ""));
      });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <Logo />
      </div>

      <h1 className="text-3xl text-center font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-500 text-center mb-6">Login to your account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <label className="form-control w-full mb-4">
          <span className="label-text font-semibold">Email</span>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="input input-bordered w-full"
          />
        </label>
        {errors.email && (
          <p className="text-red-500 text-sm -mt-2 mb-3">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="form-control w-full mb-2 relative">
          <span className="label-text font-semibold">Password</span>

          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="input input-bordered w-full pr-10"
          />

          {/* 👁️ Password Toggle Button */}
          <div
            className="absolute right-3 top-[35px] cursor-pointer text-xl text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </label>
        {errors.password && (
          <p className="text-red-500 text-sm -mt-2 mb-2">{errors.password.message}</p>
        )}

        <p className="text-sm text-accent mb-6 cursor-pointer text-right">
          Forgot Password?
        </p>

        {/* Error */}
        {loginError && (
          <div role="alert" className="alert alert-error text-sm mb-4">
            <span>{loginError}</span>
          </div>
        )}

        <button type="submit" className="btn btn-primary text-white w-full mb-4">
          Login
        </button>
      </form>

      <p className="text-sm text-center mb-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary font-bold hover:underline">
          Register
        </Link>
      </p>

      <div className="divider">OR</div>

      <button
        onClick={logInWithGoogle}
        className="btn btn-outline w-full text-primary border-primary hover:bg-primary hover:text-white"
      >
        <FaGoogle className="mr-2" />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
