import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import exercise from "./schemas/exercise";
import workout from "./schemas/workout";
import workoutSection from "./schemas/workoutSection";
import exerciseInstance from "./schemas/exerciseInstance";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [exercise, workout, workoutSection, blockContent, exerciseInstance],
};
