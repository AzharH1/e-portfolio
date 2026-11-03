import AnimatedHeading from "./AnimatedHeading";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const card = useRef();
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const root = card.current;
      gsap.from(root, {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: root, start: "top 92%", once: true },
      });
      const image = root.querySelector(".project-image");
      const zoom = gsap.quickTo(image, "scale", { duration: 0.55, ease: "power2.out" });
      const enter = () => zoom(1.06);
      const leave = () => zoom(1);
      const pointer = (event) => { if (event.pointerType === "mouse") enter(); };
      root.addEventListener("pointerenter", pointer);
      root.addEventListener("pointerleave", leave);
      root.addEventListener("focusin", enter);
      root.addEventListener("focusout", leave);
      return () => {
        root.removeEventListener("pointerenter", pointer);
        root.removeEventListener("pointerleave", leave);
        root.removeEventListener("focusin", enter);
        root.removeEventListener("focusout", leave);
      };
    });
    return () => media.revert();
  }, []);
  return (
    <div ref={card} className="sm:w-[360px] w-full">
      <div
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px] overflow-hidden rounded-2xl'>
          <img
            src={image}
            alt={`${name} project preview`}
            className='project-image w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <a
              href={source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${name} source code`}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#67DDB5]'
            >
              <img
                src={github}
                alt=''
                className='w-1/2 h-1/2 object-contain'
              />
            </a>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  return (
    <>
      <div>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <AnimatedHeading variant="projects">Projects.</AnimatedHeading>
      </div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          The projects presented below highlight my proficiency and practical experience in various aspects of software development. Each project includes a concise description, as well as links to code repositories and live demonstrations. These projects demonstrate my capacity to tackle intricate challenges, utilize diverse technologies, and successfully manage projects from inception to completion.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
