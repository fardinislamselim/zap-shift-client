import React from "react";
import { FaGoogle } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, signInGoogle } = useAuth();

  const onSubmit = (data) => {
    registerUser(data.email, data.password)
      .then((result) => console.log(result.user))
      .catch((err) => console.log(err.message));
  };

  const logInWithGoogle = () => {
    signInGoogle();
  };

  return (
    <div>
      <div className="mb-8">
        <Logo />
      </div>

      <h1 className="text-2xl font-bold mb-1">Create an Account</h1>
      <p className="text-gray-500 mb-6 text-sm">Register with ZapShift</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          className="input input-bordered w-full"
        />
        {errors.name?.type === "required" && (
          <p className="-mt-4 text-red-500">Name is required</p>
        )}

        {/* Email */}
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email?.type === "required" && (
          <p className="-mt-4 text-red-500">Email is required</p>
        )}

        {/* Password */}
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 6,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
          placeholder="Password"
          className="input input-bordered w-full"
        />
        {errors.password?.type === "required" && (
          <p className="-mt-4 text-red-500">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="-mt-4 text-red-500">
            Password must be at least 6 characters
          </p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="-mt-4 text-red-500">
            Password must include uppercase, lowercase, number, and special
            character
          </p>
        )}

        <button
          type="submit"
          className="btn w-full bg-lime-400 text-black hover:bg-lime-500"
        >
          Register
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 cursor-pointer">
          Login
        </Link>
      </p>

      <div className="divider my-4">Or</div>

      <button
        onClick={logInWithGoogle}
        className="btn btn-outline w-full flex items-center justify-center gap-2"
      >
        <FaGoogle /> Register with Google
      </button>
    </div>
  );
};

export default Register;
