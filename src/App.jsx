import { BrowserRouter } from "react-router-dom";

import { lazy, useLayoutEffect } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tech from "./components/Tech";
import Works from "./components/Works";
import DeferredScene from "./components/DeferredScene";
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const App = () => {
  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash !== "#about" && hash !== "#work") return;
    // On a direct visit the browser can look for the fragment before React mounts.
    const frame = requestAnimationFrame(() => {
      if (window.location.hash === hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        {/* <Feedbacks /> */}
        <div className='relative z-0'>
          <Contact />
          <DeferredScene className="absolute inset-0 z-[-1]"><StarsCanvas /></DeferredScene>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
