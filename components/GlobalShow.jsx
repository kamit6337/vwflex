"use client";

import ShowLargeImage from "@components/ShowLargeImage";
import { toggleState } from "@redux/slice/toggleSlice";
import { useSelector } from "react-redux";

const GlobalShow = () => {
  const { inlargeImage } = useSelector(toggleState);

  if (inlargeImage.bool) {
    return <ShowLargeImage data={inlargeImage.data} />;
  }
};

export default GlobalShow;
