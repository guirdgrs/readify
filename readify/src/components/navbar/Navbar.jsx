import { useEffect, useRef, useState } from "react";
import { BookOpenText, User, AlignJustify, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeSlide, hoverSpring } from "../utils/motionConfig.js";
import NavbarItem from "./NavbarItem";
import NavbarDropdownMenu from "./NavbarDropdownMenu";
import NavbarDropdownLogin from "./NavbarDropdownLogin";
import {Link} from "react-router-dom";

function Navbar() {
  // DROPDOWN LEFT MENU
  // State to manage the dropdown menu
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Ref to keep track of the dropdown menu element
  const dropdownRef = useRef(null);
  // Ref to keep track of the button element
  const buttonRef = useRef(null);

  // DROPDOWN LOGIN MENU
  const [dropdownLogin, setDropdownLogin] = useState(false);
  const loginRef = useRef(null);
  const loginButtonRef = useRef(null);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    // Toggle the dropdown menu by setting its state
    setDropdownOpen(!dropdownOpen);
  };

  // Function to close the dropdown menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the dropdown menu and if the button is clicked
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&

        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        // Close the dropdown menu
        setDropdownOpen(false);
      }

      // Same but for the login dropdown
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target) &&
        
        loginButtonRef.current &&
        !loginButtonRef.current.contains(event.target)
      ) {
        setDropdownLogin(false);
      }
    };

    // Add event listener to the document to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      className="bg-violet-500 shadow-md px-6 py-4 flex justify-between fixed top-0 left-0 right-0 z-50"
      {...fadeSlide}>

      <div 
      className="text-pink-300 flex items-center gap-4">
        {/* Logo */}
        <Link 
        to ="/">

        <motion.div
          className="hover:text-pink-400 cursor-pointer"
          {...hoverSpring}>

          <BookOpenText 
          size={40}/>

        </motion.div>
        </Link>

        {/* Button to toggle dropdown */}
        <motion.button
          ref={buttonRef}
          onClick={toggleDropdown}
          className="hover:text-pink-400 cursor-pointer"
          {...hoverSpring}>
            <AlignJustify />
        </motion.button>

      </div>

      <div 
      className="flex items-center gap-4 text-center mr-7">
        {/* Title */}
        <Link 
        to="/">

        <motion.p 
        className="text-bold text-3xl text-pink-300 select-none font-black">
          Readify
        </motion.p>

        </Link>
      </div>

      {/* Your profile button */}
      <div 
      className="hidden md:flex space-x-6 items-center">

        <motion.button
          ref={loginButtonRef}
          onClick={() => setDropdownLogin((prev) => !prev)}
          className="text-pink-300 hover:text-pink-400 border-2 rounded-md py-2 px-2"
          {...hoverSpring}>
            <User 
            size={20}/>
        </motion.button>
        
      </div>

      {/* Animated dropown menu */}
      <AnimatePresence>
        {dropdownOpen && (
          <NavbarDropdownMenu
            dropdownRef={dropdownRef}
            onClose={() => setDropdownOpen(false)}/>
        )}

        {/* Dropdown login menu */}
        {dropdownLogin && (
          <NavbarDropdownLogin
            loginRef={loginRef}
            onClose={() => setDropdownLogin(false)}/>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
