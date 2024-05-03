import { Icons } from "@assets/icons";
import OnClickOutside from "@lib/onClickOutside";
import { toggleInLargeImage } from "@redux/slice/toggleSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/* eslint-disable @next/next/no-img-element */
const ShowLargeImage = ({ data }) => {
  const dispatch = useDispatch();
  const [widthOfImage, setWidthOfImage] = useState(window.innerWidth - 400);

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;

      if (innerWidth < 680) {
        const width = innerWidth - 100;
        setWidthOfImage(width);
      } else if (innerWidth < 900) {
        const width = innerWidth - 200;
        setWidthOfImage(width);
      } else {
        const width = innerWidth - 400;
        setWidthOfImage(width);
      }
    };

    // Initial call to handleResize
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleClose = () => {
    dispatch(toggleInLargeImage({ bool: false }));
  };

  const { ref } = OnClickOutside(handleClose);

  return (
    <section
      className="fixed top-0  left-0 w-full h-screen flex gap-4 justify-center items-center"
      style={{ zIndex: 1001 }}
    >
      <div className="absolute inset-0 bg-gray-50/80 " style={{ zIndex: -1 }} />
      <div className="" style={{ width: `${widthOfImage}px` }} ref={ref}>
        <img
          src={data}
          alt="large image"
          className="w-full object-cover rounded-md"
        />
      </div>

      {/* <p
        className="text-2xl cursor-pointer"
        onClick={() => dispatch(toggleInLargeImage({ bool: false }))}
      >
        <Icons.cancel />
      </p> */}
    </section>
  );
};

export default ShowLargeImage;
