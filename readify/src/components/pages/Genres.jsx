import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import BackButton from "../utils/BackButton";
import { motion } from "framer-motion";
import { backgroundModal, fadeOutModal, fadeSlideUp, hoverSpring2 } from "../utils/motionConfig";
import { useState } from "react";
import { X } from "lucide-react";

const genres = [
    "Fantasy", "Science Fiction", "Mystery", "Romance", "Horror", "Thriller", "Dystopian", "Biography", "Classic Literature", "Historical Fiction", "Poetry", "Self-Help"
  ];

  const extraGenres = [
    "Philosophy", "Art", "Cooking", "Travel", "Health", "Biography", "Sports", "Religion", "Politics", "Young Adult", "Crime", "Fiction"
  ];

function Genres() {

    const [showModal, setShowModal] = useState(false);

    const handleBackdropClick = (e) => {
        if (e.target.id === "modal-backdrop") {
          setShowModal(false);
        }
      };

  return (
    <div>

      <Navbar />
      <BackButton />

      <motion.div 
      className="max-w-7xl mx-auto p-6 mt-20 text-center" 
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

    </div>
  );
}

export default Genres;
