"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OtpInput from "./OtpInput";
import Toastify from "@lib/Toastify";
import Loading from "@containers/Loading";
import modifyEmail from "@utils/javascript/modifyEmail";
import { useMutation } from "@apollo/client";
import signUpVerifySchema, {
  postSignUpVerifyDataQuery,
} from "@graphql/auth/signUpVerifySchema";
import Cookies from "js-cookie";

const VerifySignUp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const localStorageEmail =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;
  const email = localStorageEmail || "example@gmail.com";
  const { showErrorMessage } = Toastify();

  const [mutate, { loading, error, data, reset }] =
    useMutation(signUpVerifySchema);

  useEffect(() => {
    if (error) {
      showErrorMessage({ message: error.message });
      reset();
    }
  }, [error, reset, showErrorMessage]);

  useEffect(() => {
    if (data && data[postSignUpVerifyDataQuery]) {
      const token = data[postSignUpVerifyDataQuery];

      Cookies.set("_use", token, { expires: 30 });

      localStorage.removeItem("email");
      router.push("/");
      reset();
    }
  }, [data, router, reset]);

  const handleSubmit = async () => {
    const modifyOtp = otp.join("");

    mutate({
      variables: { otp: modifyOtp, email },
    });
  };

  return (
    <div className="space-y-10 pt-10">
      <div className="text-center">
        <p>Enter the 6 digit code you have received on</p>
        <p className="font-medium">{email ? modifyEmail(email) : ""}</p>
      </div>
      <OtpInput otp={otp} cb={(value) => setOtp(value)} />
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-12 auth_submit_btn auth_btn"
      >
        {loading ? <Loading small={true} /> : "Verify"}
      </button>
    </div>
  );
};

export default VerifySignUp;
