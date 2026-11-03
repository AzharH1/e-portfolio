import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Four layers with four nodes each, arranged in depth as well as height.
const nodes = Array.from({ length: 16 }, (_, i) => {
  const layer = Math.floor(i / 4);
  const angle = (i % 4) * Math.PI / 2 + Math.PI / 4;
  return [(layer - 1.5) * 1.05, Math.sin(angle) * 0.95, Math.cos(angle) * 0.95];
});
const edges = nodes.flatMap((_, i) => Math.floor(i / 4) < 3
  ? Array.from({ length: 4 }, (_, j) => [i, (Math.floor(i / 4) + 1) * 4 + j]) : []);
const mobileNodes = Array.from({ length: 8 }, (_, i) => {
  const y = 1 - (i / 7) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(angle) * radius * 1.35, y * 1.35, Math.sin(angle) * radius * 1.35];
});
const desktopPositions = new Float32Array(edges.flatMap(([a, b]) => [...nodes[a], ...nodes[b]]));
const mobileEdges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [4, 6], [5, 7], [6, 7]];
const mobilePositions = new Float32Array(mobileEdges.flatMap(([a, b]) => [...mobileNodes[a], ...mobileNodes[b]]));

const Network = ({ reducedMotion, mobile, pulse, selected, onSelect, visible, rotationStep }) => {
  const layout = mobile ? mobileNodes : nodes;
  const links = mobile ? mobileEdges : edges;
  const nodeColor = (i) => mobile ? ["#67DDB5", "#F2F5F0", "#F2B66D"][i % 3] : "#67DDB5";
  const positions = mobile ? mobilePositions : desktopPositions;
  const viewport = useThree((state) => state.viewport);
  const mobileScale = Math.min(viewport.width, viewport.height) / 3.8;
  const group = useRef();
  const nodeMeshes = useRef([]);
  const connections = useRef();
  const assembled = useRef(false);
  const packets = useRef([]);
  const elapsed = useRef(0);
  const invalidate = useThree((state) => state.invalidate);
  useLayoutEffect(() => {
    assembled.current = reducedMotion;
    elapsed.current = 0;
    packets.current.forEach((packet) => { if (packet) packet.visible = false; });
    if (reducedMotion) { invalidate(); return; }
    const context = gsap.context(() => {
      const sequence = gsap.timeline({ onUpdate: invalidate, onComplete: () => { elapsed.current = 0; assembled.current = true; } });
      nodeMeshes.current.forEach((mesh, i) => {
        sequence.from(mesh.position, {
          x: layout[i][0] * 1.7, y: layout[i][1] * 1.8, z: layout[i][2] + 2,
          duration: mobile ? 0.65 : 1.1, ease: "power3.out",
        }, 0.25 + i * 0.035);
      });
      sequence.from(connections.current, { opacity: 0, duration: 0.65 }, mobile ? 0.8 : 1.15);
    });
    return () => { context.revert(); assembled.current = true; };
  }, [reducedMotion, mobile, invalidate]);
  useLayoutEffect(() => {
    elapsed.current = 0;
    packets.current.forEach((packet) => { if (packet) packet.visible = false; });
    invalidate();
  }, [pulse, visible, reducedMotion, invalidate]);
  useLayoutEffect(() => {
    if (!mobile) return;
    const tween = gsap.to(group.current.rotation, {
      y: -0.35 + rotationStep * Math.PI / 3,
      duration: reducedMotion ? 0 : 0.6, ease: "power2.inOut", onUpdate: invalidate,
    });
    return () => tween.kill();
  }, [rotationStep, mobile, reducedMotion, invalidate]);
  useFrame((_, delta) => {
    const running = visible && assembled.current && !reducedMotion;
    if (running && !mobile) group.current.rotation.y += Math.min(delta, 0.05) * 0.07;
    links.forEach(([a, b], i) => {
      const packet = packets.current[i];
      if (!packet) return;
      const active = a === selected || b === selected;
      // Delay background signals instead of starting them halfway along an edge.
      const age = elapsed.current * 0.65 - (active ? 0 : (i % 7) * 0.13);
      packet.visible = running && age >= 0 && (active || i % 6 === 0);
      const t = Math.max(0, age) % 1;
      const source = active && b === selected ? b : a;
      const target = source === a ? b : a;
      // Follow the actual meshes so signals remain attached during any transforms.
      packet.position.copy(nodeMeshes.current[source].position).lerp(nodeMeshes.current[target].position, t);
      packet.scale.setScalar(active ? 1.4 : 0.7);
    });
    if (running) elapsed.current += Math.min(delta, 0.05);
  });
  return (
    <group ref={group} rotation={[0.12, -0.35, -0.08]} scale={mobile ? mobileScale : 1}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial ref={connections} color="#67DDB5" transparent opacity={0.24} />
      </lineSegments>
      {layout.map((position, i) => (
        <mesh ref={(mesh) => { nodeMeshes.current[i] = mesh; }} key={i} position={position} scale={selected === i ? 1.4 : 1}
          onClick={(event) => { event.stopPropagation(); onSelect(i); }}>
          <icosahedronGeometry args={[mobile ? 0.18 : 0.14, 1]} />
          <meshStandardMaterial color={selected === i ? "#F2B66D" : nodeColor(i)}
            emissive={selected === i ? "#F2B66D" : nodeColor(i)} emissiveIntensity={selected === i ? 0.9 : 0.25}
            metalness={0.3} roughness={0.25} />
          {mobile && <mesh>
            <sphereGeometry args={[0.29, 8, 8]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>}
        </mesh>
      ))}
      {links.map((edge, i) => (
        <mesh key={i} ref={(mesh) => { packets.current[i] = mesh; }} visible={false}>
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
  const [rotationStep, setRotationStep] = useState(0);
  useEffect(() => { if (mobile) setSelected((node) => node % mobileNodes.length); }, [mobile]);
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
      <div className={mobile ? "absolute inset-x-0 top-0 bottom-[76px]" : "h-full"}>
      <Canvas style={mobile ? { touchAction: "pan-y" } : undefined} frameloop={reducedMotion || !visible ? "demand" : "always"} dpr={mobile ? 1 : [1, 1.5]} camera={{ position: [0, 0, 6], fov: 43 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 4]} intensity={2} />
        <pointLight position={[-4, -1, 2]} color="#67DDB5" intensity={1.5} />
        <Network key={mobile ? "mobile" : "desktop"} rotationStep={rotationStep} visible={visible} reducedMotion={reducedMotion} mobile={mobile} pulse={pulse} selected={selected} onSelect={activate} />
        {!mobile && <OrbitControls enableZoom={false} enablePan={false} enableDamping={!reducedMotion} />}
      </Canvas>
      </div>
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
        <div className="flex gap-3">
        <button type="button" onClick={() => activate((selected + 1) % (mobile ? mobileNodes.length : nodes.length))}
          className="min-h-[44px] rounded-full border border-[#67DDB5]/40 bg-primary px-4 py-2 text-sm text-[#67DDB5] hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B66D]">
          {mobile ? "Send a signal" : "Activate a node"}
        </button>
        {mobile && <button type="button" onClick={() => setRotationStep((step) => step + 1)}
          className="min-h-[44px] rounded-full border border-[#67DDB5]/40 bg-primary px-5 py-2 text-sm text-[#67DDB5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2B66D]">
          Rotate ↻
        </button>}
        </div>
        <p className="text-secondary text-xs">{mobile ? "Tap a node to send a signal" : "Click a node to send a signal"}</p>
      </div>
    </div>
  );
};

export default ComputersCanvas;
