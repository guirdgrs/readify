import { use, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { hoverSpring, hoverSpring2, fadeSlide, fadeSlideUp, showCarousel} from "../utils/motionConfig.js";

function BookCarousel({ genre = "fiction" }) {
  // State to store the list of books
  const [books, setBooks] = useState([]);

  // State to manage loading state
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef(null); // Ref to the carousel container

  // Effect to fetch books from the Google Books API based on the genre
  useEffect(() => {
    // Function to fetch books from the API
    async function fetchBooks() {
      try {
        const response = await fetch(
          // q=subject:${genre}&maxResults=10 query parameter to filter books by genre and limit the number of results
          `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=20`
        );
        const data = await response.json(); // Parse the response as JSON

        // Format the book data to extract relevant information
        const formattedBooks =
          data.items?.map((item) => ({
            // Extracting the book ID, title, and cover image URL
            id: item.id,
            title: item.volumeInfo.title,
            cover:
              item.volumeInfo.imageLinks?.thumbnail ||
              "https://placehold.co/150x220?text=Sem+Capa", // Default cover image if not available
          })) || [];

        // Update the state with the formatted book data
        setBooks(formattedBooks);
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    }
    // Call the fetchBooks function to initiate the API request
    fetchBooks();
    // Dependency array to re-fetch books when the genre changes
  }, [genre]);

  //Effect to set up an interval for automatic scrolling
  useEffect(() => {
    if(!loading && carouselRef.current) {
        const interval = setInterval(() => {
            scroll("right");
        }, 5000); // Change the interval time as needed (5000ms = 5 seconds)
        return () => clearInterval(interval); // Cleanup the interval on component unmount
     }
    }, [loading]); // This effect sets up an interval to automatically scroll the carousel every 5 seconds

  //Function to handle scrolling the carousel left or right
  const scroll = (direction) => {
    // Get the carousel container element by its ID
    // The ID is dynamically generated based on the genre prop passed to the component
    const container = carouselRef.current;
    if (container) {
      // Calculate the scroll amount based on the direction
      const scrollAmount = 300;
      const maxScrollLeft = container.scrollWidth - container.clientWidth; // Maximum scrollable width
      let newScrollX =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

        // If the new scroll position exceeds the bounds, wrap around to the other side
          if (newScrollX < 0) {
            newScrollX = maxScrollLeft;
          } else if (newScrollX > maxScrollLeft) {
            newScrollX = 0;
          }
      container.scrollTo({ left: newScrollX, behavior: "smooth" });
    }
  };
  
  return (
    <AnimatePresence>
    {/* Carousel container */}
    {! loading && (
        <motion.div
        className="relative my-8 bg-violet-300 border-violet-200 rounded-2xl shadow-md p-4 max-w-6xl mx-auto"
        {...fadeSlideUp}>

        {/* Genre */}
        <h2 className="text-2xl font-bold text-violet-700 mb-4 capitalize text-center">
            {genre}
            <hr className="mt-5" />
        </h2>

        {/* Carousel content */}
        <div className="flex items-center gap-2">

            {/* Left scroll button */}
            <button
            onClick={() => scroll("left")}
            className="p-2 text-violet-600 hover:text-violet-800">
                <ChevronLeft />
            </button>

            {/* Book */}
            <div
            ref={carouselRef} // Attach the ref to the carousel container
            className="flex overflow-x-auto overflow-y-hidden gap-4 px-2 py-6 scrollbar-custom scrollbar-hover"
            {...fadeSlide}>

            {/* Map through the books and render each book item */}
            {books.map((book) => (
                // Each book item is wrapped in a motion.div for animation
                <motion.div
                key={book.id}
                className="w-[150px] flex-shrink-0 bg-violet-100 rounded-lg shadow-md p-2 text-center"
                {...hoverSpring2}
                {...showCarousel}>

                {/* Book cover image */}
                <img
                    src={book.cover}
                    alt={book.title}
                    className="rounded-md mb-2 w-full h-[220px] object-cover shadow-violet-600 shadow-lg"
                    {...fadeSlide}/>

                {/* Title */}
                <p className="text-md text-violet-800 font-medium line-clamp-3">
                    {book.title}
                </p>
                </motion.div>
            ))}  {/* Book item ends here */}
            </div>

                {/* Right scroll button */}
                <button
                onClick={() => scroll("right")}
                className="p-2 text-violet-600 hover:text-violet-800">
                    <ChevronRight />
                </button>
        </div> {/* Carousel content ends here */}
        </motion.div>
        )}
    </AnimatePresence >
  );
}

export default BookCarousel;
