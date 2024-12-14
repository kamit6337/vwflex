"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { useRouter } from "next/navigation";
import Loading from "@containers/Loading";
import Link from "next/link";
import Toastify from "@lib/Toastify";
import CustomImages from "@assets/images";
import Image from "next/image";
import { Icons } from "@assets/icons";
import environment from "@utils/environment";
import { useMutation } from "@apollo/client";
import loginSchema, { postLoginUserDataQuery } from "@graphql/auth/loginSchema";
import Cookies from "js-cookie";

const Login = ({ msg }) => {
  const router = useRouter();
  const [togglePassword, setTogglePassword] = useState(false);
  const { showErrorMessage } = Toastify();

  const [mutate, { loading, data, error, reset }] = useMutation(loginSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message });
      reset();
    }
  }, [error, reset, showErrorMessage]);

  useEffect(() => {
    if (data && data[postLoginUserDataQuery]) {
      const token = data[postLoginUserDataQuery];
      Cookies.set("_use", token, { expires: 30 });
      router.push("/");
      reset();
    }
  }, [data, router, reset]);

  useEffect(() => {
    if (msg) {
      showErrorMessage({ message: msg });
    }
  }, [msg, showErrorMessage]);

  const onSubmit = async (data) => {
    mutate({
      variables: { ...data },
    });
  };

  const googleOAuth = () => {
    console.log("Google OAuth Login");
    const url = `${environment.SERVER_URL}/auth/google`;
    const openWindow = window.open(url, "_self");

    if (!openWindow) {
      showErrorMessage({
        message:
          "Error in Google OAuth login. Try login with Email and Password",
      });
    } else {
      openWindow.onerror = () => {
        showErrorMessage({
          message:
            "Error in Google OAuth login. Try login with Email and Password",
        });
      };
    }
  };

  return (
    <>
      {/* MARK: HEADLINE*/}
      <p className="auth_page_title">Sign In.</p>

      {/* MARK: GO TO OAUTH LOGIN PAGE*/}
      <div
        className="border border-auth_input_border rounded-lg py-3 w-full cursor-pointer flex justify-center items-center gap-4"
        onClick={() => googleOAuth()}
      >
        <div className="w-6">
          <Image
            src={CustomImages.googleIcon}
            alt="Google Icon"
            className="w-full object-cover bg-transparent"
          />
        </div>
        <p>Continue with Google</p>
      </div>

      <div className="w-full flex items-center gap-2 my-10">
        <div className="flex-1 h-[2px]  bg-auth_input_border" />
        <p className="text-auth_input_border">Or</p>
        <div className="flex-1 h-[2px]  bg-auth_input_border" />
      </div>

      {/* MARK: FORM AND GO TO LOGIN BUTTON*/}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* MARK: EMAIL FIELD*/}
        <div className="w-full">
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                return (
                  validator.isEmail(value) || "Please provide correct Email Id."
                );
              },
            })}
            placeholder="Email"
            className="auth_input"
            autoComplete="off"
            spellCheck="false"
          />

          <p role="alert" className="text-xs text-red-500 pl-2 h-4 mt-[2px]">
            {errors.email?.message}
          </p>
        </div>

        {/* MARK: PASSWORD FIELD*/}
        <div className="h-12 flex justify-between items-center border border-auth_input_border rounded-lg w-full ">
          <input
            type={togglePassword ? "text" : "password"}
            {...register("password", { required: "Password in required" })}
            placeholder="Password"
            className="auth_input_password"
          />

          <div
            className="cursor-pointer w-14 h-full flex justify-center items-center"
            onClick={() => setTogglePassword((prev) => !prev)}
          >
            {togglePassword ? (
              <Icons.eyeOff className="text-xl" />
            ) : (
              <Icons.eyeOn className="text-xl" />
            )}
          </div>
        </div>
        <p role="alert" className="text-xs text-red-500 pl-2 h-4 mt-[2px]">
          {errors.password?.type === "required" && " Password is required"}
        </p>

        {/* MARK: SUBMIT BUTTON*/}
        <div className="space-y-2">
          <button
            type="submit"
            disabled={loading}
            className="auth_btn auth_submit_btn"
          >
            {loading ? <Loading hScreen={false} small={true} /> : "Sign In."}
          </button>
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm">don’t have an account?</p>
            <Link href={`/signup`}>
              <p className="font-bold">Create a account</p>
            </Link>
          </div>
          <div className="font-bold flex justify-center">
            <Link href={`/forgotPassword`}>Forgot Password</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
