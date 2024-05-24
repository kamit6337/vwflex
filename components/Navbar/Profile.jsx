"use client";
import logout from "@api/query/auth/logout";
import { Icons } from "@assets/icons";
import Toastify from "@lib/Toastify";
import { useEffect, useState } from "react";

const Profile = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState(null);
  const { ToastContainer, showErrorMessage } = Toastify();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      showErrorMessage({ message: "Issue in logout. Please try later" });
    }
  };

  return (
    <>
      <p
        className="h-full text-2xl cursor-pointer"
        onClick={() => setOpenProfile((prev) => !prev)}
      >
        <Icons.profile />
      </p>

      {openProfile && (
        <div
          className="absolute z-20 top-full mt-2 right-0 bg-slate-800 border border-white 
        flex flex-col gap-4 py-4 rounded-xl"
        >
          <p className="capitalize px-4">Hello, {user?.name}</p>
          <p
            className="hover:bg-slate-600 cursor-pointer px-4 py-2"
            onClick={handleLogout}
          >
            Sign Out ({user?.email})
          </p>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Profile;
