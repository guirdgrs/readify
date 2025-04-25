import {motion, AnimatePresence} from "framer-motion";

// NavbarItem component to create a reusable navbar item
// This component is used to create each item in the navbar with hover effects
function NavbarItem ({label, href = "#", className = "", onClick}){
    // The props are: label, href, className, and onClick
    return(
        <motion.a 
        href={href}
        onClick={onClick}
        className={`hover:text-violet-600 bg-violet-200 border border-violet-400 rounded-md px-3 py-2 transition-colors ${className}`}
        whileHover={{scale: 1.15}}
        transition={{type: "spring", stiffness: 300}}>
        {label}
        </motion.a>
    );
}
export default NavbarItem;