"use client";
import { Icons } from "@assets/icons";
import debounce from "@utils/javascript/debounce";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import PersonCard from "./PersonCard";

const PeoplesHorizontalList = ({
  id,
  schema,
  dataQuery,
  name = null,
  initialData = null,
  media,
  trending = false,
  zIndex = 10,
  fixed,
}) => {
  const [numberOfProfile, setNumberOfProfile] = useState(6);
  const [index, setIndex] = useState(0);
  const [peoplesData, setPeoplesData] = useState(() => {
    return initialData?.filter((person) => person.profile_path);
  });
  const [leftArrowInLarge, setLeftArrowInLarge] = useState(false);
  const [rightArrowInLarge, setRightArrowInLarge] = useState(false);
  const [personIndex, setPersonIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [startFetching, setStartFetching] = useState(false);
  const [selectTime, setSelectTime] = useState("");

  const { ref: findalDivRef, inView: finalDivInView } = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px 0px 0px",
  });

  // const { isLoading: isLoadingInitialQuery, data: query } = useQuery({
  //   queryKey: [title, id],
  //   queryFn: () => promise(),
  //   staleTime: Infinity,
  //   enabled: !!promise && !instant && inView,
  // });

  // useEffect(() => {
  //   if (query) {
  //     const filter = query.data.filter((media) => media.profile_path);
  //     setPeoplesData(filter);
  //     setTotalpages(query.totalPages);
  //   }
  // }, [query]);

  // useEffect(() => {
  //   if (id) {
  //     const filter = data.data.filter((media) => media.profile_path);
  //     setPeoplesData(filter);
  //     setTotalpages(data.totalPages);
  //   }
  // }, [id, data]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 680) {
  //       setNumberOfProfile(4);
  //     } else if (window.innerWidth <= 900) {
  //       setNumberOfProfile(5);
  //     } else {
  //       setNumberOfProfile(6);
  //     }
  //   };

  //   // Initial call to handleResize
  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   const fetchQuery = async () => {
  //     const currentPage = page + 1;

  //     if (currentPage <= totalPages) {
  //       setIsLoading(true);

  //       const query = await promise(currentPage);
  //       const filter = query.data.filter((person) => person.profile_path);
  //       setPeoplesData((prev) => [...prev, ...filter]);
  //       setPage((prev) => prev + 1);
  //     }

  //     setStartFetching(false);
  //     setIsLoading(false);
  //   };

  //   if (startFetching && !isLoading) {
  //     fetchQuery();
  //   }
  // }, [startFetching, isLoading, page, promise, totalPages]);

  // const maxIndex = useMemo(() => {
  //   if (!peoplesData) return null;

  //   let maxIndexGoesTo;
  //   if (peoplesData.length % numberOfProfile === 0) {
  //     maxIndexGoesTo = -(peoplesData.length / numberOfProfile - 1);
  //   } else {
  //     const divide = peoplesData.length / numberOfProfile;

  //     maxIndexGoesTo = -Math.floor(divide);
  //   }

  //   return maxIndexGoesTo;
  // }, [peoplesData, numberOfProfile]);

  // useEffect(() => {
  //   if (index >= 0) {
  //     setLeftArrowInLarge(false);
  //   }

  //   if (index === maxIndex) {
  //     setRightArrowInLarge(false);
  //   }
  // }, [index, maxIndex]);

  const scrollLeft = () => {
    setIndex((prev) => prev + 1);
  };

  const scrollRight = () => {
    // // if you want  to fetch 2 page before, use maxIndexGoesTo + 2
    // if (index - 1 === maxIndex + 1) {
    //   if (promise) {
    //     setStartFetching(true);
    //   }
    // }
    setIndex((prev) => prev - 1);
  };

  const debouncedScrollLeft = debounce(scrollLeft, 600);
  const debouncedScrollRight = debounce(scrollRight, 1000);

  const handleSelectedTime = async (e) => {
    //   const { value } = e.target;
    //   setSelectTime(value);
    //   let fetchTrendingPeoples = await promise(value);
    //   fetchTrendingPeoples = fetchTrendingPeoples?.data.filter(
    //     (media) => media.profile_path
    //   );
    //   setPeoplesData(fetchTrendingPeoples);
  };

  // const handleMouseEnter = (i, id) => {
  //   setPersonIndex(i);
  // };

  // if (isLoadingInitialQuery) {
  //   return (
  //     <div className="w-full h-40 flex justify-center items-center">
  //       <div className="loading" />
  //     </div>
  //   );
  // }

  if (!peoplesData || peoplesData?.length === 0) {
    return <div className="">No data Present</div>;
  }

  return (
    <section
      className="flex flex-col gap-4 relative pt-5 pb-16"
      style={{ zIndex }}
    >
      {name && (
        <div className="flex justify-between items-center">
          <p className="ml-14 text-xl font-semibold tracking-wider tablet:ml-10 tablet:text-base">
            {name}
          </p>
          {trending && (
            <select
              // value={selectTime}
              // onChange={handleSelectedTime}
              className="mr-8 -mb-2 bg-inherit text-white border border-white"
            >
              <option value={""} className="bg-black text-white">
                Day
              </option>
              <option value={""} className="bg-black text-white">
                Week
              </option>
            </select>
          )}
        </div>
      )}

      <div className="relative">
        <div className="ml-10 tablet:ml-4 mr-5">
          <div
            className="flex transition-all duration-500"
            style={{ translate: `${100 * index}%` }}
          >
            {peoplesData.map((person, i) => {
              return (
                <PersonCard key={person.id} fixed={fixed} person={person} />
              );
            })}
            {isLoading && (
              <div className="grow-0 shrink-0 basis-96 flex justify-center items-center">
                <div className="loading" />
              </div>
            )}
            <div ref={findalDivRef} />
          </div>
        </div>

        {index < 0 && (
          <div
            className="absolute z-10 top-0 left-0 h-full w-10  cursor-pointer flex justify-center items-center"
            onClick={() => debouncedScrollLeft()}
            onMouseEnter={() => setLeftArrowInLarge(true)}
            onMouseLeave={() => setLeftArrowInLarge(false)}
          >
            <Icons.leftArrow
              className={`${
                leftArrowInLarge ? "text-4xl" : "text-xl"
              } text-white transition-all duration-500  `}
            />
          </div>
        )}

        {finalDivInView || (
          <div
            className="absolute z-10 top-0 right-0 h-full w-10  cursor-pointer flex justify-center items-center"
            onClick={() => debouncedScrollRight()}
            onMouseEnter={() => setRightArrowInLarge(true)}
            onMouseLeave={() => setRightArrowInLarge(false)}
          >
            <Icons.rightArrow
              className={`${
                rightArrowInLarge ? "text-4xl" : "text-xl"
              } text-white  transition-all duration-500 `}
            />
          </div>
        )}
      </div>

      <div className="ml-14 w-max h-10 ">
        {index <= -2 && (
          <p className="back_to_start" onClick={() => setIndex(0)}>
            Back to Start
          </p>
        )}
      </div>
    </section>
  );
};

export default PeoplesHorizontalList;
