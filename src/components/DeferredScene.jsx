import { Suspense, useEffect, useRef, useState } from "react";

// Reserve the scene's existing layout and load WebGL only near the viewport.
export default function DeferredScene({ children, className = "h-full w-full" }) {
  const root = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={root} className={className}>
    {ready && <Suspense fallback={null}>{children}</Suspense>}
  </div>;
}
