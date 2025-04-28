import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

function BackButton() {
  // State to control the opacity of the button on navigate
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
    //When the user scrolls, update the opacity of the button
      const newOpacity = Math.max(1 - scrollTop / 600, 0.3);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(-1)}
      className="fixed left-6 bottom-110 flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full shadow-lg z-50"
      style={{ opacity }}>
      <ArrowLeft size={20} />
    </motion.button>
  );
}

export default BackButton;