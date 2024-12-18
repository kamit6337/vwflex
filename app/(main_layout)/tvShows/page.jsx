import HorizontalSection from "@components/HorizontalSection";
import queryList from "@graphql/query/queryList";
import React from "react";
import { TV } from "@constants/mediaType";

const zIndex = 25;

const TvShowsPage = () => {
  return (
    <>
      {queryList
        .filter((query) => query.media === TV)
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

export default TvShowsPage;
