import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  ["01 / SOFTWARE", "I build.", "Turning ideas into software people can use."],
  ["02 / AI ENGINEERING", "I connect.", "Connecting intelligence, tools and people."],
  ["03 / SECURITY", "I protect.", "Making reliability and security part of the design."],
  ["04 / DELIVERY", "I deliver.", "Hi, I’m Azhar. I build secure software and AI tools, and lead ideas from prototype to production."],
];
const layouts = [
  Array.from({ length: 16 }, (_, i) => ({ x: 100 + (i % 4) * 95, y: 120 + Math.floor(i / 4) * 70, size: 52, radius: 8 })),
  Array.from({ length: 16 }, (_, i) => {
    const column = Math.floor(i / 4);
    const row = i % 4;
    return { x: 85 + column * 110, y: 105 + row * 95 + (column % 2 ? 20 : 0), size: column === 1 || column === 2 ? 28 : 20, radius: 14 };
  }),
  Array.from({ length: 16 }, (_, i) => {
    const shield = [[100,100],[175,80],[250,60],[325,80],[400,100],[400,175],[385,250],[350,315],[300,370],[250,415],[200,370],[150,315],[115,250],[100,175],[210,220],[290,220]];
    return { x: shield[i][0], y: shield[i][1], size: i < 14 ? 24 : 36, radius: 12 };
  }),
  Array.from({ length: 16 }, (_, i) => { const a = i * Math.PI * 2 / 16; return { x: 250 + Math.cos(a) * 175, y: 250 + Math.sin(a) * 175, size: 14, radius: 7 }; }),
];
const links = Array.from({ length: 12 }, (_, i) => [
  [i, i + 4],
  [i, Math.floor(i / 4) * 4 + 4 + ((i + 1) % 4)],
]).flat();

