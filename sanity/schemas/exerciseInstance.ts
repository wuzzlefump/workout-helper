import { defineField, defineType } from "sanity";

export default defineType({
  name: "exerciseInstance",
  title: "exercise Instance",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "exercise",
      title: "exercise",
      type: "reference",
      to: { type: "exercise" },
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["INTERVAL", "REPETITIONS"],
        layout: "radio",
      },
    }),
    defineField({
      name: "recommendedWeight",
      title: "Recommended Weight",
      type: "string",
      options: {
        list: ["HEAVY", "MEDIUM", "LIGHT", "BODY-WEIGHT"],
        layout: "radio",
      },
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
