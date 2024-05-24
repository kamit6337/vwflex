/* eslint-disable @next/next/no-img-element */
import fetchMovieAdditional from "@api/query/movie/fetchMovieAdditional";
import Loading from "@containers/Loading";
import { useSelector } from "react-redux";
import { fixedState } from "@redux/slice/fixedSlice";
import { useQuery } from "@tanstack/react-query";
import ExpandableText from "@lib/ExpandableText";

const Reviews = ({ id }) => {
  const { imageDetail } = useSelector(fixedState);

  const { isLoading, data } = useQuery({
    queryKey: ["Movie Reviews", id],
    queryFn: () => fetchMovieAdditional(id, { reviews: true }),
    staleTime: Infinity,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="w-full h-96">
        <Loading />
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, we do not have reviews</p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 py-20 flex flex-col gap-20 tablet:px-2">
        {data.data.map((obj, i) => {
          const {
            author,
            content,
            author_details: { avatar_path, name, rating, username },
            updated_at,
          } = obj;

          const orginalSize = imageDetail.backdrop_sizes.at(-1);
          const originalPhoto = `${imageDetail.secure_base_url}${orginalSize}${avatar_path}`;

          return (
            <div
              key={i}
              className="flex gap-4 bg-slate-800 rounded-xl py-5 px-3 tablet:gap-2 tablet:px-2"
            >
              <div className="w-32 sm_lap:w-24 flex flex-col items-center tablet:w-14">
                {avatar_path && (
                  <div className="size-16 sm_lap:size-14 tablet:size-10">
                    <img
                      src={originalPhoto}
                      alt={author}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                )}
                <p className="mt-2 break-all tablet:text-sm">{author}</p>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {rating && <p>{rating}/10</p>}
                <div className="tablet:text-xs sm_lap:text-sm tablet:leading-5 leading-6 tablet:tracking-wider tracking-wide">
                  <ExpandableText text={content} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Reviews;
