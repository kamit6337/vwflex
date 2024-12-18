import IndianTypeDate from "@utils/javascript/IndianTypeDate";
import cachedQuery from "@graphql/query/cachedQuery";
import personDetailSchema, {
  getPersonDetailDataQuery,
} from "@graphql/peoples/personDetailSchema";
import getFixedData from "@graphql/fixed/query";
import ExpandableText from "@lib/ExpandableText";
import { getPersonTvCreditsDataQuery } from "@graphql/peoples/personTvSchema";
import Additional from "./Additional";
import personMovieSchema, {
  getPersonMovieCreditsDataQuery,
} from "@graphql/peoples/personMovieSchema";
import personTvSchema from "@graphql/peoples/personTvSchema";

export const generateMetadata = async ({ searchParams: { id } }) => {
  const { data } = await cachedQuery(
    personDetailSchema,
    getPersonDetailDataQuery,
    {
      id,
    }
  );

  return {
    title: data?.name,
    description: data?.biography,
  };
};

const PersonDetailPage = async ({ searchParams: { id } }) => {
  const { data: fixed } = await getFixedData();

  const { data: personDetails, error: personDetailError } = await cachedQuery(
    personDetailSchema,
    getPersonDetailDataQuery,
    {
      id,
    }
  );

  const { data: personMovieCredits, error: personMovieCreditsError } =
    await cachedQuery(personMovieSchema, getPersonMovieCreditsDataQuery, {
      id,
    });

  const { data: personTvCredits, error: personTvCreditsError } =
    await cachedQuery(personTvSchema, getPersonTvCreditsDataQuery, {
      id,
    });

  if (personDetailError || personMovieCreditsError || personTvCreditsError) {
    throw new Error(
      personDetailError?.message ||
        personMovieCreditsError?.message ||
        personTvCreditsError?.message
    );
  }

  const {
    biography,
    birthday,
    deathday,
    known_for_department,
    name,
    place_of_birth,
    profile_path,
  } = personDetails;

  const { imageDetail } = fixed;

  const createPhoto = `${imageDetail.secure_base_url}original${profile_path}`;

  return (
    <section>
      <div className="flex gap-5 w-full p-16 sm_lap:px-8 tablet:px-2">
        <div className="w-1/4">
          <img
            src={createPhoto}
            alt={name}
            className="w-full-full rounded-xl object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-3xl tracking-wide font-semibold">{name}</p>
          <p>{place_of_birth}</p>
          <div className="flex items-center gap-4">
            <p>Birth : {IndianTypeDate(birthday)}</p>
            {deathday && <p>Death : {IndianTypeDate(deathday)}</p>}
          </div>
          <div className="tracking-wide">
            <ExpandableText text={biography} maxWords={200} />
          </div>
        </div>
      </div>
      <Additional
        fixed={fixed}
        movies={personMovieCredits}
        tv={personTvCredits}
        id={id}
      />
    </section>
  );
};

export default PersonDetailPage;
