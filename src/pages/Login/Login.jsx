import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInGoogle } = useAuth();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => console.log(result.user))
      .catch((err) => console.log(err.message));
  };

  const logInWithGoogle = () => {
    signInGoogle();
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <Logo />
      </div>
      {/* Title */}
      <h1 className="text-3xl text-center font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-500 text-center mb-2">Login to your account</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        {/* Email */}
        <label className="form-control w-full mb-4">
          <span className="label-text">Email</span>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="input input-bordered w-full"
          />
        </label>
        {errors.name?.type === "required" && (
          <p className="my-2 text-red-500">Email is required</p>
        )}
        {/* Password */}
        <label className="form-control w-full mb-2">
          <span className="label-text">Password</span>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter your password"
            className="input input-bordered w-full"
          />
        </label>
        {errors.name?.type === "required" && (
          <p className="text-red-500">Email is required</p>
        )}
        <p className="text-sm text-accent mb-6 cursor-pointer">
          Forgot Password?
        </p>
        {/* Login Button */}
        <button className="btn btn-primary text-black w-full mb-4">
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className="text-sm text-center mb-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-accent cursor-pointer">
          Register
        </Link>
      </p>

      {/* Divider */}
      <div className="divider">OR</div>

      {/* Google Login */}
      <button onClick={logInWithGoogle} className="btn btn-outline w-full">
        <FaGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
