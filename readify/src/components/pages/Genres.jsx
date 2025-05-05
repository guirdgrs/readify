import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import BackButton from "../utils/BackButton";
import { AnimatePresence, motion } from "framer-motion";
import { backgroundModal, fadeOutModal, fadeSlideUp, hoverSpring2 } from "../utils/motionConfig";
import { useState, useEffect} from "react";
import { X, Search } from "lucide-react";
import Footer from "../utils/Footer";

const genres = [
    "Fantasy", "Science Fiction", "Mystery", "Romance", "Horror", "Thriller", "Dystopian", "Biography", "Classic Literature", "Historical Fiction", "Poetry", "Self-Help"
  ];

  const extraGenres = [
    "Philosophy", "Art", "Cooking", "Travel", "Health", "Biography", "Sports", "Religion", "Politics", "Young Adult", "Crime", "Fiction"
  ];

function Genres() {

    const [showModal, setShowModal] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    // State for filtered suggestions
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const navigate = useNavigate();


    const handleBackdropClick = (e) => {

        if (e.target.id === "modal-backdrop") {
          setShowModal(false);
        }
      };

    const handleSearchSubmit = () => {
        
        if (searchQuery.trim().length > 0) {
          navigate(`/genredetail/${encodeURIComponent(searchQuery.trim())}`);
          setShowModal(false);
          setSearchQuery("");
        }
    };

    // Function to handle keydown event on Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSearchSubmit();
        }
      };

      useEffect(() => {

        const delayDebounce = setTimeout(async () => {

          // If the search query is less than 3 characters, clear the filtered suggestions
          if (searchQuery.trim().length < 3) {
            setFilteredSuggestions([]);
            return;
          }
      
          try {
            // Fetch genres from the API
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(searchQuery)}&maxResults=10`
            );

            const data = await response.json();
      
            if (data.items) {
              const genresFromAPI = new Set();
      
              data.items.forEach((item) => {

                // Extract genres from the API response
                const categories = item.volumeInfo?.categories;

                if (categories && categories.length > 0) {
                  categories.forEach((category) => genresFromAPI.add(category));
                }
              });
      
              // Set the filtered suggestions state with the extracted genres
              setFilteredSuggestions(Array.from(genresFromAPI));
            } else {
              setFilteredSuggestions([]);
            }
          } catch {
            setFilteredSuggestions([]);
          }
        }, 200);
      
        return () => clearTimeout(delayDebounce);
      }, [searchQuery]);
      

  return (
    <div>

      <Navbar />
      <BackButton />

      <motion.div 
      className="max-w-7xl mx-auto p-6 mt-25 text-center" 
      {...fadeSlideUp}>

        <h1 
        className="text-4xl font-bold text-violet-700 mb-8 text-center">
          Explore Genres
        </h1>

        <hr 
        className="border-t-2 border-violet-300 mb-8"/>

        <div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {genres.map((genre) => (
            <Link
              key={genre}
              to={`/genredetail/${encodeURIComponent(genre)}`}
              className="bg-violet-200 hover:bg-violet-300 rounded-lg shadow-lg p-4 text-center transition duration-200">

              <h2 
              className="text-lg font-semibold text-violet-800">
                {genre}
             </h2>

            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8">

          <motion.button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 cursor-pointer mt-10"
            {...hoverSpring2}>
                More Genres...
          </motion.button>

        </div>

      </motion.div>

      <AnimatePresence>
      {showModal && (
        <motion.div 
        id="modal-backdrop"
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4"
        {...backgroundModal}>

          <motion.div 
          className="bg-white rounded-lg p-6 w-full max-w-lg relative"
          {...fadeSlideUp }>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-red-500 hover:bg-red-200 border-md rounded-md cursor-pointer py-2 px-2"
              {...fadeOutModal}>
                <X size={24} />
            </button>

            <h2 
            className="text-2xl font-bold text-violet-700 mb-4 text-center">
              Other Genres
            </h2>

            <div className="relative mb-6">
                <div className="flex items-center gap-2">

                    <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search genre..."
                    className="w-full border border-violet-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"/>

                    <motion.button
                    onClick={handleSearchSubmit}
                    className="bg-violet-600 hover:bg-violet-700 text-white p-2 rounded cursor-pointer"
                    {...hoverSpring2}>
                        <Search size={20} />
                    </motion.button>
                    
                </div>

            {filteredSuggestions.length > 0 && (
                <ul className="absolute z-20 mt-1 w-full bg-white border border-violet-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredSuggestions.slice(0, 5).map((genre) => (
                    <li
                    key={genre}
                    onClick={() => {
                        navigate(`/genredetail/${encodeURIComponent(genre)}`);
                        setShowModal(false);
                        setSearchQuery("");
                    }}
                    className="px-4 py-2 text-violet-700 hover:bg-violet-300 cursor-pointer transition-colors duration-150 rounded-md">
                        {genre}
                    </li>
                ))}
                </ul>
            )}
            </div>

            <hr 
            className="border-t-2 border-violet-300 mb-8"/>

            <div 
            className="grid grid-cols-2 gap-4">
              {extraGenres.map((genre) => (

                <Link
                  key={genre}
                  to={`/genredetail/${encodeURIComponent(genre)}`}
                  onClick={() => setShowModal(false)}
                  className="bg-violet-100 hover:bg-violet-200 p-3 rounded text-center font-medium text-violet-800 transition">
                    {genre}
                </Link>

              ))}
            </div>

          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <Footer />

    </div>
  );
}

export default Genres;
