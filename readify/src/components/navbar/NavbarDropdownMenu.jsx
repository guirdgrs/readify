import { motion } from "framer-motion";
import NavbarItem from "./NavbarItem";
import { fadeSlide } from "../utils/motionConfig";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

function NavbarDropdownMenu({ dropdownRef, onClose }) {
  return (
    <motion.div
      ref={dropdownRef}
      className="absolute top-20 left-6 bg-violet-300 text-purple-800 rounded-md p-4 px-8 flex flex-col gap-2 text-center"
      {...fadeSlide}>

      <div className="flex justify-center text-violet-600">
        <Book size={30} />  
      </div>

      <Link to="/most-popular" onClick={onClose}>
        <NavbarItem label="Most popular"/>
      </Link>

      <Link to="/authors" onClick={onClose}>
        <NavbarItem label="Authors"/>
      </Link>

      <Link to="/genres" onClick={onClose}>
        <NavbarItem label="Genre"/>
      </Link>

      <Link to="/favorites" onClick={onClose}>
        <NavbarItem label="Favorites"/>
      </Link>

      <Link to="/about" onClick={onClose}>
        <NavbarItem label="About"/>
      </Link>
      
    </motion.div>
  );
}

export default NavbarDropdownMenu;
