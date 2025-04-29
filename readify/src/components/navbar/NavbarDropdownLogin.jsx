import { motion } from "framer-motion";
import { User } from "lucide-react";
import { fadeSlide, hoverSpring } from "../utils/motionConfig";

function NavbarDropdownLogin({ loginRef, onClose }) {
  return (
    <motion.div
      ref={loginRef}
      className="absolute top-20 right-6 bg-violet-300 rounded-md p-4 px-8 w-64 flex flex-col gap-4 z-50"
      {...fadeSlide}>

      <div 
      className="flex justify-center text-violet-600">
        <User 
        size={30}/>
      </div>

      <motion.input
        type="email"
        placeholder="Email"
        className="border p-2 rounded-md border-violet-600 outline-pink-600 bg-violet-200"
        {...hoverSpring}/>

      <motion.input
        type="password"
        placeholder="Password"
        className="border p-2 rounded-md border-violet-600 outline-pink-600 bg-violet-200"
        {...hoverSpring}/>

      <motion.button
        onClick={onClose}
        className="bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600"
        {...hoverSpring}>
        Login
      </motion.button>
    </motion.div>
  );
}

export default NavbarDropdownLogin;
