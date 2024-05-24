"use client";

import checkUserLogin from "@api/query/auth/checkUserLogin";
import getFixed from "@api/query/fixed/getFixed";
import userWatchlist from "@api/query/watchlist/userWatchlistTv";
import { initialFixedData } from "@redux/slice/fixedSlice";
import { initialWatchlistData } from "@redux/slice/watchlistSlice";
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
        const [userLogin, fixedQuery] = await Promise.all([
          checkUserLogin(),
          getFixed(),
        ]);
        const watchlist = await userWatchlist(userLogin._id);
        dispatch(initialFixedData(fixedQuery));
        dispatch(initialWatchlistData(watchlist));
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
