import { BrowserRouter } from "react-router-dom";

import { lazy } from "react";
import useSectionNavigation from "./utils/useSectionNavigation";
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
  useSectionNavigation();
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
