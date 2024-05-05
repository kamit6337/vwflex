/* eslint-disable @next/next/no-img-element */
import fetchTvShowAdditional from "@api/query/tv/fetchTvShowAdditional";
import Loading from "@containers/Loading";
import { fixedState } from "@redux/slice/fixedSlice";
import { toggleInLargeImage } from "@redux/slice/toggleSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

const TvShowsImages = ({ id }) => {
  const dispatch = useDispatch();
  const { imageDetail } = useSelector(fixedState);

  const { isLoading, data } = useQuery({
    queryKey: ["TV Shows Images", id],
    queryFn: () => fetchTvShowAdditional(id, { images: true }),
    staleTime: Infinity,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="w-full h-96 ">
        <Loading />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, we do not have images</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 sm_lap:grid-cols-3 tablet:grid-cols-2  gap-4 px-5 pb-20 pt-10">
        {data.map((obj, i) => {
          const { path } = obj;

          const size = imageDetail.backdrop_sizes[0];
          const orginalSize = imageDetail.backdrop_sizes.at(-1);
          const createPhoto = `${imageDetail.secure_base_url}${size}${path}`;
          const originalPhoto = `${imageDetail.secure_base_url}${orginalSize}${path}`;

          return (
            <div
              key={i}
              className="w-full cursor-pointer"
              onClick={() =>
                dispatch(
                  toggleInLargeImage({ bool: true, data: originalPhoto })
                )
              }
            >
              <img
                src={createPhoto}
                alt={`Photo ${i}`}
                className="w-full object-cover rounded-md"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TvShowsImages;
