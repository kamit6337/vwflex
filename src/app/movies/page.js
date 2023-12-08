import GetReq from "@utils/client/GetReq";
import Link from "next/link";
import { Suspense } from "react";

const Movies = async () => {
  const data = await GetReq("/fixed");

  return (
    <div className="flex flex-col gap-10">
      <div>Movies</div>
      <div>
        <Suspense fallback={<p className="text-3xl">Loading........</p>}>
          {JSON.stringify(data)}
        </Suspense>
      </div>
      <Link href={`/`}>Back to Home Page</Link>
    </div>
  );
};

export default Movies;
