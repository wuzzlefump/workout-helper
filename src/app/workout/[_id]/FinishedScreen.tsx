import React from "react";
import { TWorkoutHydrated } from "../../../../typings";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  currentWorkout: TWorkoutHydrated;
}

function FinishedScreen({ currentWorkout }: Props) {
  return (
    <div>
      <div className=" justify-center min-h-[80px] h-[10vh] border-b border-black flex w-[100%] md:justify-start align-bottom pt-5 pl-5">
        {/* header */}
        <h1 className=" font-extrabold text-3xl ">
          {`${currentWorkout?.title ?? "--"} `}
        </h1>
      </div>
      <div className="min-h-[500px]  h-[85vh] flex flex-col align-middle justify-center py-10 text-center font-semibold">
        {/* body */}
        <CheckCircleIcon className="text-green-500 h-80" />
        Workout Complete!
      </div>
      <div>{/* footer */}</div>
    </div>
  );
}

export default FinishedScreen;
