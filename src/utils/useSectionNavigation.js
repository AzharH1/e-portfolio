import { useLayoutEffect } from "react";

export default function useSectionNavigation() {
  useLayoutEffect(() => {
    const header = document.querySelector("nav");
    const page = document.documentElement;
    const measureHeader = () => {
      page.style.setProperty("--nav-height", header.getBoundingClientRect().height + "px");
    };
    measureHeader();
    const observer = new ResizeObserver(measureHeader);
    observer.observe(header, { box: "border-box" });

    // A direct link can arrive before React has rendered its target.
    const target = document.getElementById(window.location.hash.slice(1));
    if (target?.matches(".section-intro")) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
    }

    return () => {
      observer.disconnect();
      page.style.removeProperty("--nav-height");
    };
  }, []);
}
