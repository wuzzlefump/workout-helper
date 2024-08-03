"use client";
import React from "react";
import {
  Texercise,
  TexerciseInstanceHydrated,
  TWorkoutHydrated,
} from "../../../../typings";
import { createUrlWithSearchParams } from "./utils";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { MyDialog } from "@/components/Dialog";
import RichText from "@/components/RichText";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Props {
  currentWorkout: TWorkoutHydrated;
  currentInstance: TexerciseInstanceHydrated;
  sectionIndex: number;
  instanceIndex: number;
  isAuto: boolean;
}
function IntervalScreen({
  currentWorkout,
  currentInstance,
  sectionIndex,
  instanceIndex,
  isAuto,
}: Props) {
  const router = useRouter();
  let handleWorkoutTransition = (
    workout: TWorkoutHydrated,
    sectionIndex: number,
    instanceIndex: number,
    isAuto: boolean,
    action: "forward" | "back",
  ) => {
    let baseUrl = `/workout/${workout._id}`;
    if (action === "forward") {
      if (
        workout.workoutSections[sectionIndex].exerciseInstances[
          instanceIndex + 1
        ]
      ) {
        let body: {
          baseUrl: string;
          sectionIndex?: number;
          instanceIndex?: number;
          isAuto?: boolean;
          isComplete?: boolean;
        } = {
          baseUrl,
          sectionIndex,
          instanceIndex: instanceIndex + 1,
        };
        if (isAuto) {
          body.isAuto = true;
        }
        let newUrl = createUrlWithSearchParams({ ...body });
        router.push(newUrl);
      } else if (
        workout.workoutSections[sectionIndex + 1]?.exerciseInstances[0]
      ) {
        let body: {
          baseUrl: string;
          sectionIndex?: number;
          instanceIndex?: number;
          isAuto?: boolean;
          isComplete?: boolean;
        } = {
          baseUrl,
          sectionIndex: sectionIndex + 1,
          instanceIndex: 0,
        };
        if (isAuto) {
          body.isAuto = true;
        }
        let newUrl = createUrlWithSearchParams({ ...body });
        router.push(newUrl);
      } else {
        let body: {
          baseUrl: string;
          sectionIndex?: number;
          instanceIndex?: number;
          isAuto?: boolean;
          isComplete?: boolean;
        } = {
          baseUrl,
          isComplete: true,
        };
        if (isAuto) {
          body.isAuto = true;
        }
        let newUrl = createUrlWithSearchParams({ ...body });
        router.push(newUrl);
      }
    } else {
      if (
        workout.workoutSections[sectionIndex]?.exerciseInstances[
          instanceIndex - 1
        ]
      ) {
        let body: {
          baseUrl: string;
          sectionIndex?: number;
          instanceIndex?: number;
          isAuto?: boolean;
          isComplete?: boolean;
        } = {
          baseUrl,
          sectionIndex,
          instanceIndex: instanceIndex - 1,
        };
        if (isAuto) {
          body.isAuto = true;
        }
        let newUrl = createUrlWithSearchParams({ ...body });
        router.push(newUrl);
      } else if (sectionIndex === 0 && instanceIndex === 0) {
        router.push(`/workout/${workout._id}`);
      } else if (
        workout.workoutSections[sectionIndex - 1]?.exerciseInstances[
          workout.workoutSections[sectionIndex - 1]?.exerciseInstances?.length -
            1
        ]
      ) {
        let body: {
          baseUrl: string;
          sectionIndex?: number;
          instanceIndex?: number;
          isAuto?: boolean;
          isComplete?: boolean;
        } = {
          baseUrl,
          sectionIndex: sectionIndex - 1,
          instanceIndex:
            workout.workoutSections[sectionIndex - 1]?.exerciseInstances
              ?.length - 1,
        };
        if (isAuto) {
          body.isAuto = true;
        }
        let newUrl = createUrlWithSearchParams({ ...body });
        router.push(newUrl);
      }
    }
  };
  const [infoDialog, setInfoDialog] = React.useState<Texercise | undefined>(
    undefined,
  );

  const [isPlaying, setIsPlaying] = React.useState<boolean>(
    isAuto ? true : false,
  );
  return (
    <>
      {infoDialog && (
        <MyDialog
          onDismiss={() => setInfoDialog(undefined)}
          isOpen={true}
          header={(currentInstance.exercise as Texercise).name}
        >
          <RichText exercise={currentInstance.exercise} />
        </MyDialog>
      )}
      <div>
        <div className="justify-center min-h-[80px] h-[10vh] border-b border-black flex w-[100%] md:justify-start align-bottom pt-5 pl-5">
          {/* header */}
          <h1 className=" font-extrabold text-lg md:text-3xl">
            {currentInstance?.name ?? "--"}
          </h1>
        </div>
        <div className="min-h-[500px]  h-[76vh] flex justify-center align-middle pt-20">
          <div
            onClick={() => setInfoDialog(currentInstance?.exercise)}
            className="hover:bg-slate-100 p-3 min-h-[400px] max-h-[450px] rounded-md cursor-pointer max-w-[350px] text-wrap overflow-hidden"
          >
            <div>
              <Image
                src={
                  (currentInstance?.exercise as Texercise).primaryImage?.asset
                    ?.url
                }
                alt={
                  (currentInstance?.exercise as Texercise).primaryImage?.alt ??
                  "--"
                }
                height={300}
                width={300}
              />
            </div>
            <p className="text-center pt-1 font-semibold text-md">
              {`Recommended Weight: ${currentInstance?.recommendedWeight}`}
            </p>
            <div className="flex justify-center">
              <CountdownCircleTimer
                key={`${instanceIndex}_${currentInstance?._id}_${sectionIndex}`}
                isPlaying={isPlaying}
                onUpdate={(remainingTime) => {
                  if (remainingTime === currentInstance.duration && isAuto) {
                    if ("speechSynthesis" in window) {
                      var msg = new SpeechSynthesisUtterance();
                      msg.text = `switch to  ${currentInstance?.name ?? "the next exercise"}`;
                      window.speechSynthesis.speak(msg);
                    }
                  }
                }}
                initialRemainingTime={currentInstance.duration}
                duration={currentInstance.duration}
                onComplete={() => {
                  if (isAuto) {
                    handleWorkoutTransition(
                      currentWorkout,
                      sectionIndex,
                      instanceIndex,
                      isAuto,
                      "forward",
                    );
                  }
                  if (!isAuto) {
                    if ("speechSynthesis" in window) {
                      var msg = new SpeechSynthesisUtterance();
                      msg.text = `Exercise Complete`;
                      window.speechSynthesis.speak(msg);
                    }
                  }
                }}
                colors={"#004777"}
                size={60}
              >
                {({ remainingTime }) => {
                  return remainingTime;
                }}
              </CountdownCircleTimer>
            </div>
          </div>
        </div>
        <div className="h-[9vh] border-t border-black flex justify-between px-10">
          <div
            onClick={() =>
              handleWorkoutTransition(
                currentWorkout,
                sectionIndex,
                instanceIndex,
                isAuto,
                "back",
              )
            }
            className="p-3 rounded-md cursor-pointer hover:bg-slate-100"
          >
            <ArrowLeftIcon className="h-10" />
          </div>
          {isPlaying ? (
            <div
              onClick={() => setIsPlaying(false)}
              className="p-3 rounded-md cursor-pointer hover:bg-slate-100"
            >
              <PauseIcon className="h-10" />
            </div>
          ) : (
            <div
              onClick={() => setIsPlaying(true)}
              className="p-3 rounded-md cursor-pointer hover:bg-slate-100"
            >
              <PlayIcon className="h-10" />
            </div>
          )}

          <div
            onClick={() =>
              handleWorkoutTransition(
                currentWorkout,
                sectionIndex,
                instanceIndex,
                isAuto,
                "forward",
              )
            }
            className="p-3 rounded-md cursor-pointer hover:bg-slate-100"
          >
            <ArrowRightIcon className="h-10" />
          </div>
        </div>
      </div>
    </>
  );
}

export default IntervalScreen;
