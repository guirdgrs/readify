import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { fadeSlide   } from "./motionConfig";

function BackButton({dropdownOpen}) {
  // Hook to programmatically navigate
  const navigate = useNavigate();
  // State to control the opacity of the button on navigate
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
    //When the user scrolls, update the opacity of the button
      const newOpacity = Math.max(1 - scrollTop / 600, 0.3); // Set the minimum opacity to 30%
      setOpacity(newOpacity);
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // function to navigate to the previous page
      onClick={() => navigate(-1)}
      className="fixed left-6 bottom-110 flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full shadow-lg z-50 cursor-pointer"
      style={{
        opacity: dropdownOpen ? 0 : opacity,
        pointerEvents: dropdownOpen ? "none" : "auto",
        zIndex: 40,
      }}>
      <ArrowLeft size={20} />
    </motion.button>
  );
}

export default BackButton;