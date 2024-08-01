import { SanityDocument } from "next-sanity";

interface TImage {
  _type: "image";
  alt: string | undefined;
  asset: any;
}

interface TSanityRef {
  _type: string;
  _key: string;
  _ref: string;
}

export interface TWorkout extends SanityDocument {
  title: string;
  description: string;
  workoutSections: TSanityRef[];
}

export interface TWorkoutHydrated extends SanityDocument {
  title: string;
  description: string;
  workoutSections: TWorkoutSectionHydrated[];
}

export interface TWorkoutSection extends SanityDocument {
  title: string;
  description: string;
  exerciseInstances: TSanityRef[];
}

export interface TWorkoutSectionHydrated extends SanityDocument {
  title: string;
  description: string;
  exerciseInstances: TexerciseInstanceHydrated[];
}

export interface TexerciseInstance extends SanityDocument {
  name: string;
  exercise: TSanityRef;
  type: "INTERVAL" | "REPETITIONS";
  recommendedWeight: "HEAVY" | "MEDIUM" | "LIGHT" | "BODY-WEIGHT";
  duration: number;
}

export interface TexerciseInstanceHydrated extends SanityDocument {
  name: string;
  exercise: exercise;
  type: "INTERVAL" | "REPETITIONS";
  recommendedWeight: "HEAVY" | "MEDIUM" | "LIGHT" | "BODY-WEIGHT";
  duration: number;
}

export interface Texercise extends SanityDocument {
  name: string;
  primaryImage: TImage;
  info: any;
}
