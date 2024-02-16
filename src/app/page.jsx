import initialFetch from "@api/query/initialFetch";
import queryList from "@api/query/queryList";
import HorizontalSection from "@components/HorizontalSection";

const zIndex = 499;

export default async function Home() {
  await initialFetch();

  return (
    <>
      {queryList.map((query, i) => {
        const { id, promise, type, instant, title } = query;

        return (
          <HorizontalSection
            key={id}
            id={id}
            title={title}
            type={type}
            promise={promise}
            instant={instant}
            zIndex={zIndex - i * 2}
          />
        );
      })}
    </>
  );
}
