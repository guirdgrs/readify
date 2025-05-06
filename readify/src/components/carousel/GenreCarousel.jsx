import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { hoverSpring2, fadeSlide, fadeSlideUp, showCarousel } from "../utils/motionConfig.js";
import { Link } from "react-router-dom";
import '../../App.css';

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

function GenreCarousel() {
  const carouselRef = useRef(null);

  const scroll = (direction) => {

    const container = carouselRef.current;

    if (container) {
      const scrollAmount = 300;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      let newScrollX = direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      if (newScrollX < 0) newScrollX = maxScrollLeft;
      else if (newScrollX > maxScrollLeft) newScrollX = 0;

      container.scrollTo({ left: newScrollX, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => scroll("right"), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="relative my-8 bg-violet-300 border-violet-200 rounded-2xl shadow-md p-4 w-full max-w-5xl mx-auto px-2 pt-10"
        {...fadeSlideUp}>

        <h2 
        className="text-2xl font-bold text-violet-700 mb-4 capitalize text-center">
          Explore by Genres

          <hr 
          className="mt-5" />
        </h2>

        <div 
        className="flex items-center gap-2">

          <button
            onClick={() => scroll("left")}
            className="p-2 text-violet-600 hover:text-violet-800 cursor-pointer">
              <ChevronLeft />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto overflow-y-hidden gap-4 px-2 py-6 scrollbar-custom"
            {...fadeSlide}>

            {genres.map((genre) => (
              <Link
                key={genre.name}
                to={`/genredetail/${encodeURIComponent(genre.name)}`}>
                    
                <motion.div
                  className="w-[150px] sm:w-[120px] md:w-[150px] flex-shrink-0 bg-violet-100 rounded-lg shadow-md p-2 text-center"
                  {...hoverSpring2}
                  {...showCarousel}>

                  <img
                    src={genre.image}
                    alt={genre.name}
                    className="rounded-md mb-2 w-full h-[200px] sm:h-[220px] object-cover shadow-violet-600 shadow-lg"/>

                  <p 
                  className="text-md text-violet-800 font-medium line-clamp-2">
                    {genre.name}
                  </p>

                </motion.div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="p-2 text-violet-600 hover:text-violet-800 cursor-pointer">
              <ChevronRight />
          </button>
          
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default GenreCarousel;
