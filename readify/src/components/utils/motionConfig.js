// This file contains the motion configuration for the navbar component using Framer Motion.
export const hoverSpring = {
    whileHover: { scale: 1.1 },
    transition: { type: "spring", stiffness: 300 },
  };

export const hoverSpring2 = {
    whileHover: { scale: 1.05 },
    transition: { type: "spring", stiffness: 300 },
  };
  
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

  export const showCarousel = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.10 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  export const loadingIcon = {
    animate:{ rotate: 360 },
    transition:{ repeat: Infinity, duration: 1, ease: "linear" },
  }

  export const loadingShow = {
    initial:{ opacity: 0, y: 20 },
    animate:{ opacity: 1, y: 0 },
    transition:{ duration: 0.6 },
  }

  export const loadingScale ={
    animate:{scale: [1, 1.05, 1] },
    transition:{duration: 1.5, repeat: Infinity },
  }
  