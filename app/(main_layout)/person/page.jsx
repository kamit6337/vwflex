/* eslint-disable @next/next/no-img-element */
import { fixed } from "@api/query/initialFetch";
import fetchPersonDetails from "@api/query/peoples/fetchPersonDetails";
import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import Additional from "./Additional";

const PersonDetailPage = async ({ searchParams: { id } }) => {
  const fixedQuery = await fixed();

  const query = await fetchPersonDetails(Number(id));

  if (!query) return;

  const { details, images, credits } = query;

  const {
    biography,
    birthday,
    deathday,
    known_for_department,
    name,
    place_of_birth,
    profile_path,
  } = details;

  const size = fixedQuery.imageDetail.profile_sizes.at(-1);
  const createBaseUrl = `${fixedQuery.imageDetail.secure_base_url}${size}`;
  const createPhoto = `${createBaseUrl}${profile_path}`;

  return (
    <section>
      <div className="flex gap-5 w-full p-16 ">
        <div className="w-1/4">
          <img
            src={createPhoto}
            alt={name}
            className="w-full object-cover rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-3xl tracking-wide font-semibold">{name}</p>
          <p>{place_of_birth}</p>
          <div className="flex items-center gap-4">
            <p>Birth : {IndianTypeDate(birthday)}</p>
            {deathday && <p>Death : {IndianTypeDate(deathday)}</p>}
          </div>
          <p className="tracking-wide ">{biography}</p>
        </div>
      </div>
      <Additional images={images} credits={credits} fixed={fixedQuery} />
    </section>
  );
};

export default PersonDetailPage;
