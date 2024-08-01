import { QueryParams, SanityDocument } from "next-sanity";
import React from "react";
import { WORKOUT_QUERY, WORKOUTS_QUERY } from "../../../../sanity/lib/queries";
import { client, sanityFetch } from "../../../../sanity/lib/client";
import { TWorkoutHydrated } from "../../../../typings";
import WorkoutTree from "./WorkoutTree";
import StartScreen from "./StartScreen";
import IntervalScreen from "./IntervalScreen";
import RepetitionScreen from "./RepetitionScreen";
import FinishedScreen from "./FinishedScreen";

export async function generateStaticParams() {
  const workouts = await client.fetch<SanityDocument[]>(WORKOUTS_QUERY);

  return workouts.map((wo) => ({
    _id: wo._id,
  }));
}

async function Page({
  params,
  searchParams,
}: {
  params: QueryParams;
  searchParams: {
    si?: string | null;
    in?: string | null;
    auto?: string | null;
    fin?: string | null;
  };
}) {
  let sectionIndex =
    searchParams?.si === "0"
      ? 0
      : searchParams?.si
        ? parseInt(searchParams?.si)
        : undefined;
  let instanceIndex =
    searchParams?.in === "0"
      ? 0
      : searchParams?.in
        ? parseInt(searchParams.in)
        : undefined;
  let isComplete = searchParams?.fin ? searchParams.fin : undefined;
  let IsAutoPlaying = searchParams?.auto ? searchParams.auto : undefined;

  const initialWorkout = await sanityFetch<SanityDocument>({
    query: WORKOUT_QUERY,
    params: params,
  });
  let workout = initialWorkout[0] as TWorkoutHydrated;

  let currentSection =
    (sectionIndex || sectionIndex === 0) &&
    workout?.workoutSections[sectionIndex]
      ? workout.workoutSections[sectionIndex]
      : undefined;

  let currentInstance =
    (instanceIndex || instanceIndex === 0) &&
    currentSection?.exerciseInstances &&
    currentSection?.exerciseInstances[instanceIndex]
      ? currentSection?.exerciseInstances[instanceIndex]
      : undefined;
  return (
    <div
      className=" w-[100%] grid grid-cols-8 h-[95vh] overflow-y-auto
	"
    >
      <div
        className=" overflow-y-auto
	 hidden sm:grid col-span-2 lg:col-span-1 bg-blue-100
	 h-[95vh]
	  "
      >
        <WorkoutTree
          key={`${workout?._id}_${instanceIndex ?? "--"}_${sectionIndex ?? "--"}`}
          workout={workout}
        />
      </div>
      <div
        className="
	  h-[95vh]
	  col-span-8  sm:col-span-6 lg:col-span-7 overflow-y-auto"
      >
        {!currentInstance && !isComplete ? (
          <StartScreen currentWorkout={workout} />
        ) : currentInstance &&
          !isComplete &&
          currentInstance?.type === "INTERVAL" ? (
          <IntervalScreen
            currentWorkout={workout}
            currentInstance={currentInstance}
            instanceIndex={instanceIndex!}
            sectionIndex={sectionIndex!}
            isAuto={IsAutoPlaying ? true : false}
          />
        ) : currentInstance &&
          !isComplete &&
          currentInstance?.type === "REPETITIONS" ? (
          <RepetitionScreen
            currentWorkout={workout}
            currentInstance={currentInstance}
            instanceIndex={instanceIndex!}
            sectionIndex={sectionIndex!}
            isAuto={IsAutoPlaying ? true : false}
          />
        ) : isComplete ? (
          <FinishedScreen currentWorkout={workout} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Page;
