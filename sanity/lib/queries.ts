import { groq } from "next-sanity";

// gets unhydrated workout list
export const WORKOUTS_QUERY = groq`*[_type == "workout"]`;

export const exerciseS_QUERY = groq`*[_type == "exercise"]{
...,
primaryImage{
...,
asset->{...}}}`;

export const exercise_QUERY = groq`*[_type == "exercise" && _id == $_id][0]{
...,
primaryImage{
...,
asset->{...}}}`;

export const WORKOUT_QUERY = groq`*[_type == "workout" && _id == $_id]{
...,
workoutSections[]->{
... ,
exerciseInstances[]->{
...,
exercise->{...,
primaryImage{
...,asset->{...}}}
}
}
}`;
