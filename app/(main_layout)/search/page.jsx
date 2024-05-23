import searchQuery from "@api/query/search/searchQuery";
import HorizontalList from "@components/HorizontalList";
import PeoplesHorizontalList from "@components/PeoplesHorizontalList";
import { QueryClient } from "@tanstack/react-query";

const MOVIE = "movie";
const TV = "tv";

const queryClient = new QueryClient();

export const generateMetadata = async ({ searchParams: { q } }) => {
  return {
    title: q,
    description: `Searching for keyword ${q}`,
  };
};

const SearchPage = async ({ searchParams: { q } }) => {
  const searchResults = await queryClient.fetchQuery({
    queryKey: ["Search", q],
    queryFn: async () => {
      return await searchQuery(q);
    },
    staleTime: Infinity,
  });

  if (!searchResults) {
    throw new Error("Issue in finding the result");
  }

  const { page, totalPages, movies, tv, peoples } = searchResults;

  const filterMovies = movies.filter((obj) => obj.backdrop_path);
  const filterTv = tv.filter((obj) => obj.backdrop_path);
  const filterPeoples = peoples.filter((obj) => obj.profile_path);

  const moviesData = {
    data: filterMovies,
  };

  const tvData = {
    data: filterTv,
  };
  const peoplesData = {
    data: filterPeoples,
  };

  return (
    <>
      <div className="p-10 tablet:p-5">
        <p className="text-2xl font-semibold tracking-wide border-b w-max tablet:text-xl">
          Search results of {`"${q}"`}
        </p>
      </div>
      {movies?.length === 0 && tv?.length === 0 && peoples?.length === 0 && (
        <div className="w-full h-96 flex justify-center items-center">
          <p>No search results found</p>
        </div>
      )}

      {moviesData.data?.length > 0 && (
        <HorizontalList
          data={moviesData}
          type={MOVIE}
          title={"Searched Movies"}
          zIndex={9}
        />
      )}

      {tvData.data?.length > 0 && (
        <HorizontalList
          data={tvData}
          type={TV}
          title={"Searched TV Shows"}
          zIndex={7}
        />
      )}

      {peoplesData.data?.length > 0 && (
        <PeoplesHorizontalList
          data={peoplesData}
          title={"Searched Peoples"}
          zIndex={5}
        />
      )}
    </>
  );
};

export default SearchPage;
