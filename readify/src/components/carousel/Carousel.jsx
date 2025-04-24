import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { hoverSpring, fadeSlide } from "../utils/motionConfig.js";

function BookCarousel({ genre = "fiction" }) {
  // State to store the list of books
  const [books, setBooks] = useState([]);

  // State to manage loading state
  const [loading, setLoading] = useState(true);

  // Effect to fetch books from the Google Books API based on the genre
  useEffect(() => {
    // Function to fetch books from the API
    async function fetchBooks() {
      try {
        const response = await fetch(
          // q=subject:${genre}&maxResults=10 query parameter to filter books by genre and limit the number of results
          `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=10`
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

  //Function to handle scrolling the carousel left or right
  const scroll = (direction) => {
    // Get the carousel container element by its ID
    // The ID is dynamically generated based on the genre prop passed to the component
    const container = document.getElementById(`carousel-${genre}`);
    if (container) {
      // Calculate the scroll amount based on the direction
      const scrollAmount = 300;
      const newScrollX =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScrollX, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
    {/* Carousel container */}
    {! loading && (
        <motion.div
        className="relative my-8 bg-violet-300 border-violet-200 rounded-2xl shadow-md p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}>

        {/* Genre */}
        <h2 className="text-2xl font-bold text-violet-700 mb-4 capitalize">
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
            id={`carousel-${genre}`}
            className="flex overflow-x-auto gap-4 scroll-smooth px-2 py-4"
            {...fadeSlide}>

            {/* Map through the books and render each book item */}
            {books.map((book) => (
                // Each book item is wrapped in a motion.div for animation
                <motion.div
                key={book.id}
                className="min-w-[150px] bg-violet-100 rounded-lg shadow-md p-2 text-center"
                {...hoverSpring}>

                {/* Book cover image */}
                <img
                    src={book.cover}
                    alt={book.title}
                    className="rounded-md mb-2 w-full h-[220px] object-cover"
                    {...fadeSlide}/>

                {/* Title */}
                <p className="text-sm text-violet-800 font-medium truncate">
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
