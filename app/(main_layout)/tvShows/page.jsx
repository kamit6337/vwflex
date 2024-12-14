import HorizontalSection from "@components/HorizontalSection";
import queryList from "@graphql/query/queryList";
import React from "react";

const zIndex = 499;
const TV = "tv";

const TvShowsPage = () => {
  return (
    <>
      {queryList
        .filter((query) => query.media === TV)
        .map((query, i) => {
          const { id, schema, dataQuery, media, name } = query;

          return (
            <HorizontalSection
              key={id}
              id={id}
              schema={schema}
              dataQuery={dataQuery}
              name={name}
              media={media}
              instant={true}
              zIndex={zIndex - i * 2}
            />
          );
        })}
    </>
  );
};

export default TvShowsPage;
