import { motion } from "framer-motion";
import { loadingIcon, loadingScale, loadingShow } from "./motionConfig.js";

const BookLoading = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[400px] text-violet-700"
      {...loadingShow}
    >
      <motion.div
        className="w-16 h-16 border-4 border-violet-400 border-t-transparent rounded-full animate-spin mb-4"
        {...loadingIcon}
      />

      <motion.p className="text-lg font-semibold text-center" {...loadingScale}>
        Loading...
      </motion.p>
    </motion.div>
  );
};

export default BookLoading;
