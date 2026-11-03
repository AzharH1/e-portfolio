import { useLayoutEffect } from "react";

// Native links own the URL and history. Keep their destination aligned if layout
// changes after a jump, only until the visitor starts their next interaction.
export default function useSectionNavigation() {
  useLayoutEffect(() => {
    const header = document.querySelector("nav");
    const page = document.documentElement;
    let destination = null;

    function release() {
      destination = null;
    }

    function align() {
      page.style.setProperty("--nav-height", header.getBoundingClientRect().height + "px");
      if (destination && location.hash === "#" + destination.id) {
        destination.scrollIntoView({ block: "start", behavior: "instant" });
      }
    }

    function follow(hash) {
      const target = document.getElementById(hash.slice(1));
      destination = target?.matches(".section-intro") ? target : null;
    }

    function onLink(event) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a[href^='#']");
      if (link) follow(link.hash);
    }

    const layout = new ResizeObserver(align);
    layout.observe(header);
    // Resizing the hero or Overview moves Work even if Work's size stays the same.
    for (const section of document.querySelectorAll("section")) {
      layout.observe(section);
      if (section.contains(document.getElementById("work"))) break;
    }
    follow(location.hash);
    align();
    const initialFrame = requestAnimationFrame(align);

    const gestures = ["pointerdown", "touchstart", "wheel", "keydown"];
    for (const type of gestures) window.addEventListener(type, release, { capture: true, passive: true });
    document.addEventListener("click", onLink);
    return () => {
      cancelAnimationFrame(initialFrame);
      layout.disconnect();
      document.removeEventListener("click", onLink);
      for (const type of gestures) window.removeEventListener(type, release, true);
      page.style.removeProperty("--nav-height");
    };
  }, []);
}
