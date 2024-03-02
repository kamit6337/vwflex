/* eslint-disable @next/next/no-img-element */
import fetchMovieAdditional from "@api/query/movie/fetchMovieAdditional";
import { useEffect, useState } from "react";
import Loading from "@containers/Loading";
import { useSelector } from "react-redux";
import { fixedState } from "@redux/slice/fixedSlice";

const Reviews = ({ id }) => {
  const { imageDetail } = useSelector(fixedState);
  const [list, setList] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovieReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetchMovieAdditional(id, { reviews: true });

        setTotalPages(response.totalPages);
        setCurrentPage(response.page);
        setList(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieReviews();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full h-96">
        <Loading />
      </div>
    );
  }

  if (!list || list.length === 0) {
    return <div>Sorry, we do not have movie reviews</div>;
  }

  return (
    <div className="px-4 py-20 flex flex-col gap-20">
      {list.map((obj, i) => {
        const {
          author,
          content,
          author_details: { avatar_path, name, rating, username },
          updated_at,
        } = obj;

        const size = imageDetail.backdrop_sizes[0];
        const orginalSize = imageDetail.backdrop_sizes.at(-1);
        const originalPhoto = `${imageDetail.secure_base_url}${orginalSize}${avatar_path}`;

        return (
          <div key={i} className="flex gap-4">
            <div className="w-32">
              <div className="w-10">
                <img
                  src={avatar_path}
                  alt={author}
                  className="w-full rounded-full object-cover"
                />
              </div>
              <p>{author}</p>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {rating && <p>{rating}/10</p>}
              <p>{content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
