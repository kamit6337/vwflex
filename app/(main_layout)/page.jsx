import HorizontalSection from "@components/HorizontalSection";
import queryList from "@graphql/query/queryList";

const zIndex = 25;

export default async function Home() {
  return (
    <>
      {queryList.map((query, i) => {
        const { id, schema, dataQuery, media, name, instant, pagination } =
          query;

        return (
          <HorizontalSection
            key={id}
            id={id}
            schema={schema}
            dataQuery={dataQuery}
            name={name}
            media={media}
            instant={true}
            zIndex={zIndex - i}
            pagination={pagination}
          />
        );
      })}
    </>
  );
}
