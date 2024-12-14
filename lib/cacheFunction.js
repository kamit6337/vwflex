import { unstable_cache } from "next/cache";

const cacheFunction = (func, { revalidate = false } = {}) => {
  return unstable_cache(
    async (...args) => {
      return await func(...args);
    },
    (args) => args.join("-"),
    { revalidate }
  );
};

export default cacheFunction;
