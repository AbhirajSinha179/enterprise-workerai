import { useCallback, useRef } from "react";

export const useInfiniteScroll = ({ loadMoreEmails, loading, hasMore }: any) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const emailRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasMore.current) {
            loadMoreEmails();
          }
        },
        {
          root: null,
          rootMargin: "200px",
          threshold: 1.0,
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreEmails]
  );

  return emailRef;
};
