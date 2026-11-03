import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Four layers with four nodes each, arranged in depth as well as height.
const nodes = Array.from({ length: 16 }, (_, i) => {
  const layer = Math.floor(i / 4);
  const angle = (i % 4) * Math.PI / 2 + Math.PI / 4;
  return [(layer - 1.5) * 1.05, Math.sin(angle) * 0.95, Math.cos(angle) * 0.95];
});
const edges = nodes.flatMap((_, i) => Math.floor(i / 4) < 3
  ? Array.from({ length: 4 }, (_, j) => [i, (Math.floor(i / 4) + 1) * 4 + j]) : []);
const positions = new Float32Array(edges.flatMap(([a, b]) => [...nodes[a], ...nodes[b]]));

const Network = ({ reducedMotion, mobile, pulse, selected, onSelect }) => {
  const group = useRef();
  const packets = useRef([]);
  const started = useRef(null);
  useEffect(() => { started.current = null; }, [pulse]);
  useFrame(({ clock }, delta) => {
    if (started.current === null) started.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - started.current;
    if (!reducedMotion) group.current.rotation.y += Math.min(delta, 0.05) * 0.07;
    edges.forEach(([a, b], i) => {
      const packet = packets.current[i];
      if (!packet) return;
      const active = a === selected || b === selected;
      const t = (elapsed * 0.65 + (active ? 0 : i * 0.13)) % 1;
      packet.visible = !reducedMotion && (active || i % 6 === 0);
      packet.position.set(...nodes[a].map((v, axis) => v + (nodes[b][axis] - v) * t));
      packet.scale.setScalar(active ? 1.4 : 0.7);
    });
  });
  return (
    <group ref={group} rotation={[0.12, -0.35, -0.08]} scale={mobile ? 0.8 : 1}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#67DDB5" transparent opacity={0.24} />
      </lineSegments>
      {nodes.map((position, i) => (
        <mesh key={i} position={position} scale={selected === i ? 1.4 : 1}
          onClick={(event) => { event.stopPropagation(); onSelect(i); }}>
          <icosahedronGeometry args={[0.14, 1]} />
          <meshStandardMaterial color={selected === i ? "#F2B66D" : "#67DDB5"}
            emissive={selected === i ? "#F2B66D" : "#67DDB5"} emissiveIntensity={selected === i ? 0.9 : 0.25}
            metalness={0.3} roughness={0.25} />
        </mesh>
      ))}
      {edges.map((edge, i) => (
        <mesh key={i} ref={(mesh) => { packets.current[i] = mesh; }} visible={!reducedMotion}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshBasicMaterial color="#F2B66D" />
        </mesh>
      ))}
    </group>
  );
};

const ComputersCanvas = () => {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 640px)").matches);
  const [visible, setVisible] = useState(true);
  const container = useRef();
  const [selected, setSelected] = useState(5);
  const [pulse, setPulse] = useState(0);
  const activate = (node) => { setSelected(node); setPulse((value) => value + 1); };
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    const updateMobile = () => setMobile(mobileQuery.matches);
    motionQuery.addEventListener("change", updateMotion);
    mobileQuery.addEventListener("change", updateMobile);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(container.current);
    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      mobileQuery.removeEventListener("change", updateMobile);
      observer.disconnect();
    };
  }, []);
  return (
    <div ref={container} className="relative h-full w-full">
      <Canvas frameloop={reducedMotion || !visible ? "demand" : "always"} dpr={mobile ? 1 : [1, 1.5]} camera={{ position: [0, 0, 6], fov: 43 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 4]} intensity={2} />
        <pointLight position={[-4, -1, 2]} color="#67DDB5" intensity={1.5} />
        <Network reducedMotion={reducedMotion} mobile={mobile} pulse={pulse} selected={selected} onSelect={activate} />
        {!mobile && <OrbitControls enableZoom={false} enablePan={false} enableDamping={!reducedMotion} />}
      </Canvas>
      {!mobile && (
        <div className="pointer-events-none absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-secondary" aria-hidden="true">
          <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
            <path d="M24 10V3m0 0-4 4m4-4 4 4M24 46v7m0 0-4-4m4 4 4-4M10 28H3m0 0 4-4m-4 4 4 4M38 28h7m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="16" y="15" width="16" height="26" rx="8" stroke="#67DDB5" strokeWidth="1.5"/>
            <path d="M24 20v5" stroke="#67DDB5" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-xs">Drag to rotate</span>
        </div>
      )}
      <div className="absolute bottom-0 inset-x-0 flex flex-col items-center gap-2">
        <button type="button" onClick={() => activate((selected + 1) % nodes.length)}
          className="rounded-full border border-[#67DDB5]/40 bg-primary px-4 py-2 text-sm text-[#67DDB5] hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B66D]">
          Activate a node
        </button>
        <p className="text-secondary text-xs">{mobile ? "Tap a node to explore" : "Click a node to send a signal"}</p>
      </div>
    </div>
  );
};

export default ComputersCanvas;
