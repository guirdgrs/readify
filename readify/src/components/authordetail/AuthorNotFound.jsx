import { motion } from "framer-motion";
import { PenOff } from "lucide-react";
import { loadingScale, loadingShow } from "../utils/motionConfig";

const BookNotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[300px] text-center text-violet-700"
      {...loadingShow}>

      <PenOff size={64} className="mb-4 text-violet-500" />
      <motion.h2
        className="text-2xl font-bold mb-2"
        {...loadingScale}>

        Author not found
      </motion.h2>
      <p className="text-md text-violet-600">
        Sorry! We couldn't find the author you were looking for.
      </p>
    </motion.div>
  );
};

export default BookNotFound;
