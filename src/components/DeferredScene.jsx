import { Component, Suspense, useEffect, useRef, useState } from "react";

// Loader errors escape Suspense. Contain them within the optional scene.
class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// Reserve the scene's existing layout and load WebGL only near the viewport.
export default function DeferredScene({ children, fallback = null, className = "h-full w-full" }) {
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
    {ready && (
      <SceneBoundary fallback={fallback}>
        <Suspense fallback={null}>{children}</Suspense>
      </SceneBoundary>
    )}
  </div>;
}
