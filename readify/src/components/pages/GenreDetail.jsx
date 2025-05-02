import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import BackButton from "../utils/BackButton";
import Loading from "../utils/Loading";
import BookNotFound from "../authordetail/AuthorNotFound";
import { motion } from "framer-motion";
import { fadeSlideUp } from "../utils/motionConfig";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";

function GenreDetail() {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchBooksByGenre() {
      
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=40`
        );

        const data = await response.json();

        const formattedBooks =
          data.items?.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            image: item.volumeInfo.imageLinks?.thumbnail || "https://placehold.co/200x300?text=No+Image",
            link: item.volumeInfo.infoLink,
          })) || [];

        setBooks(formattedBooks);

      } catch {
        <BookNotFound />;
      } finally {
        setLoading(false);
      }
    }
    fetchBooksByGenre();
  }, [genre]);

  const popularGenreBooks = books.slice(0, 8);

  return (
    <div>
      <Navbar />
      <BackButton />
      <motion.div 
      className="max-w-7xl mx-auto p-6 mt-20 text-center" 
      {...fadeSlideUp}>

        <h1 
        className="text-4xl font-bold text-violet-700 mb-8 text-center">
          {genre} Books
        </h1>

        <hr 
        className="border-t-2 border-violet-300 mb-8"/>

        {loading ? (
          <Loading />
        ) : books.length > 0 ? (
          <>

            <div 
            className="mb-12">

              <h2 
              className="text-2xl font-semibold text-violet-600 mb-6">
                Most Popular Books from this Genre
              </h2>

              <div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {popularGenreBooks.map((book, index) => (
                  <Link
                    key={index}
                    to={`/book/${encodeURIComponent(book.title)}`}
                    className="flex flex-col items-center bg-pink-200 p-4 rounded-lg shadow hover:bg-pink-300 text-center">

                    <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-24 h-32 object-cover rounded mb-2"/>

                    <p 
                    className="font-medium">
                      {book.title}
                    </p>

                  </Link>
                ))}
              </div>
            </div>

            <hr 
            className="border-t-2 border-violet-300 mb-8"/>

            <h2 
            className="text-2xl font-semibold text-violet-600 mb-6">
              Others Books from this Genre
            </h2>

            <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <Link
                  key={index}
                  to={`/book/${encodeURIComponent(book.title)}`}
                  className="flex flex-col items-center bg-violet-200 p-4 rounded-lg shadow hover:bg-violet-300 text-center">

                  <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-24 h-32 object-cover rounded mb-2"/>

                  <p 
                  className="font-medium">
                    {book.title}
                  </p>
                  
                </Link>
              ))}
            </div>
          </>
        ) : (
          <BookNotFound />
        )}
      </motion.div>
    </div>
  );
}

export default GenreDetail;
