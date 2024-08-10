"use client";
import React, {
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export default function ModalPropTypeList({
  children,
}: {
  children: ReactNode;
}) {
  // const [isVisible, setIsVisible] = useState(false);
  // const ulRef = useRef<HTMLUListElement | null>(null);
  // const callback = (entries: any) => {
  //   const [entry] = entries;
  //   setIsVisible(entry.isIntersecting);
  // };

  // useEffect(() => {
  //   const intersectionObserver = new IntersectionObserver(callback);
  //   if (ulRef.current) intersectionObserver.observe(ulRef.current);

  //   return () => {
  //     if (ulRef.current) intersectionObserver.unobserve(ulRef.current);
  //   };
  //   //react-hooks/exhaustive-deps
  // }, [ulRef]);

  return <ul>{children}</ul>;
}
