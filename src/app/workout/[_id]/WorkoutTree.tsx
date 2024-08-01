import Link from "next/link";
import {
  TWorkoutHydrated,
  TexerciseInstanceHydrated,
} from "../../../../typings";
import styles from "./WorkoutTree.module.css";
import { createUrlWithSearchParams } from "./utils";
interface Props {
  workout: TWorkoutHydrated;
  open?: boolean;
}

function WorkoutTree({ workout, open = true }: Props) {
  return (
    <div>
      <Link
        href={createUrlWithSearchParams({
          baseUrl: `/workout/${workout._id}`,
        })}
      >
        <div className="flex justify-center font-bold p-4 hover:bg-blue-200">
          {workout.title}
        </div>
      </Link>

      <ul className={styles.relationshipTreeContianer}>
        {workout?.workoutSections?.map((x, key) => {
          return (
            <RelationTreeNode
              workoutId={workout._id}
              type={"SECTION"}
              sectionIndex={key}
              instanceIndex={0}
              resourceName={x.title}
              key={`${x._id}_${key}`}
              open={open}
              exerciseInstances={x.exerciseInstances}
              parentPadding={5}
              index={key}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default WorkoutTree;

interface TreeNodeProps {
  workoutId: string;
  resourceName: string;
  exerciseInstances: TexerciseInstanceHydrated[];
  open?: boolean;
  parentPadding?: number;
  index: number;
  type: "SECTION" | "INSTANCE";
  sectionIndex: number;
  instanceIndex?: number;
}
let RelationTreeNode = ({
  open = true,
  parentPadding,
  index,
  resourceName,
  exerciseInstances,
  sectionIndex,
  instanceIndex,
  workoutId,
  type,
}: TreeNodeProps) => {
  let exercises = exerciseInstances ? exerciseInstances : [];
  return (
    <ul key={`list_${index}`}>
      <details open={open} style={{ paddingInlineStart: `${parentPadding}px` }}>
        <summary>
          <Link
            href={createUrlWithSearchParams({
              baseUrl: `/workout/${workoutId}`,
              sectionIndex: sectionIndex,
              instanceIndex: instanceIndex,
            })}
          >
            <div
              className={`font-bold p-1 ${type !== "SECTION" && "hover:bg-blue-200"} `}
            >
              {resourceName}
            </div>
          </Link>
        </summary>
        {exercises?.map((x, key) => {
          return (
            <li key={`list_item_${key}`}>
              <RelationTreeNode
                workoutId={workoutId}
                sectionIndex={sectionIndex}
                instanceIndex={key}
                type="INSTANCE"
                parentPadding={25}
                exerciseInstances={[]}
                index={key}
                resourceName={x.name}
              />
            </li>
          );
        })}
      </details>
    </ul>
  );
};
