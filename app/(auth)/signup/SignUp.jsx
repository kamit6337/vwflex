"use client";
import { useMutation } from "@apollo/client";
import { Icons } from "@assets/icons";
import CustomImages from "@assets/images";
import Loading from "@containers/Loading";
import signUpSchema, {
  postSignUpUserDataQuery,
} from "@graphql/auth/signUpSchema";
import Toastify from "@lib/Toastify";
import environment from "@utils/environment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";

const SignUp = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState({
    password: false,
    confirmPassword: false,
  });

  const [mutate, { loading, error, data, reset }] = useMutation(signUpSchema);

  const { showErrorMessage } = Toastify();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message });
      reset();
    }
  }, [error, reset, showErrorMessage]);

  useEffect(() => {
    if (data && data[postSignUpUserDataQuery]) {
      localStorage.setItem("email", getValues("email"));
      router.push("/signup/verify");
      reset();
    }
  }, [data, getValues, router, reset]);

  const onSubmit = async (data) => {
    const formData = { ...data };
    delete formData.confirmPassword;

    mutate({
      variables: { ...formData },
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
      {/* MARK: FORM AND GO TO LOGIN BUTTON*/}
      <p className="auth_page_title">Sign Up.</p>

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

      {/* MARK: SIGNUP FORM*/}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* MARK: NAME FIELD*/}
        <div className="w-full">
          <input
            type="text"
            {...register("name", {
              required: "Name is Required",
            })}
            placeholder="Name"
            className="auth_input"
            autoComplete="off"
            spellCheck="false"
          />

          <p role="alert" className="text-xs text-red-500 pl-2 h-4">
            {errors.name && errors.name.message}
          </p>
        </div>

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

          <p role="alert" className="text-xs text-red-500 pl-2 h-4">
            {errors.email && errors.email.message}
          </p>
        </div>

        {/* MARK: PASSWORD FIELD*/}
        <div>
          <div className="h-12 flex justify-between items-center border border-auth_input_border rounded-lg w-full">
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
              className="auth_input_password"
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
              {toggle.password ? (
                <Icons.eyeOff className="text-xl" />
              ) : (
                <Icons.eyeOn className="text-xl" />
              )}
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
                    value === getValues("password") || "Passwords do not match"
                  );
                },
              })}
              placeholder="Confirm Password"
              className="auth_input_password"
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
              {toggle.confirmPassword ? (
                <Icons.eyeOff className="text-xl" />
              ) : (
                <Icons.eyeOn className="text-xl" />
              )}
            </div>
          </div>

          <p role="alert" className="text-xs text-red-500 pl-2 h-4">
            {errors.confirmPassword && errors.confirmPassword.message}
          </p>
        </div>

        {/* MARK: SUBMIT BUTTON*/}
        <div className="space-y-2">
          <button
            type="submit"
            disabled={loading}
            className="auth_submit_btn auth_btn"
          >
            {loading ? <Loading hScreen={false} small={true} /> : "Sign Up."}
          </button>
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm">Already had account?</p>
            <Link href={`/login`}>
              <p className="font-bold">Login</p>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
