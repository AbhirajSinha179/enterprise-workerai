import React, { useCallback } from "react";
import { useRef } from "react"

export const useInfiniteScroll = ({loadMoreEmails, loading, hasMore, emailList}: any) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const emailRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasMore.current) {
        loadMoreEmails();
      }
    },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
      }
    )
    if (node) observer.current.observe(node);
  }, [loading, hasMore, emailList])

  return emailRef
}