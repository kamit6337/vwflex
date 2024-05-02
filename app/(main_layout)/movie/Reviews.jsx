/* eslint-disable @next/next/no-img-element */
import fetchMovieAdditional from "@api/query/movie/fetchMovieAdditional";
import { useEffect, useState } from "react";
import Loading from "@containers/Loading";
import { useSelector } from "react-redux";
import { fixedState } from "@redux/slice/fixedSlice";
import Toastify from "@lib/Toastify";

const Reviews = ({ id }) => {
  const { imageDetail } = useSelector(fixedState);
  const [list, setList] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { ToastContainer, showErrorMessage } = Toastify();

  useEffect(() => {
    if (!id) return;

    const fetchMovieReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMovieAdditional(id, { reviews: true });
        console.log("response", response);
        setTotalPages(response.totalPages);
        setCurrentPage(response.page);
        setList(response.data);
      } catch (error) {
        showErrorMessage({ message: error.message });
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieReviews();
  }, [id]);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-96">
  //       <Loading />
  //     </div>
  //   );
  // }

  if (!list || list.length === 0) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p>Sorry, we do not have reviews</p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 py-20 flex flex-col gap-20">
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
      <ToastContainer />
    </>
  );
};

export default Reviews;
