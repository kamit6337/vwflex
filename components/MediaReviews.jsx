import ExpandableText from "@lib/ExpandableText";

const MediaReviews = ({ reviews, fixed }) => {
  const { imageDetail } = fixed;

  return (
    <div className="px-4 py-20 flex flex-col gap-20">
      {reviews.map((review, i) => {
        const {
          author,
          content,
          author_details: { avatar_path, name, rating, username },
          updated_at,
        } = review;

        const originalPhoto = `${imageDetail.secure_base_url}original${avatar_path}`;

        return (
          <div key={i} className="flex gap-4 bg-slate-800 rounded-xl py-5 px-3">
            <div className="w-32 flex flex-col items-center ">
              {avatar_path && (
                <div className="size-16">
                  <img
                    src={originalPhoto}
                    alt={author}
                    className="w-full h-full rounded-full"
                  />
                </div>
              )}
              <p className="mt-2 break-all">{author}</p>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {rating && <p>{rating}/10</p>}
              <div className="tablet:text-xs sm_lap:text-sm leading-6 tracking-wide">
                <ExpandableText text={content} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MediaReviews;
