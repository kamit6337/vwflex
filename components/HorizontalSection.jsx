import HorizontalList from "@components/HorizontalList";
import getFixedData from "@graphql/fixed/query";
import cachedQuery from "@graphql/query/cachedQuery";
import PeoplesHorizontalList from "./PeoplesHorizontalList";
import { MOVIE, PERSON, TV } from "@constants/mediaType";

const HorizontalSection = async ({
  id,
  schema,
  dataQuery,
  name,
  media,
  instant = false,
  zIndex,
  trending = false,
  pagination,
}) => {
  const { data: fixed, error } = await getFixedData();

  if (error) {
    throw new Error(error.message);
  }

  let query = null;

  if (instant) {
    query = await cachedQuery(schema, dataQuery, { page: 1 });
  }

  // if (trending && (media === MOVIE || media === TV)) {
  //   return (
  //     <HorizontalList
  //       id={id}
  //       schema={schema}
  //       dataQuery={dataQuery}
  //       name={name}
  //       initialData={query}
  //       media={media}
  //       trending={trending}
  //       zIndex={zIndex}
  //     />
  //   );
  // }

  // if (trending && media === PERSON) {
  //   return (
  //     <PeoplesHorizontalList
  //       id={id}
  //       schema={schema}
  //       dataQuery={dataQuery}
  //       name={name}
  //       initialData={query}
  //       media={media}
  //       trending={trending}
  //       zIndex={zIndex}
  //     />
  //   );
  // }

  if (media === PERSON) {
    return (
      <HorizontalList
        id={id}
        schema={schema}
        dataQuery={dataQuery}
        name={name}
        initialData={query.data}
        media={media}
        trending={trending}
        zIndex={zIndex}
        fixed={fixed}
        pagination={pagination}
        people={true}
      />
    );
  }

  if (media === MOVIE || media === TV) {
    return (
      <HorizontalList
        id={id}
        schema={schema}
        dataQuery={dataQuery}
        name={name}
        initialData={query.data}
        media={media}
        trending={trending}
        zIndex={zIndex}
        fixed={fixed}
        pagination={pagination}
      />
    );
  }
};

export default HorizontalSection;
