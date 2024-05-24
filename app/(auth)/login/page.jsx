"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@containers/Loading";
import Link from "next/link";
import environment from "@utils/environment";
import userLogin from "@api/query/auth/userLogin";
import Toastify from "@lib/Toastify";
import { Helmet } from "react-helmet";

const Login = () => {
  const router = useRouter();
  const [togglePassword, setTogglePassword] = useState(false);
  const msg = useSearchParams().get("msg");
  const { ToastContainer, showErrorMessage } = Toastify();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    showErrorMessage({ message: msg });
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await userLogin(data);
      localStorage.setItem("user", JSON.stringify(response));
      router.push("/");
    } catch (error) {
      showErrorMessage({
        message: error.message || "Something went wrong. Try later..",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="discription" content="Login Page of VWFLEX" />
      </Helmet>

      <div className="bg-white text-black h-screen w-full flex flex-col justify-center items-center gap-2 ">
        {/* NOTE: THE CENTER PAGE */}
        <div className="h-[500px] w-[600px] border rounded-xl flex flex-col justify-evenly items-center px-8 shadow-lg">
          {/* MARK: HEADLINE*/}
          <p className="text-xl font-bold tracking-wide">Login</p>
          {/* MARK: FORM AND GO TO LOGIN BUTTON*/}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full text-color_1"
          >
            {/* MARK: EMAIL FIELD*/}

            <div className="flex flex-col">
              <input
                type="email"
                {...register("email", {
                  required: true,
                  validate: (value) => {
                    return validator.isEmail(value);
                  },
                })}
                placeholder="Email"
                className="border  p-3 rounded-lg"
                autoComplete="off"
                spellCheck="false"
              />

              <p
                role="alert"
                className="text-xs text-red-500 pl-2 h-4 mt-[2px]"
              >
                {errors.email?.type === "required" && " Email is required"}
                {errors.email?.type === "validate" &&
                  "Please provide correct Email Id."}
              </p>
            </div>

            {/* MARK: PASSWORD FIELD*/}
            <div>
              <div className="h-12 flex justify-between items-center border rounded-lg w-full ">
                <input
                  type={togglePassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className="w-full h-full rounded-l-lg px-3"
                />

                <div
                  className="text-color_4 cursor-pointer w-20 h-full flex justify-center items-center"
                  onClick={() => setTogglePassword((prev) => !prev)}
                >
                  <p>{togglePassword ? "Hide" : "Show"}</p>
                </div>
              </div>
              <p
                role="alert"
                className="text-xs text-red-500 pl-2 h-4 mt-[2px]"
              >
                {errors.password?.type === "required" &&
                  " Password is required"}
              </p>
            </div>

            {/* MARK: SUBMIT BUTTON*/}

            <div className="flex flex-col gap-2">
              <div className="border h-12 mt-8 rounded-lg bg-purple-300 font-semibold text-lg tracking-wide cursor-pointer w-full text-center ">
                {/* <Loading hScreen={false} small={true} /> */}

                {isSubmitting ? (
                  <Loading hScreen={false} small={true} />
                ) : (
                  <input
                    type="submit"
                    className="w-full h-full cursor-pointer"
                  />
                )}
              </div>
              <div className=" text-color_4 text-sm flex justify-between items-center">
                <p>
                  Create an account
                  <span className="ml-2 underline">
                    <Link href={`/signup`}>Sign Up</Link>
                  </span>
                </p>
                <p>
                  <Link href={`/forgotPassword`}>Forgot Password</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
