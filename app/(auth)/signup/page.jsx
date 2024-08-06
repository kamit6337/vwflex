"use client";
import userSignUp from "@api/query/auth/userSignUp";
import CustomImages from "@assets/images";
import Loading from "@containers/Loading";
import Toastify from "@lib/Toastify";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";

const SignUp = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState({
    password: false,
    confirmPassword: false,
  });
  const { ToastContainer, showErrorMessage } = Toastify();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      console.log(res);
      setProviders(res);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = { ...data };
    delete formData.confirmPassword;

    try {
      const response = await userSignUp(formData);
      localStorage.setItem("user", JSON.stringify(response));
      router.push("/");
    } catch (error) {
      showErrorMessage({ message: error.message });
    }
  };

  const googleOAuth = (id) => {
    signIn(id);
  };

  return (
    <>
      <div className="bg-white text-black h-screen w-full flex flex-col gap-2 justify-center items-center ">
        {/* NOTE: THE CENTER PAGE */}
        <div className="box_shadow mobile:w-full w-[600px]  border  rounded-xl  justify-between items-center  flex flex-col gap-10 p-6 shadow-lg">
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
                  <input
                    type="submit"
                    className="w-full h-full cursor-pointer"
                  />
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
          {/* MARK: GO TO OAUTH LOGIN PAGE*/}
          {providers && (
            <div
              className="border rounded-lg p-3 w-full cursor-pointer font-semibold  tracking-wide flex justify-center items-center gap-4"
              onClick={() => googleOAuth(providers?.google.id)}
            >
              <div className="w-6">
                <Image
                  src={CustomImages.googleIcon}
                  alt="Google Icon"
                  className="w-full object-cover bg-transparent"
                />
              </div>
              <p>
                Sign Up with <span>{providers?.google.name}</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
