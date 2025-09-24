import { useEffect } from "react";

export default function useMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let metaTag = document.querySelector('meta[name="description"]');
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", "description");
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", description);
    }
  }, [title, description]);
}
