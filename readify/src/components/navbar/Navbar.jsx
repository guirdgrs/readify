import { useEffect, useRef, useState } from "react";
import { BookOpenText, User, AlignJustify, Bookmark } from "lucide-react";
import {motion, AnimatePresence, animate} from "framer-motion";
import NavbarItem from "./NavbarItem";

function Navbar (){

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
        setDropdownOpen(!dropdownOpen);
    };

    // Function to close the dropdown menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the clicked element is outside the dropdown menu and if the button is clicked
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target)&& 

                buttonRef.current && 
                !buttonRef.current.contains(event.target)
            ){
                // Close the dropdown menu
                setDropdownOpen(false);
            }

            // Same but for the login dropdown
            if (
                loginRef.current &&
                !loginRef.current.contains(event.target) &&

                loginButtonRef.current &&
                !loginButtonRef.current.contains(event.target)
            ){
                setDropdownLogin(false);
            }
        };

    // Add event listener to the document to detect clicks outside the dropdown
     document.addEventListener("mousedown", handleClickOutside);
     return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    return (
        <motion.nav 
        className="bg-violet-500 shadow-md px-6 py-4 flex justify-between top-0 z-50 relative"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1}}>

            <div className="text-pink-300 flex items-center gap-4">
                {/* Logo */}
                <motion.a 
                href="#start"
                className="hover:text-pink-400"
                whileHover={{scale: 1.1}}
                transition={{type: "spring", stiffness: 300}}>
                    <BookOpenText size={40}/>
                </motion.a>

                {/* Button to toggle dropdown */}
                <motion.button 
                ref={buttonRef}
                onClick={toggleDropdown}
                className="hover:text-pink-400"
                whileHover={{scale: 1.3}}
                transition={{type: "spring", stiffness: 300}}>
                    <AlignJustify/>
                </motion.button>
            </div>

            {/* Title */}
            <motion.p 
                className="text-bold text-3xl text-pink-300 select-none font-black">
                    Readify
                </motion.p>

            {/* Your profile button */}
            <div className="hidden md:flex space-x-6 items-center">
                <motion.button 
                ref={loginButtonRef}
                onClick={() => setDropdownLogin(prev => !prev)}
                className="text-pink-300 hover:text-pink-400 border-2 rounded-md py-2 px-2"
                whileHover={{scale: 1.1}}
                transition={{type: "spring", stiffness: 300}}>
                    <User size={20}/>
                </motion.button>
            </div>

            {/* Animated dropown menu */}
            <AnimatePresence>
                {dropdownOpen && (
                    // motion.div is used to animate the dropdown menu
                    <motion.div
                        ref={dropdownRef}
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.2}}
                        className="absolute top-20 left-6 bg-violet-300 text-purple-800 rounded-md p-4 px-8 flex flex-col divide-y divide-violet-400 gap-2">

                        {/* Dropdown items */}
                        <NavbarItem label="Book" href="#books" onClick={() => setDropdownOpen(false)}/>

                        <NavbarItem label="Favorites" href="#favorites" onClick={() => setDropdownOpen(false)}/>

                        <NavbarItem label="About" href="#about" onClick={() => setDropdownOpen(false)}/>

                    </motion.div>
                )}

                {/* Dropdown login menu */}
                {dropdownLogin && (
                    <motion.div
                        ref={loginRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 right-6 bg-violet-300 rounded-md p-4 px-8 w-64 flex flex-col gap-4 z-50">

                        <div className="flex justify-center text-violet-600">
                            <User size={30} />
                        </div>

                        <motion.input
                            type="email"
                            placeholder="Email"
                            className="border p-2 rounded-md border-violet-600 outline-pink-600 bg-violet-200"
                            whileHover={{scale: 1.05}}
                            transition={{type: "spring", stiffness: 300}}/>
                        <motion.input
                            type="password"
                            placeholder="Password"
                            className="border p-2 rounded-md border-violet-600 outline-pink-600 bg-violet-200"
                            whileHover={{scale: 1.05}}
                            transition={{type: "spring", stiffness: 300}}/>
                        <motion.button
                            onClick={() => {
                            setDropdownLogin(false);}}
                            className="bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600"
                            whileHover={{scale: 1.05}}
                            transition={{type: "spring", stiffness: 300}}>
                                Login
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;