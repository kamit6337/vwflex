/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Loading from "@containers/Loading";
import { useSelector } from "react-redux";
import { fixedState } from "@redux/slice/fixedSlice";
import fetchTvShowAdditional from "@api/query/tv/fetchTvShowAdditional";
import makeTimeFromUTC from "@utils/javascript/makeTimeFromUTC";
import ExpandableText from "@lib/ExpandableText";
import Toastify from "@lib/Toastify";

const Reviews = ({ id }) => {
  const { imageDetail } = useSelector(fixedState);
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { ToastContainer, showErrorMessage } = Toastify();

  useEffect(() => {
    if (!id) return;

    const fetchMovieReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetchTvShowAdditional(id, { reviews: true });

        setTotalPages(response.totalPages);
        setCurrentPage(response.page);
        setList(response.data);
        setIsLoading(false);
      } catch (error) {
        showErrorMessage({ message: error.message });
      }
    };
    fetchMovieReviews();
  }, [id, showErrorMessage]);

  if (isLoading) {
    return (
      <div className="w-full h-96">
        <Loading />
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, we do not have reviews</p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 py-20 flex flex-col gap-10">
        {list.map((obj, i) => {
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
                <p className="mt-2">{author}</p>
                <p className="text-xs mt-5">{makeTimeFromUTC(updated_at)}</p>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {rating && <p>{rating}/10</p>}
                <div>
                  <ExpandableText text={content} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );
};

export default Reviews;
