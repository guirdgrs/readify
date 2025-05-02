import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import BackButton from "../utils/BackButton";
import { motion } from "framer-motion";
import { fadeSlideUp } from "../utils/motionConfig";

const genres = [
    { name: "Fantasy", image: "https://placehold.co/200x300?text=Fantasy" },
    { name: "Science Fiction", image: "https://placehold.co/200x300?text=Sci-Fi" },
    { name: "Mystery", image: "https://placehold.co/200x300?text=Mystery" },
    { name: "Romance", image: "https://placehold.co/200x300?text=Romance" },
    { name: "Horror", image: "https://placehold.co/200x300?text=Horror" },
    { name: "History", image: "https://placehold.co/200x300?text=History" },
    { name: "Adventure", image: "https://placehold.co/200x300?text=Adventure" },
    { name: "Poetry", image: "https://placehold.co/200x300?text=Poetry" },
    { name: "Drama", image: "https://placehold.co/200x300?text=Drama" },
    { name: "Thriller", image: "https://placehold.co/200x300?text=Thriller" },
    { name: "Humor", image: "https://placehold.co/200x300?text=Humor" },
  ];

function Genres() {
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
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              to={`/genredetail/${encodeURIComponent(genre.name)}`}
              className="bg-violet-200 hover:bg-violet-300 rounded-lg shadow-lg p-4 text-center transition duration-200">

              <img
                src={genre.image}
                alt={genre.name}
                className="w-full h-48 object-cover rounded mb-3"/>

              <h2 
              className="text-lg font-semibold text-violet-800">
                {genre.name}
             </h2>

            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Genres;
