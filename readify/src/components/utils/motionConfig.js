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

  export const fadeSlideDown = {
    initial : { opacity: 0, y: -20 },
    animate : { opacity: 1, y: 0 },
    exit : { opacity: 0, y: 20 },
    transition : { duration: 0.4 },
  }

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

  export const loadingScale = {
    animate:{scale: [1, 1.05, 1] },
    transition:{duration: 1.5, repeat: Infinity },
  }

  export const showFeedback = {
    initial:{opacity: 0, y: 20},
    animate:{opacity: 1, y: 0},
    exit:{opacity: 0, scale: 0.8, y: 50},
    transition:{duration: 0.4},
  }

  export const backgroundModal = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
  }

  export const fadeOutModal = {
    initial: {opacity: 1},
    animate: {opacity: 0},
    exit: {opacity: 0},
    transition: {duration: 1},
  }
  