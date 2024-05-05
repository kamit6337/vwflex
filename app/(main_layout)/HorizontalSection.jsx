import { QueryClient } from "@tanstack/react-query";
import PeoplesHorizontalList from "../../components/PeoplesHorizontalList";
import HorizontalList from "@components/HorizontalList";

const MOVIE = "movie";
const TV = "tv";
const PERSON = "person";

const queryClient = new QueryClient();

const HorizontalSection = async ({
  id,
  title,
  promise,
  zIndex,
  trending,
  type,
  instant = false,
}) => {
  let query;
  if (instant) {
    query = await queryClient.fetchQuery({
      queryKey: [title, id],
      queryFn: () => promise(),
    });
  }

  if (trending && (type === MOVIE || type === TV)) {
    return (
      <HorizontalList
        id={id}
        type={type}
        title={title}
        data={query}
        trending={true}
        instant={instant}
        promise={promise}
        zIndex={zIndex}
      />
    );
  }

  if (trending && type === PERSON) {
    return (
      <PeoplesHorizontalList
        id={id}
        title={title}
        data={query}
        instant={instant}
        promise={promise}
        zIndex={zIndex}
        trending={true}
      />
    );
  }

  if (type === PERSON) {
    return (
      <PeoplesHorizontalList
        id={id}
        title={title}
        data={query}
        instant={instant}
        promise={promise}
        zIndex={zIndex}
      />
    );
  }

  if (type === MOVIE || type === TV) {
    return (
      <HorizontalList
        id={id}
        type={type}
        title={title}
        data={query}
        instant={instant}
        promise={promise}
        zIndex={zIndex}
      />
    );
  }
};

export default HorizontalSection;
