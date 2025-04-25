import { motion } from "framer-motion";
import NavbarItem from "./NavbarItem";
import { fadeSlide } from "../utils/motionConfig";
import { Book } from "lucide-react";

function NavbarDropdownMenu({ dropdownRef, onClose }) {
  return (
    <motion.div
      ref={dropdownRef}
      className="absolute top-20 left-6 bg-violet-300 text-purple-800 rounded-md p-4 px-8 flex flex-col gap-2 text-center"
      {...fadeSlide}>

      <div className="flex justify-center text-violet-600">
        <Book size={30} />  
      </div>

      <NavbarItem label="Most popular" href="#most-popular" onClick={onClose} />
      <NavbarItem label="Authors" href="#authors" onClick={onClose} />
      <NavbarItem label="Genre" href="#genre" onClick={onClose} />
      <NavbarItem label="Favorites" href="#favorites" onClick={onClose} />
      <NavbarItem label="About" href="#about" onClick={onClose} />
      
    </motion.div>
  );
}

export default NavbarDropdownMenu;
