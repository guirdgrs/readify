import {motion, AnimatePresence} from "framer-motion";
import { hoverSpring2 } from "../utils/motionConfig";

// NavbarItem component to create a reusable navbar item
// This component is used to create each item in the navbar with hover effects
function NavbarItem ({label, className = "", onClick}){
    // The props are: label, href, className, and onClick
    return (
        <motion.div
        onClick={onClick}
        className={`hover:text-violet-600 bg-violet-200 border border-violet-400 rounded-md px-3 py-2 transition-colors ${className}`}
        {...hoverSpring2}>
        {label}
        </motion.div> 
    );
}
export default NavbarItem;