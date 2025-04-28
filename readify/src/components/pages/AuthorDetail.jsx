import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Loading from "../utils/Loading";
import BookCard from "../bookdetail/BookCard";
import { motion } from "framer-motion";
import { fadeSlideUp } from "../utils/motionConfig";
import BookNotFound from "../authordetail/AuthorNotFound";
import BackButton from "../utils/BackButton";

function AuthorDetail() {
  const { authorName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchAuthorBooks() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${decodeURIComponent(
            authorName
          )}"&maxResults=20&langRestrict=en`
        );
        const data = await response.json();
        setBooks(
          data.items?.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            image:
              item.volumeInfo.imageLinks?.thumbnail ||
              "https://placehold.co/200x300?text=No+Image",
            link: item.volumeInfo.infoLink,
          })) || []
        );
      } catch {
        <BookNotFound />;
      } finally {
        setLoading(false);
      }
    }

    fetchAuthorBooks();
  }, [authorName]);

  return (
    <div>
      <Navbar />
      <BackButton />
      <motion.div
        {...fadeSlideUp}
        className="max-w-6xl mx-auto p-6 mt-20 text-center"
      >
        <h1 className="text-3xl font-bold mb-6 text-violet-700">
          Books by {decodeURIComponent(authorName)}
        </h1>

        {/* Display books */}
        {loading ? (
          <Loading />
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <BookNotFound />
        )}
      </motion.div>
    </div>
  );
}

export default AuthorDetail;
