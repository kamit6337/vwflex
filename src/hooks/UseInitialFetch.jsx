import GetReq from "@utils/client/GetReq";

const UseInitialFetch = async () => {
  const promises = [
    GetReq("/fixed"),
    GetReq(
      "/movies",
      { all: true },
      {
        revalidateIn: 300,
        tagName: "allMovies",
        cache: false,
      }
    ),
  ];

  await Promise.all(promises);

  return;
};

export default UseInitialFetch;
