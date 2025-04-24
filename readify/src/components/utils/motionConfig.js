// This file contains the motion configuration for the navbar component using Framer Motion.

// Hover effect
export const hoverSpring = {
    whileHover: { scale: 1.1 },
    transition: { type: "spring", stiffness: 300 },
  };
  
// Fade in effect
  export const fadeSlide = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  };

  export const fadeSlideUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.6 },
  };


  