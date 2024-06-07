import queryList from "@api/query/queryList";
import HorizontalSection from "@components/HorizontalSection";

const zIndex = 499;
const PERSON = "person";

export const metadata = () => {
  return {
    title: "Peoples",
    description: "Show all peoples related category",
  };
};

const PeoplesPage = () => {
  return (
    <>
      {queryList.map((query, i) => {
        const { id, promise, type, instant, title, trending } = query;

        if (type !== PERSON) return;

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

export default PeoplesPage;
