"use client";

import getFixed from "@api/query/fixed/getFixed";
import { initialFixedData } from "@redux/slice/fixedSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UserLoginProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isSuccessful, setIsSuccessful] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIsUserLoggedIn = async () => {
      try {
        const fixedQuery = await getFixed();
        dispatch(initialFixedData(fixedQuery));
        setIsSuccessful(true);
      } catch (error) {
        setIsSuccessful(false);
        router.push(`/login?msg=${error.message}`);
      }
    };

    checkIsUserLoggedIn();
  }, [dispatch, router]);

  if (isSuccessful) {
    return children;
  }
};

export default UserLoginProvider;
