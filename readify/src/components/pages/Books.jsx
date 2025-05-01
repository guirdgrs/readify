import { Book } from "lucide-react";
import Navbar from "../navbar/Navbar";
import BackButton from "../utils/BackButton";
import { useEffect, useState } from "react";
import BookNotFound from "../authordetail/AuthorNotFound";
import Loading from "../utils/Loading";
import Fuse from "fuse.js";
import { motion } from "framer-motion";
import { fadeSlideUp } from "../utils/motionConfig";
import { Link } from "react-router-dom";
import GenreCarousel from "../carousel/GenreCarousel";
import SeeMoreButton from "../utils/SeeMoreButton";

function Books() {
  // State for books
  const [books, setBooks] = useState([]);
  
  // State for popular books
  const [popularBooks, setPopularBooks] = useState([]);
  
  // State for loading
  const [loading, setLoading] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);
  
  // State for search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

  // Predefined popular titles
  const popularTitles = [
    "Harry Potter",
    "The Hobbit",
    "1984",
    "To Kill a Mockingbird",
    "The Great Gatsby",
    "The Catcher in the Rye",
    "Pride and Prejudice",
    "The Lord of the Rings"
  ];

  // Fetch popular books
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchPopularBooks() {
      try {

        const results = await Promise.all(

          popularTitles.map(async (title) => {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&maxResults=1&langRestrict=en`
            );

            const data = await response.json();

            if (data.items && data.items[0]) {
              const item = data.items[0];
              return {
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || ["Unknown Author"],
                description: item.volumeInfo.description || "No description.",
                image: item.volumeInfo.imageLinks?.thumbnail || "https://placehold.co/200x300?text=No+Image",
                link: item.volumeInfo.infoLink,
                categories: item.volumeInfo.categories || [],
              };
            }
            return;
          })
        );

        setPopularBooks(results.filter(book => book !== null));

      } catch {
        <BookNotFound />
      } finally {
        setLoadingPopular(false);
      }
    }
    fetchPopularBooks();
  }, []);

  // Fetch random books
  const fetchBooks = async () => {

    setLoading(true);

    try {
      
      const randomQuery = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random letter a-z
      
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${randomQuery}&maxResults=28&langRestrict=en`
      );

      const data = await response.json();

      if (data.items) {
        const formattedBooks = data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || "Untitled",
          authors: item.volumeInfo.authors || ["Unknown Author"],
          description: item.volumeInfo.description || "No description.",
          image: item.volumeInfo.imageLinks?.thumbnail || "https://placehold.co/200x300?text=No+Image",
          link: item.volumeInfo.infoLink,
          categories: item.volumeInfo.categories || [],
          shortName: item.volumeInfo.title.length > 15 ? item.volumeInfo.title.substring(0, 15) + "..." : item.volumeInfo.title,
        }));
        setBooks(formattedBooks);
        setSearchResults(formattedBooks);
        setNoResultsFound(false);
      } else {
        setBooks([]);
        setSearchResults([]);
        setNoResultsFound(true);
      }
    } catch {
      <BookNotFound />;
      setNoResultsFound(true);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle search with debounce
  useEffect(() => {

    if (searchQuery.trim().length === 0) {
      setSearchResults(books);
      setNoResultsFound(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length < 3) return;

      setLoading(true);

      try {
        const fuse = new Fuse(books, {
          keys: ["title", "authors"],
          threshold: 0.3,
        });

        const results = fuse.search(searchQuery).map((result) => result.item);

        setSearchResults(results);
        setNoResultsFound(results.length === 0);

      } catch {
        <BookNotFound />;
        setNoResultsFound(true);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, books]);

  const displayedBooks = searchQuery.trim().length > 0 ? searchResults : books;

  return (
    <div>
      <Navbar />
      <BackButton />
      <motion.div 
      className="max-w-7xl mx-auto p-6 mt-20 text-center" 
      {...fadeSlideUp}>

        <h1 
        className="text-4xl font-bold text-violet-700 mb-8 text-center">
          Books
        </h1>

        <hr 
        className="border-t-2 border-violet-300 mb-8"/>

        <div 
        className="mb-12">

          <h2 
          className="text-2xl font-semibold text-violet-600 mb-6">
            Most Popular Books
          </h2>

          {loadingPopular ? (
            <Loading />
          ) : (
            <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {popularBooks.map((book, index) => (
                <Link
                  key={index}
                  to={`/book/${encodeURIComponent(book.id)}`}
                  className="flex flex-col items-center bg-pink-200 p-4 rounded-lg shadow hover:bg-pink-300 text-center">

                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-24 h-32 object-cover rounded mb-2" />

                  <p 
                  className="font-medium">
                    {book.title}
                  </p>

                </Link>
              ))}
            </div>
          )}
        </div>

        <div 
        className="mb-12">
          <GenreCarousel />
        </div>

        <div 
        className="mb-6">

          <h2 
          className="text-2xl font-semibold text-violet-600 mb-4">
            {searchQuery.trim().length > 0 ? "Search Results" : "All Books"}
          </h2>

          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-md border-2 border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-600"/>

        </div>

        {loading ? (
          <Loading />
        ) : noResultsFound ? (
          <div
          className="col-span-full flex justify-center items-center h-64">
            <BookNotFound />
          </div>
        ) : (
          <>
            <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {displayedBooks.map((book, index) => (
                <Link
                  key={index}
                  to={`/book/${encodeURIComponent(book.id)}`}
                  className="flex flex-col items-center bg-violet-200 p-4 rounded-lg shadow hover:bg-violet-300 text-center">

                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-24 h-32 object-cover rounded mb-2" />

                  <p 
                  className="font-medium">
                    {book.shortName || book.title}
                  </p>

                </Link>
              ))}
            </div>

            <hr 
            className="border-t-2 border-violet-300 mb-8 mt-10"/>

            {!searchQuery && (
              <div className="mt-8 flex justify-center">

                <SeeMoreButton 
                onClick={fetchBooks} 
                loading={loading}/>

              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Books;