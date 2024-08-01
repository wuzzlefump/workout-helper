import React from "react";
import { sanityFetch } from "../../../sanity/lib/client";
import { exerciseS_QUERY } from "../../../sanity/lib/queries";
import { Texercise } from "../../../typings";
import Link from "next/link";
import Image from "next/image";

interface Props {}

async function Page(props: Props) {
  const initial = await sanityFetch<any[]>({ query: exerciseS_QUERY });

  let exercises = initial as Texercise[];
  return (
    <main className="flex flex-col min-h-screen px-2  pt-20 ">
      <h1
        className="
      font-semibold text-xl 
      "
      >
        Exercise Glossary
      </h1>
      <div
        className="
      border border-solid border-gray-200 rounded-md
      p-3 min-h-[60vh]
      flex flex-col"
      >
        {exercises.map((x, key) => {
          return (
            <Link
              href={`/glossary/${x._id}`}
              className="w-[100%] p-3 cursor-pointer hover:bg-slate-100 max-h-[60px]"
              key={key}
            >
              <div className="flex justify-between">
                {x.name}
                {x?.primaryImage && (
                  <Image
                    src={x?.primaryImage?.asset?.url}
                    height={30}
                    width={30}
                    alt={x.primaryImage.alt ?? "--"}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export default Page;
