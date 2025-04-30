import { motion } from "framer-motion";
import { hoverSpring2 } from "./motionConfig";
import Loading from "./Loading";

const SeeMoreButton = ({ onClick, loading, className = "" }) => {
  return (
    <motion.button
      {...hoverSpring2}
      onClick={onClick}
      disabled={loading}
      className={`px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 cursor-pointer ${className}`}>

      {loading ? (
        <Loading/>
      ) : (
        "See More"
      )}
    </motion.button>
  );
};

export default SeeMoreButton;