export default function Hero() {
  const root = useRef();
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const art = root.current.querySelector(".story-art");
      const tiles = [...art.querySelectorAll(".story-tile")];
      const movers = tiles.map((tile) => ({
        x: gsap.quickTo(tile, "x", { duration: 0.55, ease: "power3.out" }),
        y: gsap.quickTo(tile, "y", { duration: 0.55, ease: "power3.out" }),
      }));
      const reset = () => movers.forEach((move) => { move.x(0); move.y(0); });
      const move = (event) => {
        const panels = [...root.current.querySelectorAll(".story-copy")];
        const scene = panels.reduce((best, panel, i) => Number(gsap.getProperty(panel, "opacity")) > Number(gsap.getProperty(panels[best], "opacity")) ? i : best, 0);
        const matrix = art.getScreenCTM();
        if (!matrix) return;
        const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
        tiles.forEach((tile, i) => {
          const x = Number(tile.getAttribute("x")) + Number(tile.getAttribute("width")) / 2;
          const y = Number(tile.getAttribute("y")) + Number(tile.getAttribute("height")) / 2;
          const dx = x - point.x, dy = y - point.y;
          const distance = Math.hypot(dx, dy);
          if (scene === 3) {
            const angle = (point.x - 250) / 220;
            const ox = x - 250, oy = y - 250;
            movers[i].x(ox * Math.cos(angle) - oy * Math.sin(angle) - ox);
            movers[i].y(ox * Math.sin(angle) + oy * Math.cos(angle) - oy);
            return;
          }
          const force = Math.max(0, 1 - distance / (scene === 1 ? 210 : 145)) * (scene === 2 ? 30 : 75);
          movers[i].x((distance ? dx / distance : 1) * force);
          movers[i].y((distance ? dy / distance : 0) * force);
        });
      };
      const wires = [...art.querySelectorAll(".story-wire")];
      const syncConnections = () => {
        const rect = art.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const centres = tiles.map((tile) => ({
          x: Number(tile.getAttribute("x")) + Number(tile.getAttribute("width")) / 2 + Number(gsap.getProperty(tile, "x")),
          y: Number(tile.getAttribute("y")) + Number(tile.getAttribute("height")) / 2 + Number(gsap.getProperty(tile, "y")),
        }));
        links.forEach(([a,b],i) => {
          wires[i].setAttribute("x1", centres[a].x); wires[i].setAttribute("y1", centres[a].y);
          wires[i].setAttribute("x2", centres[b].x); wires[i].setAttribute("y2", centres[b].y);
        });
        if (Number(gsap.getProperty(root.current.querySelectorAll(".story-copy")[2], "opacity")) > 0.8) {
          art.querySelector('.story-shield').setAttribute('d', centres.slice(0,14).map((p,i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ') + 'Z');
        }
      };
      gsap.ticker.add(syncConnections);
      const textCleanups = [...root.current.querySelectorAll('.story-copy')].map((panel, scene) => {
        const heading = panel.querySelector('.story-title');
        const letters = [...heading.querySelectorAll('.story-letter')];
        // Each chapter has a distinct, reversible typographic gesture.
        const animation = gsap.timeline({ paused: true });
        if (scene === 0) {
          animation.to(letters, { y: (i) => i % 2 ? -13 : 8, rotation: (i) => i % 2 ? 4 : -4, duration: 0.16, stagger: 0.035 })
            .to(letters, { y: 0, rotation: 0, color: '#67DDB5', duration: 0.42, stagger: 0.045, ease: 'back.out(2)' });
        } else if (scene === 1) {
          animation.to(letters, { y: -14, color: '#67DDB5', duration: 0.2, stagger: 0.055, ease: 'sine.out' })
            .to(letters, { y: 0, color: '#F2F5F0', duration: 0.3, stagger: 0.055, ease: 'sine.inOut' }, 0.22);
        } else if (scene === 2) {
          animation.to(heading, { scaleX: 0.96, color: '#67DDB5', textShadow: '0 0 22px #67DDB566', duration: 0.4, ease: 'power2.out' });
        } else {
          animation.to(letters, { x: 12, skewX: -10, color: '#F2B66D', duration: 0.2, stagger: 0.025 })
            .to(letters, { x: 0, skewX: 0, duration: 0.5, stagger: 0.025, ease: 'power3.out' });
        }
        const play = () => animation.restart();
        const settle = () => animation.reverse();
        const reset = () => animation.pause(0);
        heading.addEventListener('pointerenter', play);
        heading.addEventListener('pointerleave', settle);
        window.addEventListener('scroll', reset, { passive: true });
        return () => {
          heading.removeEventListener('pointerenter', play);
          heading.removeEventListener('pointerleave', settle);
          window.removeEventListener('scroll', reset);
        };
      });
      art.addEventListener("pointermove", move);
      art.addEventListener("pointerleave", reset);
      window.addEventListener("scroll", reset, { passive: true });
      return () => {
        gsap.ticker.remove(syncConnections);
        textCleanups.forEach((cleanup) => cleanup());
        art.removeEventListener("pointermove", move);
        art.removeEventListener("pointerleave", reset);
        window.removeEventListener("scroll", reset);
      };
    });
    return () => media.revert();
  }, []);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => {
      const scope = root.current;
      const tiles = [...scope.querySelectorAll(".story-tile")];
      const wires = [...scope.querySelectorAll(".story-wire")];
      const panels = [...scope.querySelectorAll(".story-copy")];
      const points = layouts[0].map((p) => ({ ...p }));
      const paint = () => {
        points.forEach((p, i) => {
          const tile = tiles[i];
          tile.setAttribute("x", p.x - p.size / 2);
          tile.setAttribute("y", p.y - p.size / 2);
          tile.setAttribute("width", p.size);
          tile.setAttribute("height", p.size);
          tile.setAttribute("rx", p.radius);
        });
        links.forEach(([a,b],i) => {
          wires[i].setAttribute("x1", points[a].x); wires[i].setAttribute("y1", points[a].y);
          wires[i].setAttribute("x2", points[b].x); wires[i].setAttribute("y2", points[b].y);
        });
      };
      if (conditions.reduced) {
        points.forEach((p,i) => Object.assign(p, layouts[3][i])); paint();
        gsap.set(panels, { autoAlpha: 0 }); gsap.set(panels[3], { autoAlpha: 1 });
        gsap.set(scope.querySelector('.story-check'), { opacity: 1 });
        return;
      }
      paint();
      const sequence = gsap.timeline({ scrollTrigger: { trigger: scope, start: "top top", end: "bottom bottom", scrub: 0.5, invalidateOnRefresh: true }, onUpdate: paint });
      sequence.to({}, { duration: 0.35 });
      for (let scene = 1; scene < 4; scene++) {
        const at = (scene - 1) * 1.6 + 0.35;
        sequence.to(panels[scene - 1], { autoAlpha: 0, y: -30, duration: 0.35, ease: "none" }, at);
        sequence.fromTo(panels[scene], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "none" }, at);
        points.forEach((point, i) => sequence.to(point, { ...layouts[scene][i], duration: 0.95, ease: "power2.inOut" }, at + i * 0.018));
        sequence.to(wires, { opacity: scene === 1 ? 0.5 : 0, duration: 0.5 }, at + 0.3);
        sequence.to(scope.querySelector('.story-shield'), { opacity: scene === 2 ? 1 : 0, duration: 0.5 }, at + 0.55);
        sequence.to(scope.querySelector('.story-check'), { opacity: scene === 3 ? 1 : 0, duration: 0.5 }, at + 0.65);
      }
      sequence.to({}, { duration: 0.55 });
      sequence.fromTo(scope.querySelector('.story-progress'), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: sequence.duration() }, 0);
      sequence.scrollTrigger.refresh();
      sequence.progress(sequence.scrollTrigger.progress);
      paint();
    });
    return () => media.revert();
  }, []);
  return (
    <section ref={root} className="scroll-story" aria-label="How I work">
      <div className="story-stage">
        <div className="story-layout">
          <div className="story-words">
            {chapters.map(([eyebrow, title, description], i) => (
              <div key={title} className={`story-copy ${i ? "story-hidden" : ""}`}>
                <p className="text-[#67DDB5] text-xs sm:text-sm tracking-[0.18em] mb-4">{eyebrow}</p>
                <h1 className="story-title" aria-label={title}><span aria-hidden="true"><span className="story-pronoun story-letter">I</span>{" "}<span>{[...title.slice(2)].map((letter, n) => <span key={n} className="story-letter">{letter}</span>)}</span></span></h1>
                <p className="story-description">{description}</p>
              </div>
            ))}
          </div>
          <svg className="story-art" viewBox="0 0 500 500" aria-hidden="true">
            <defs><radialGradient id="story-halo"><stop stopColor="#67DDB5" stopOpacity=".14"/><stop offset="1" stopColor="#67DDB5" stopOpacity="0"/></radialGradient></defs>
            <circle cx="250" cy="250" r="245" fill="url(#story-halo)" />
            {links.map(([a,b],i) => <line key={i} className="story-wire" x1={layouts[0][a].x} y1={layouts[0][a].y} x2={layouts[0][b].x} y2={layouts[0][b].y} stroke="#67DDB5" strokeWidth="2" opacity="0" />)}
            <path className="story-shield" d="M100 100L250 60 400 100C415 250 370 330 250 415C130 330 85 250 100 100Z" fill="#67DDB509" stroke="#67DDB5" strokeWidth="2" opacity="0" />
            {layouts[0].map((p,i) => <rect key={i} className="story-tile" x={p.x-p.size/2} y={p.y-p.size/2} width={p.size} height={p.size} rx={p.radius} fill={i % 5 === 0 ? '#F2B66D' : i % 3 === 0 ? '#F2F5F0' : '#67DDB5'} />)}
            <path className="story-check" d="M165 250L225 310 340 185" fill="none" stroke="#67DDB5" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
          </svg>
        </div>
        <div className="story-footer"><span>Scroll to explore ↓</span><a href="#about" className="text-[#67DDB5] underline underline-offset-4">Meet Azhar ↗</a></div>
        <div className="story-progress" aria-hidden="true" />
      </div>
    </section>
  );
}
