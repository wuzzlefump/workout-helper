import React from "react";
import {
  exerciseS_QUERY,
  exercise_QUERY,
} from "../../../../sanity/lib/queries";
import { QueryParams, SanityDocument } from "next-sanity";
import { client, sanityFetch } from "../../../../sanity/lib/client";
import Image from "next/image";
import { Texercise } from "../../../../typings";
import RichText from "@/components/RichText";

interface Props {}

export async function generateStaticParams() {
  const exercises = await client.fetch<SanityDocument[]>(exerciseS_QUERY);

  return exercises.map((ex) => ({
    _id: ex._id,
  }));
}

async function Page({ params }: { params: QueryParams }) {
  const initial = await sanityFetch<SanityDocument>({
    query: exercise_QUERY,
    params: params,
  });
  let exercise = initial as Texercise;

  console.log({ exercise });

  return (
    <div className="w-[100%] px-10 grid justify-center">
      <div className=" py-8 flex justify-center w-[100%]">
        <Image
          height={200}
          width={200}
          src={exercise.primaryImage.asset.url}
          alt={exercise?.primaryImage?.alt ?? "--"}
        />
      </div>
      <div className="max-w-[600px]">
        <RichText exercise={exercise} />
      </div>
    </div>
  );
}

export default Page;
