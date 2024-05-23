/* eslint-disable @next/next/no-img-element */
"use client";

import { fixedState } from "@redux/slice/fixedSlice";
import { useSelector } from "react-redux";

const ImageOfPerson = ({ data, alt }) => {
  const { imageDetail } = useSelector(fixedState);

  const size = imageDetail.profile_sizes.at(-1);
  const createBaseUrl = `${imageDetail.secure_base_url}${size}`;
  const createPhoto = `${createBaseUrl}${data}`;

  return (
    <img
      src={createPhoto}
      alt={alt}
      className="w-full object-cover rounded-md"
    />
  );
};

export default ImageOfPerson;
