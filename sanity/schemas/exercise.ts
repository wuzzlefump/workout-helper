import { defineField, defineType } from "sanity";

export default defineType({
  name: "exercise",
  title: "exercise",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "primaryImage",
      title: "Primary Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "info",
      title: "Info",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "primaryImage",
    },
  },
});
