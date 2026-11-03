import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen min-h-[720px] mx-auto`}>
      <div
        className={`absolute z-10 pointer-events-none inset-x-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#67DDB5]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#67DDB5]'>Azhar</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I build secure software and AI tools, <br className='sm:block hidden'/> and lead ideas from prototype to production.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[340px] bottom-[120px] sm:top-[320px]" aria-label="Interactive neural network">
        <ComputersCanvas />
      </div>

      <div className='absolute bottom-10 w-full flex justify-center items-center'>
        
        <a href='#about' aria-label='Scroll to overview'>
          
          <div className='h-[48px] w-[28px] rounded-full border-2 border-secondary flex justify-center items-start p-1.5'>
            <motion.div
              animate={{
                y: [0, 18, 0],
                
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-1.5 h-1.5 rounded-full bg-secondary'
            />
          </div>
        </a>
        
      </div>
    </section>
  );
};

export default Hero;
