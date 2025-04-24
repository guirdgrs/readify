import { useState } from "react";
import { BookOpenText, User, AlignJustify } from "lucide-react";

function Navbar (){

    // State to manage the dropdown menu
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Function to toggle the dropdown menu
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    
    return (
        <nav 
        className="bg-violet-500 shadow-md px-6 py-4 flex justify-between sticky top-0 z-50">

            <div className="text-pink-300 hover:text-pink-400 flex items-center gap-3">
                <a href="#start"><BookOpenText size={40}/></a>
                <button onClick={toggleDropdown}>
                    <AlignJustify/>
                </button>
            </div>

            <div className="hidden md:flex space-x-6 items-center">
                <a href="#books" className="text-pink-300 hover:text-pink-400">
                    Books
                </a>
                <a href="#favorites" className="text-pink-300 hover:text-pink-400">
                    Favorites
                </a>
                <a href="#profile" className="text-pink-300 hover:text-pink-400 border-2 rounded-md py-2 px-2">
                    <User />
                </a>
            </div>

            {dropdownOpen && (
                <div className="absolute top-20 left-6 bg-white text-gray-700 shadow-md rounded-md p-4 flex flex-col gap-2 md:hidden z-50">
                    <a href="#books" className="hover:text-violet-600">
                        Books</a>
                    <a href="#favorites" className="hover:text-violet-600">
                        Favorites</a>
                    <a href="#profile" className="hover:text-violet-600">
                        Profile</a>
                </div>
                )}
        </nav>
    );
};

export default Navbar;