"use client";

import { Icons } from "@assets/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Search = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset, setFocus } = useForm({
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    if (openSearch) {
      setFocus("search");
    }
  }, [setFocus, openSearch]);

  const onSubmit = (data) => {
    resetSearch();
    setOpenSearch(false);

    router.push(`/search?q=${data.search}`);
  };

  const resetSearch = () => {
    reset({ search: "" });
    setFocus("search");
  };
  return (
    <>
      <p
        className="h-full p-3 cursor-pointer"
        onClick={() => setOpenSearch((prev) => !prev)}
      >
        {openSearch ? (
          <Icons.cancel className="h-full text-2xl text-gray-400" />
        ) : (
          <Icons.search className="h-full text-2xl text-gray-400" />
        )}
      </p>

      {openSearch && (
        <div className="absolute left-0 z-50 top-full w-full h-16 bg-slate-800 border border-white rounded-xl mt-2 flex items-center gap-4 px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
            <input
              {...register("search")}
              type="text"
              className="bg-inherit w-full h-full p-2 outline-none"
            />
          </form>
          <p onClick={resetSearch} className="cursor-pointer">
            Clear
          </p>
        </div>
      )}
    </>
  );
};

export default Search;
