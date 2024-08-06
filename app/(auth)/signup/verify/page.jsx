"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OtpInput from "./OtpInput";
import Toastify from "@lib/Toastify";
import Loading from "@containers/Loading";
import modifyEmail from "@utils/javascript/modifyEmail";
import userCreate from "@api/query/auth/userCreate";

const VerifySignUp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(8).fill(""));
  const email = typeof window !== "undefined" && localStorage.getItem("email");

  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage, ToastContainer } = Toastify();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const modifyOtp = otp.join("");
      await userCreate(modifyOtp);
      router.push("/");
      localStorage.removeItem("email");
    } catch (error) {
      showErrorMessage({
        message: error.message || "Something went wrong. Please try later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center gap-2  bg-white text-black">
        <div className="h-[500px] mobile:w-full w-[600px] tablet:h-[450px] border shadow-lg rounded-xl flex flex-col justify-evenly items-center px-8">
          <div className="text-center">
            <p>Enter the 8 digit code you have received on</p>
            <p className="font-medium">{email ? modifyEmail(email) : ""}</p>
          </div>
          <OtpInput otp={otp} cb={(value) => setOtp(value)} />
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="mt-12 auth_submit_btn"
          >
            {isLoading ? <Loading small={true} /> : "Verify"}
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default VerifySignUp;
