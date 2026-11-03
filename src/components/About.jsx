import AnimatedHeading from "./AnimatedHeading";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => {
  const card = useRef();
  const surface = useRef();
  const glow = useRef();
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(card.current, {
        y: 46, opacity: 0, duration: 0.8,
        delay: window.matchMedia("(min-width: 1024px)").matches ? index * 0.12 : 0,
        ease: "power3.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: card.current, start: "top 92%", once: true },
      });
    });
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const element = surface.current;
      const rotateX = gsap.quickTo(element, "rotationX", { duration: 0.45, ease: "power3.out" });
      const rotateY = gsap.quickTo(element, "rotationY", { duration: 0.45, ease: "power3.out" });
      const lift = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3.out" });
      const light = gsap.quickTo(glow.current, "opacity", { duration: 0.35 });
      const move = (event) => {
        const rect = card.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        rotateX((0.5 - y) * 9);
        rotateY((x - 0.5) * 9);
        lift(-6);
        light(1);
        glow.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, #67DDB52E, transparent 65%)`;
      };
      const leave = () => { rotateX(0); rotateY(0); lift(0); light(0); };
      card.current.addEventListener("pointermove", move);
      card.current.addEventListener("pointerleave", leave);
      const target = card.current;
      return () => {
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerleave", leave);
      };
    });
    return () => media.revert();
  }, [index]);
  return (
    <div ref={card} className="xs:w-[250px] w-full" style={{ perspective: "850px" }}>
      <div ref={surface} className="relative w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card overflow-hidden">
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <img loading="lazy" decoding="async" src={icon} alt="" className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
        </div>
        <div ref={glow} aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-0 rounded-[20px]" />
      </div>
    </div>
  );
};

const About = () => {
  return (
    <>
      <div>
        <p className={styles.sectionSubText}>Introduction</p>
        <AnimatedHeading variant="overview">Overview.</AnimatedHeading>
      </div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I’m a software engineer building reliable web experiences and AI tools that help engineers work more effectively. My work spans product development, performance, security and technical leadership. I deliver features, investigate production issues and build tools for AI-assisted development and testing. I enjoy taking projects from idea to delivery, bringing teams together and helping other engineers grow.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
