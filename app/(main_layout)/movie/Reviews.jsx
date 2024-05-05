/* eslint-disable @next/next/no-img-element */
import fetchMovieAdditional from "@api/query/movie/fetchMovieAdditional";
import Loading from "@containers/Loading";
import { useSelector } from "react-redux";
import { fixedState } from "@redux/slice/fixedSlice";
import { useQuery } from "@tanstack/react-query";

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
      <div className="px-4 py-20 flex flex-col gap-20">
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
              className="flex gap-4 bg-slate-800 rounded-xl py-5 px-3"
            >
              <div className="w-32 flex flex-col items-center">
                {avatar_path && (
                  <div className="w-16 h-16">
                    <img
                      src={originalPhoto}
                      alt={author}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                )}
                <p className="break-all">{author}</p>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {rating && <p>{rating}/10</p>}
                <p>{content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Reviews;
