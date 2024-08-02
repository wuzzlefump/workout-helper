"use client";
import React from "react";
import { TWorkoutHydrated } from "../../../../typings";
import { PlayCircleIcon, ForwardIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { createUrlWithSearchParams } from "./utils";

interface Props {
  currentWorkout: TWorkoutHydrated;
}

function StartScreen({ currentWorkout }: Props) {
  let router = useRouter();

  let startWorkout = (workout: TWorkoutHydrated, auto?: boolean) => {
    if (
      workout.workoutSections[0] &&
      workout.workoutSections[0]?.exerciseInstances[0]
    ) {
      let body: {
        baseUrl: string;
        sectionIndex: number;
        instanceIndex: number;
        isAuto?: boolean;
      } = {
        baseUrl: `/workout/${workout._id}`,
        sectionIndex: 0,
        instanceIndex: 0,
      };
      if (auto) {
        body.isAuto = true;
      }
      let baseUrl = createUrlWithSearchParams({ ...body });
      router.push(baseUrl);
    } else {
      return;
    }
  };

  return (
    <div>
      <div className=" justify-center min-h-[80px] h-[10vh] border-b border-black flex w-[100%] md:justify-start align-bottom pt-5 pl-5">
        {/* header */}
        <h1 className=" font-extrabold text-lg md:text-3xl text-ellipsis">
          {currentWorkout?.title ?? "--"}
        </h1>
      </div>
      <div className=" min-h-[500px] h-[85vh] grid align-middle justify-center py-10">
        {/* body */}
        <div>
          <div
            onClick={() => startWorkout(currentWorkout, false)}
            className="p-5 hover:opacity-15 cursor-pointer"
          >
            <PlayCircleIcon className="h-36" />
          </div>
        </div>
        <div className="p-5">
          <h2
            className="
		 font-bold pl-12 text-2xl 
		  "
          >
            or
          </h2>
        </div>
        <div>
          <div
            onClick={() => startWorkout(currentWorkout, true)}
            className="p-5 hover:opacity-15 cursor-pointer"
          >
            <ForwardIcon className="h-36" />
          </div>
        </div>
      </div>
      <div>{/* footer */}</div>
    </div>
  );
}

export default StartScreen;
