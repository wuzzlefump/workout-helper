import { defineField, defineType } from "sanity";

export default defineType({
  name: "workout",
  title: "Workout",
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
      name: "workoutSections",
      title: "Workout Sections",
      type: "array",
      of: [{ type: "reference", to: { type: "workoutSection" } }],
    }),
  ],
});
