"use client";
import checkUserLogin from "@api/query/auth/checkUserLogin";
import logout from "@api/query/auth/logout";
import { Icons } from "@assets/icons";
import { useEffect, useState } from "react";

const Profile = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await checkUserLogin();
        setUser(response);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("error in logout", error);
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
    </>
  );
};

export default Profile;
