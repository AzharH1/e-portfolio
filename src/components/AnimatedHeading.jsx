import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHeading({ children, variant, className = "", as: Tag = "h2" }) {
  const root = useRef();
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const letters = root.current.querySelectorAll('.section-letter');
      const entrance = {
        overview: { y: 10, rotation: 5, stagger: 0.045 },
        experience: { x: -12, stagger: 0.025 },
        projects: { scale: 0.9, rotation: -8, stagger: 0.04 },
        contact: { y: 12, stagger: { each: 0.06, from: 'center' } },
      }[variant];
      gsap.from(letters, {
        ...entrance, immediateRender: false, duration: 0.65, ease: 'power3.out', clearProps: 'all',
        scrollTrigger: { trigger: root.current, start: 'top 90%', once: true },
      });
    });
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const heading = root.current;
      const letters = heading.querySelectorAll('.section-letter');
      const hover = gsap.timeline({ paused: true });
      if (variant === 'overview') {
        hover.to(letters, { y: -5, color: '#67DDB5', stagger: 0.035, duration: 0.25 });
      } else if (variant === 'experience') {
        hover.to(letters, { color: '#F2B66D', stagger: 0.045, duration: 0.15 });
      } else if (variant === 'projects') {
        hover.to(letters, { rotation: (i) => i % 2 ? 5 : -5, y: -3, duration: 0.3, stagger: 0.025 });
      } else {
        hover.to(letters, { scale: 1.06, color: '#67DDB5', stagger: { each: 0.035, from: 'center' }, duration: 0.3 });
      }
      const enter = () => hover.play();
      const leave = () => hover.reverse();
      heading.addEventListener('pointerenter', enter);
      heading.addEventListener('pointerleave', leave);
      return () => { heading.removeEventListener('pointerenter', enter); heading.removeEventListener('pointerleave', leave); };
    });
    return () => media.revert();
  }, [variant]);
  return <Tag ref={root} aria-label={children} className={`${styles.sectionHeadText} ${className}`}>
    <span aria-hidden="true">{children.split(' ').map((word, index) => <span key={index} className="inline-block whitespace-nowrap">{index > 0 && '\u00a0'}{[...word].map((letter, i) => <span key={i} className="section-letter inline-block">{letter}</span>)}</span>)}</span>
  </Tag>;
}
