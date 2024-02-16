import { fixed } from "@api/query/initialFetch";
import queryList from "@api/query/queryList";
import MoviesGridList from "@app/movies/[id]/MoviesGridList";

const MoviesGrid = async ({ params: { id } }) => {
  const fixedQuery = await fixed();

  const query = queryList.find((query) => query.id === Number(id));

  const fetchQuery = await query.promise();

  return (
    <MoviesGridList
      data={fetchQuery}
      title={query.title}
      fixed={fixedQuery}
      promise={query.promise}
    />
  );
};

export default MoviesGrid;
