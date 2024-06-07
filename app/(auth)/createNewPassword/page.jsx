"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import Toastify from "@lib/Toastify";
import Loading from "@containers/Loading";
import newPassword from "@api/mutation/newPassword";
import { useRouter, useSearchParams } from "next/navigation";

const CreateNewPassword = () => {
  const router = useRouter();
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const email = useSearchParams().get("email");
  const token = useSearchParams().get("token");

  const { ToastContainer, showErrorMessage, showSuccessMessage } = Toastify();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const { password } = data;

    try {
      await newPassword(email, token, password);
      showSuccessMessage({ message: "Password has changed. Login Again.." });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      showErrorMessage({ message: error.message });
    }
  };

  return (
    <>
      <Helmet>
        <title>Create New Password</title>
        <meta name="discription" content="create new password" />
      </Helmet>
      <section className="h-screen w-full flex justify-center items-center bg-white text-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-80 w-[500px]  border rounded-md p-5 shadow-lg"
        >
          <p className="text-center font-semibold tracking-wide mb-10">
            Create New Password
          </p>
          {/* MARK: PASSWORD FIELD*/}
          <div>
            <div className="h-12 flex justify-between items-center border  rounded-lg ">
              <input
                type={togglePassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password length should be greater than 8.",
                  },
                })}
                placeholder="Password"
                className="h-full w-full px-3 rounded-l-lg"
                autoComplete="off"
                spellCheck="false"
              />

              <div
                className="w-20 flex justify-center items-center text-color_4 cursor-pointer"
                onClick={() => setTogglePassword((prev) => !prev)}
              >
                <p>{togglePassword ? "Hide" : "Show"}</p>
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
                type={toggleConfirmPassword ? "text" : "password"}
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
                onClick={() => setToggleConfirmPassword((prev) => !prev)}
              >
                <p>{toggleConfirmPassword ? "Hide" : "Show"}</p>
              </div>
            </div>

            <p role="alert" className="text-xs text-red-500 pl-2 h-4">
              {errors.confirmPassword && errors.confirmPassword.message}
            </p>
          </div>

          {/* MARK: SUBMIT BUTTON*/}
          <div className="h-12  rounded-lg bg-purple-300 font-semibold text-lg tracking-wide cursor-pointer w-full text-color_1">
            {isSubmitting ? (
              <Loading hScreen={false} small={true} />
            ) : (
              <input type="submit" className="w-full h-full cursor-pointer" />
            )}
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default CreateNewPassword;
