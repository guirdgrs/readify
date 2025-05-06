import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar.jsx";
import BookCard from "../bookdetail/BookCard.jsx";
import BackButton from "../utils/BackButton.jsx";
import { motion } from "framer-motion";
import { fadeSlideUp, hoverSpring2, loadingScale } from "../utils/motionConfig.js";
import BookNotFound from "../bookdetail/BookNotFound.jsx";
import { ChevronDown, Frown, Trash2 } from "lucide-react";
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import Footer from "../utils/Footer.jsx";

function FavoriteBooks() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    window.scrollTo(0, 0);

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

  const handleRemoveFavorite = (bookId) => {
    Swal.fire({
        title: "Remove from favorites?",
        text: "This book will no longer appear in your favorites.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, remove it",

      }).then((result) => {
        if (result.isConfirmed) {

          localStorage.removeItem(`favorite_${bookId}`);
          setFavorites((prev) => prev.filter((book) => book.id !== bookId));
    
          Swal.fire({
            title: "Removed!",
            text: "The book was removed from your favorites.",
            icon: "success",
            timer: 1500,
            showConfirmButton: true,
          });
        }
      });
    
  };

  return (
    <div>

      <Navbar />
      <BackButton />

      <motion.div
        className="max-w-6xl mx-auto p-6 mt-25 text-center"
        {...fadeSlideUp}>
            
        <h1 className="text-3xl font-bold text-violet-700 mb-6">
          Your Favorite Books
        </h1>

        <hr 
        className="border-t-2 border-violet-300 mb-8"/>

        {favorites.length === 0 ? (
          <div>

            <motion.p
            className="text-violet-600 text-lg hover:text-red-500"
            {...loadingScale}>
                <Frown className="mx-auto"/>
                You have no favorite books yet.
                <br />
                <i>You can add books to your favorites by clicking on the button down below.</i>
                
                <ChevronDown className="mx-auto mt-5"/>
            </motion.p>

          </div>
        ) : (
          <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favorites.map((book) => (
                <div 
                key={book.id}
                className="relative group">
    
                    <BookCard book={book} />

                    <motion.button
                    onClick={() => handleRemoveFavorite(book.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md z-10 cursor-pointer"
                    {...hoverSpring2}>
                        <Trash2 />
                    </motion.button>
                </div>
                
            ))}
            
          </div>
        )}

        <hr 
        className="border-t-2 border-violet-300 mt-15"/>

        <Link 
            to="/books"
            className="inline-block mt-10">

                <motion.p
                className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
                {...hoverSpring2}
                {...loadingScale}>
                    Add books...
                </motion.p>

            </Link>
      </motion.div>

      <Footer />

    </div>
  );
}

export default FavoriteBooks;
