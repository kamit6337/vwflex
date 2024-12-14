import HorizontalSection from "@components/HorizontalSection";
import queryList from "@graphql/query/queryList";
import React from "react";
import { MOVIE } from "@constants/mediaType";

const zIndex = 499;

const MoviesPage = () => {
  return (
    <>
      {queryList
        .filter((query) => query.media === MOVIE)
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

export default MoviesPage;
