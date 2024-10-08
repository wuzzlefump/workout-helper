// ./sanity/presentation/locate.ts

import { DocumentLocationResolver } from "sanity/presentation";
import { map } from "rxjs";

// Pass 'context' as the second argument
export const locate: DocumentLocationResolver = (params, context) => {
  // Set up locations for post documents
  if (params.type === "workout") {
    // Subscribe to the latest slug and title
    const doc$ = context.documentStore.listenQuery(
      `*[_id == $id][0]`,
      params,
      { perspective: "previewDrafts" }, // returns a draft article if it exists
    );
    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        // If the document doesn't exist or have a slug, return null
        if (!doc || !doc?._id) {
          return null;
        }
        return {
          locations: [
            {
              title: doc.title || "Untitled",
              href: `/workout/${doc._id}`,
            },
            {
              title: doc.title || "Untitled",
              href: `/glossary/${doc._id}`,
            },
            {
              title: doc.title || "Untitled",
              href: `/glossary`,
            },
            {
              title: "Home",
              href: "/",
            },
          ],
        };
      }),
    );
  }
  return null;
};
