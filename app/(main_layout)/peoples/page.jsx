import HorizontalSection from "@components/HorizontalSection";
import queryList from "@graphql/query/queryList";
import { PERSON } from "@constants/mediaType";

const zIndex = 25;

export const metadata = () => {
  return {
    title: "Peoples",
    description: "Show all peoples related category",
  };
};

const PeoplesPage = () => {
  return (
    <>
      {queryList
        .filter((query) => query.media === PERSON)
        .map((query, i) => {
          const {
            id,
            schema,
            dataQuery,
            media,
            name,
            instant,
            pagination,
            trending,
          } = query;

          return (
            <HorizontalSection
              key={id}
              id={id}
              schema={schema}
              dataQuery={dataQuery}
              name={name}
              media={media}
              instant={instant}
              zIndex={zIndex - i}
              pagination={pagination}
              trending={trending}
            />
          );
        })}
    </>
  );
};

export default PeoplesPage;
