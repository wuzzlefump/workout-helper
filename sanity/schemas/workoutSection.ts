import { defineField, defineType } from "sanity";

export default defineType({
  name: "workoutSection",
  title: "Workout Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "exerciseInstances",
      title: "exercise Instances",
      type: "array",
      of: [{ type: "reference", to: { type: "exerciseInstance" } }],
    }),
  ],
});
