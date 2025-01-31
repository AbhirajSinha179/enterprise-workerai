import { useCallback, useRef } from "react";

export const useInfiniteScroll = ({ loadMoreEmails, loading, hasMore }: any) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const emailRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) {
        if (observer.current) observer.current.disconnect(); // Disconnect when no more data
        return;
      }

      if (observer.current) observer.current.disconnect(); // Clear the previous observer

      try {
        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting && hasMore.current) {
              if (typeof loadMoreEmails === "function") {
                loadMoreEmails();
              } else {
                console.error("loadMoreEmails is not a valid function.");
              }
            }
          },
          {
            root: null, // Viewport as the root
            rootMargin: "200px", // Trigger slightly before visibility
            threshold: 1.0, // Fully visible
          }
        );

        if (node) observer.current.observe(node); // Attach to the node
      } catch (error) {
        console.error("Error in IntersectionObserver:", error);
      }
    },
    [loading, hasMore, loadMoreEmails]
  );

  return emailRef;
};
