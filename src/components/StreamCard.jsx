import GetReq from "@utils/client/GetReq";
import Image from "next/image";

const StreamCard = async ({ obj }) => {
  const { imageUrl } = await GetReq("/fixed");

  const {
    poster_path,
    backdrop_path,
    id,
    title,
    genre_ids,
    overwiew,
    release_date,
    vote_average,
  } = obj;

  const imageSrc = `${imageUrl}${backdrop_path}`;

  return (
    <main className="grow-0 shrink-0 basis-1/4 text-xl font-semibold text-white px-2">
      <div className="bg-slate-700 rounded-3xl">
        <div className="w-full rounded-3xl">
          <img
            src={imageSrc}
            alt="profile"
            className="w-full object-cover rounded-3xl"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
};

export default StreamCard;
