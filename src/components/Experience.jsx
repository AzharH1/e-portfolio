import AnimatedHeading from "./AnimatedHeading";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      visible
      contentStyle={{
        background: "#152126",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #263D39" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img loading="lazy" decoding="async"
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      {experience.description && (
        <p className='text-white-100 text-[14px] tracking-wider'>
          {experience.description}
        </p>
      )}

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const timelineRoot = useRef();
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      wide: "(min-width: 1170px)",
    }, ({ conditions }) => {
      if (!conditions.motion) return;
      const timeline = timelineRoot.current.querySelector(".vertical-timeline");
      gsap.fromTo(timeline, { "--line-progress": 0 }, {
        "--line-progress": 1, ease: "none",
        scrollTrigger: { trigger: timeline, start: "top 65%", end: "bottom 65%", scrub: true, invalidateOnRefresh: true },
      });
      timeline.querySelectorAll(".vertical-timeline-element").forEach((element, index) => {
        const card = element.querySelector(".vertical-timeline-element-content");
        gsap.from(card, {
          x: conditions.wide ? (index % 2 === 0 ? -64 : 64) : 24,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      timeline.querySelectorAll(".vertical-timeline-element-icon").forEach((icon) => {
        gsap.fromTo(icon, { boxShadow: "0 0 0 4px #354A44" }, {
          boxShadow: "0 0 0 4px #67DDB5, 0 0 24px #67DDB540", duration: 0.35,
          scrollTrigger: { trigger: icon, start: "top 65%", toggleActions: "play none none reverse" },
        });
      });
    });
    return () => media.revert();
  }, []);
  return (
    <>
      <div>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <AnimatedHeading variant="experience" className="text-center">Work Experience.</AnimatedHeading>
      </div>

      <div ref={timelineRoot} className='experience-timeline mt-8 min-[1170px]:mt-20 flex flex-col'>
        <VerticalTimeline animate={false}>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
