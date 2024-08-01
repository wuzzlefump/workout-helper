import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/client";
import { WORKOUTS_QUERY } from "../../sanity/lib/queries";
import { TWorkout } from "../../typings";
import Link from "next/link";

export default async function Home() {
  const initial = await sanityFetch<any[]>({ query: WORKOUTS_QUERY });

  let workouts = initial as TWorkout[];

  return (
    <main className="flex flex-col min-h-screen px-2  pt-20 ">
      <h1
        className="
      font-semibold text-xl 
      "
      >
        Workouts
      </h1>
      <div
        className="
      border border-solid border-gray-200 rounded-md
      p-3 min-h-[60vh]
      flex flex-col"
      >
        {workouts.map((x, key) => {
          return (
            <Link
              href={`/workout/${x._id}`}
              className="w-[100%] p-3 cursor-pointer hover:bg-slate-100 max-h-[60px]"
              key={key}
            >
              {x.title}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
