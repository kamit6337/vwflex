"use client";

const useFetchFixed = () => {
  const obj = useQuery({
    queryKey: ["fixed"],
    queryFn: async () => {
      const res = await fetch("/api/fixed");
      return res.json();
    },
  });

  return { ...obj };
};

export default useFetchFixed;
