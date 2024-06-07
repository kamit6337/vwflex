import queryList from "@api/query/queryList";
import HorizontalSection from "@components/HorizontalSection";

const zIndex = 499;
const TV = "tv";

export const metadata = () => {
  return {
    title: "TV Shows",
    description: "Show all tv shows related category",
  };
};

const TvShowsPage = () => {
  return (
    <>
      {queryList.map((query, i) => {
        const { id, promise, type, instant, title, trending } = query;

        if (type !== TV) return;

        return (
          <HorizontalSection
            key={id}
            id={id}
            title={title}
            type={type}
            trending={trending}
            promise={promise}
            instant={instant}
            zIndex={zIndex - i * 2}
          />
        );
      })}
    </>
  );
};

export default TvShowsPage;
