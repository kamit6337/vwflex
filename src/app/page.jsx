import initialFetch from "@api/query/initialFetch";
import queryList from "@api/query/queryList";
import PopularMovie from "@components/PopularMovie";
import TopRatedMovies from "@components/MoviesSection";
import UpcomingMovie from "@components/UpcomingMovie";
import MoviesHorizontalList from "@components/moviesHorizontalList/MoviesHorizontalList";
import Link from "next/link";
import MoviesSection from "@components/MoviesSection";
import ScrollToTop from "@components/ScrollToTop";

const zIndex = 499;

export default async function Home() {
  await initialFetch();

  return (
    <>
      {queryList.map((query, i) => {
        const { id, promise, type, instant, title } = query;

        return (
          <MoviesSection
            key={id}
            id={id}
            title={title}
            promise={promise}
            instant={instant}
            zIndex={zIndex - i * 2}
          />
        );
      })}
    </>
  );
}
