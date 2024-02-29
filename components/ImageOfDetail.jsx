/* eslint-disable @next/next/no-img-element */
"use client";

import { fixedState } from "@redux/slice/fixedSlice";
import { useSelector } from "react-redux";

const ImageOfDetail = ({ backdrop_path, title }) => {
  const { imageDetail } = useSelector(fixedState);

  const size = imageDetail.backdrop_sizes.at(-1);
  const createBaseUrl = `${imageDetail.secure_base_url}${size}`;
  const createPhoto = `${createBaseUrl}${backdrop_path}`;

  return (
    <img
      src={createPhoto}
      alt={title}
      className="h-full rounded-xl object-cover"
    />
  );
};

export default ImageOfDetail;
