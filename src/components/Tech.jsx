import React, { useEffect, useState } from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";


const Tech = () => {
  // console.log(technologies.slice(0, Math.floor(technologies.length/2 -1)))
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      { isMobile ? (technologies.slice(0, 2)).map((technology) => (
        TheTechBalls(technology)
      )) : technologies.map(technology => (TheTechBalls(technology)))}
    </div>
  );
};

const TheTechBalls = technology => {
  return (
  <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
  </div>)
}

export default SectionWrapper(Tech, "");
