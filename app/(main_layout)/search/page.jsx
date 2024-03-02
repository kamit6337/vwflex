import searchQuery from "@api/query/search/searchQuery";
import HorizontalList from "@components/HorizontalList";
import PeoplesHorizontalList from "@components/PeoplesHorizontalList";

const MOVIE = "movie";
const TV = "tv";

const SearchPage = async ({ searchParams: { q } }) => {
  const searchResults = await searchQuery(q);

  if (!searchResults) return;

  const { page, totalPages, movies, tv, peoples } = searchResults;

  const moviesData = {
    data: movies,
  };

  const tvData = {
    data: tv,
  };
  const peoplesData = {
    data: peoples,
  };

  return (
    <>
      <p className="text-2xl font-semibold tracking-wide">
        Search results of {`"${q}"`}
      </p>
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
