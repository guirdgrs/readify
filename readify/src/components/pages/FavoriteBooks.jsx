import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar.jsx";
import BookCard from "../bookdetail/BookCard.jsx";
import BackButton from "../utils/BackButton.jsx";
import { motion } from "framer-motion";
import { fadeSlideUp } from "../utils/motionConfig.js";
import BookNotFound from "../bookdetail/BookNotFound.jsx";

function FavoriteBooks() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const favBooks = [];

    // Loop through localStorage to get favorite books
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("favorite_")) {
        try {
          const book = JSON.parse(localStorage.getItem(key));
          favBooks.push(book);
        } catch {
          <BookNotFound/>;
        }
      }
    }

    setFavorites(favBooks);
  }, []);

  return (
    <div>

      <Navbar />
      <BackButton />

      <motion.div
        className="max-w-6xl mx-auto p-6 mt-20 text-center"
        {...fadeSlideUp}>
            
        <h1 className="text-3xl font-bold text-violet-700 mb-6">
          Your Favorite Books
        </h1>

        <hr 
        className="border-t-2 border-violet-300 mb-8"/>

        {favorites.length === 0 ? (
          <p 
          className="text-violet-600 text-lg">
            You have no favorite books yet.
          </p>
        ) : (
          <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favorites.map((book) => (
              <BookCard 
              key={book.id} 
              book={book} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default FavoriteBooks;
