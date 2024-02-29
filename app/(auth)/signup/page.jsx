"use client";

import userSignUp from "@api/query/auth/userSignUp";
import Loading from "@containers/Loading";
import environment from "@utils/environment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
const SERVER_URL = environment.SERVER_URL;

const SignUp = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (errors.root) {
      console.log("error", errors.root);

      clearErrors("root");
    }
  }, [errors.root, clearErrors]);

  const onSubmit = async (data) => {
    const formData = { ...data };
    delete formData.confirmPassword;

    try {
      await userSignUp(formData);

      router.push("/");
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  const googleOAuth = () => {
    const url = `${SERVER_URL}/auth/google`;

    const openWindow = window.open(url, "_self");

    if (!openWindow) {
      console.error("Failed to open the Google OAuth window");
    } else {
      openWindow.onerror = (event) => {
        console.error(
          "Error occurred while opening the Google OAuth window:",
          event
        );
      };
    }
  };

  return (
    <div className="bg-white text-black h-screen w-full flex flex-col gap-2 justify-center items-center bg-color_2">
      {/* NOTE: THE CENTER PAGE */}
      <div className="bg-color_1 box_shadow  h-[600px] w-[600px] border border-color_3 rounded-xl  justify-between items-center   flex flex-col p-6">
        {/* MARK: FORM AND GO TO LOGIN BUTTON*/}
        <p className="text-xl font-bold tracking-wide">Sign Up</p>

        {/* MARK: SIGNUP FORM*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full text-color_1"
        >
          {/* MARK: NAME FIELD*/}
          <div className="flex flex-col">
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              placeholder="Name"
              className="border  p-3 rounded-lg"
              autoComplete="off"
              spellCheck="false"
            />

            <p role="alert" className="text-xs text-red-500 pl-2 h-4">
              {/* {errors.name?.type === "required" && "Name is required"} */}
              {errors.name && errors.name.message}
            </p>
          </div>

          {/* MARK: EMAIL FIELD*/}
          <div className="flex flex-col">
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) => {
                  return (
                    validator.isEmail(value) ||
                    "Please provide correct Email Id."
                  );
                },
              })}
              placeholder="Email"
              className="border  p-3 rounded-lg"
              autoComplete="off"
              spellCheck="false"
            />

            <p role="alert" className="text-xs text-red-500 pl-2 h-4">
              {errors.email && errors.email.message}
            </p>
          </div>

          {/* MARK: PASSWORD FIELD*/}
          <div>
            <div className="h-12 flex justify-between items-center border  rounded-lg ">
              <input
                type={toggle.password ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password length should be greater than 8.",
                  },
                })}
                placeholder="Password"
                className="h-full w-full px-3 rounded-l-lg"
              />

              <div
                className="w-20 flex justify-center items-center text-color_4 cursor-pointer"
                onClick={() =>
                  setToggle((prev) => {
                    return {
                      ...prev,
                      password: !prev.password,
                    };
                  })
                }
              >
                <p>{toggle.password ? "Hide" : "Show"}</p>
              </div>
            </div>
            <p role="alert" className="text-xs text-red-500 pl-2 h-4">
              {errors.password && errors.password.message}
            </p>
          </div>

          {/* MARK: CONFIRM PASSWORD FIELD*/}
          <div>
            <div className="h-12 flex justify-between items-center border rounded-lg">
              <input
                type={toggle.confirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    return (
                      value === getValues("password") ||
                      "Passwords do not match"
                    );
                  },
                })}
                placeholder="Confirm Password"
                className="h-full w-full px-3 rounded-l-lg"
              />

              <div
                className="w-20 flex justify-center items-center text-color_4 cursor-pointer"
                onClick={() =>
                  setToggle((prev) => {
                    return {
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    };
                  })
                }
              >
                <p>{toggle.confirmPassword ? "Hide" : "Show"}</p>
              </div>
            </div>

            <p role="alert" className="text-xs text-red-500 pl-2 h-4">
              {errors.confirmPassword && errors.confirmPassword.message}
            </p>
          </div>

          {/* MARK: SUBMIT BUTTON*/}
          <div className="flex flex-col gap-2">
            <div className="h-12  rounded-lg bg-purple-300 font-semibold text-lg tracking-wide cursor-pointer w-full text-color_1">
              {isSubmitting ? (
                <Loading hScreen={false} small={true} />
              ) : (
                <input type="submit" className="w-full h-full cursor-pointer" />
              )}
            </div>
            <p className="text-sm ml-2 text-color_4">
              Already had account
              <span className="ml-2 underline">
                <Link href={`/login`}>Login</Link>
              </span>
            </p>
          </div>
        </form>

        {/* MARK: GO TO LOGIN PAGE*/}
        <div
          className=" rounded-lg p-3 w-full cursor-pointer bg-red-500 font-semibold  tracking-wide text-center"
          onClick={googleOAuth}
        >
          Login in Google
        </div>
      </div>
    </div>
  );
};

export default SignUp;
