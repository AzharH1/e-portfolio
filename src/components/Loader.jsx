import { useProgress } from "@react-three/drei";

// Keep loading UI in the main React tree, outside the WebGL Suspense root.
const CanvasLoader = () => {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div role="status" aria-label="Loading 3D scene" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
      <span className="canvas-loader" />
      <p className="mt-10 text-sm font-extrabold text-[#F1F1F1]">{progress.toFixed(2)}%</p>
    </div>
  );
};

export default CanvasLoader;
