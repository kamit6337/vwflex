import queryList from "@api/query/queryList";
import HorizontalSection from "@components/HorizontalSection";

const zIndex = 499;

export default async function Home() {
  return (
    <>
      {queryList.map((query, i) => {
        const { id, promise, type, instant, title, trending } = query;

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
}
