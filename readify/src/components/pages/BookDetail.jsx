import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { fadeSlideUp, hoverSpring, hoverSpring2, showCarousel } from "../utils/motionConfig.js";
import Navbar from "../navbar/Navbar.jsx";
import BookLoading from "../bookdetail/BookLoading.jsx";
import BookNotFound from "../bookdetail/BookNotFound.jsx";
import BookCard from "../bookdetail/BookCard.jsx";
import { Book } from "lucide-react";
import { useInView } from "react-intersection-observer";

function BookDetail() {
  // useParams is a hook from react-router-dom that allows you to access the URL parameters of the current route
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  // State variables to manage related books
  const [sameAuthorBooks, setSameAuthorBooks] = useState([]);
  // State variable to manage books of the same genre
  const [sameGenreBooks, setSameGenreBooks] = useState([]);
  // State variable to manage loading state for related books
  const [loadingRelated, setLoadingRelated] = useState(true);

  //Controllers for animation by scrolling
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.05,
    rootMargin: "0px 0px 50% 0px",
    triggerOnce: true, // Trigger only once
  });

  // Animation effect for the author and genre section
  useEffect(() => {
    // Start the animation when the author and genre section is in view
    if(inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  useEffect(() => {

    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page when the component mounts
    setLoading(true); // Set loading state to true before fetching book details
    // Function to fetch book details from the Google Books API using the provided ID
    async function fetchBook() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?langRestrict=en`
        );

        const data = await response.json();
        // Set the book state with the fetched data
        // The data is expected to contain information about the book, including title, authors, description, and image links
        const bookData = {
          id: data.id,
          title: data.volumeInfo.title,
          authors: data.volumeInfo.authors,
          // The description is stripped of HTML tags using the stripHtml function
          description: stripHtml(data.volumeInfo.description || "No description."),
          image:
            data.volumeInfo.imageLinks?.thumbnail ||
            "https://placehold.co/200x300?text=No+Image",
          link: data.volumeInfo.infoLink, // Link to the book's page on Google Books
          categories: data.volumeInfo.categories || [],
        };

        setBook(bookData); // Update the book state with the fetched book data

        //Search for books by the same author and category
        if(bookData.authors && bookData.authors.length > 0){
          fetchBooksByAuthor(bookData.authors[0], bookData.id);
        }

        if(bookData.categories && bookData.categories.length > 0){
          fetchBooksByCategory(bookData.categories[0], bookData.id);
        }

      } catch {
        alert("Error fetching book details. Please try again later.");
      } finally {
        // Set loading to false after the fetch is complete, regardless of success or failure
        // This ensures that the loading state is updated correctly in both cases
        setLoading(false);
      }
    }
    // Call the fetchBook function to initiate the API request
    fetchBook();
    // Dependency array to re-fetch book details when the ID changes
  }, [id]);

  if(loading || !book) return <BookLoading />; // Show loading state if the book is still being fetched or if the book is not found

  // Function to fetch books by author
  async function fetchBooksByAuthor(author, bookId) {
    try{
      const response = await fetch(
        // Google Books API endpoint to search for books by the same author
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:"
        ${encodeURIComponent(author)}"&maxResults=6&langRestrict=en`);

        const data = await response.json();

        // Filter out the current book from the list of books by the same author
        const books = data.items
        ? data.items
          .filter((item) => item.id !== bookId)
          .map(item=> ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            image: item.volumeInfo.imageLinks?.thumbnail || "https://placehold.co/200x300?text=No+Image",
            link: item.volumeInfo.infoLink,
          }))
        : []; // If no items are found, set books to an empty array

        setSameAuthorBooks(books); // Update the state with the filtered books
    }catch(error){
      console.error("Error fetching books by author:", error);
    } finally{
      setLoadingRelated(false); // Set loading state to false after fetching books by author
    }
  }

    // Function to fetch books by genre (category)
    async function fetchBooksByCategory(category, bookId) {
      try{
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:"
          ${encodeURIComponent(category)}"&maxResults=6&langRestrict=en`);
  
          const data = await response.json();
  
          const books = data.items
          ? data.items
            .filter((item) => item.id !== bookId)
            .map(item=> ({
              id: item.id,
              title: item.volumeInfo.title,
              authors: item.volumeInfo.authors,
              image: item.volumeInfo.imageLinks?.thumbnail || "https://placehold.co/200x300?text=No+Image",
              link: item.volumeInfo.infoLink,
            }))
          : [];
  
          setSameGenreBooks(books);
      }catch(error){
        console.error("Error fetching books by category:", error);
      } finally{
        setLoadingRelated(false);
      }
    }

  // Function to strip HTML tags from a string
  function stripHtml(html) {
    // Create a new DOMParser instance to parse the HTML string
    // The DOMParser is a built-in browser API that can parse HTML and XML strings into a DOM Document
    const doc = new DOMParser().parseFromString(html, "text/html");
    // Use the textContent property of the body element to extract the text content without HTML tags
    // The textContent property returns the text content of the node and its descendants
    return doc.body.textContent || "";
  }

  // Render loading state or error message if applicable
  if (loading) {
    return <BookLoading />;
  }
  // Render the book details if the book is found
  // If the book is not found, display an error message
  if (!book) {
    return <BookNotFound />;
  }

  return (
    <div>
        <Navbar />

        <motion.div
        className="max-w-4xl mx-auto mt-10 p-6 bg-violet-300 rounded-2xl shadow-lg text-violet-800"
        {...fadeSlideUp}>

        <div className="flex flex-col md:flex-row gap-6 items-center">

            <a 
            href={book.link}
            target="_blank"
            rel="noopener noreferrer">
              
              <motion.img
              src={book.image}
              alt={book.title}
              className="w-[200px] h-[300px] rounded-md shadow-md cursor-pointer"
              {...hoverSpring2}/>
            </a>
            
            <div className="flex-1 text-center">
            <motion.h1
                className="text-3xl font-bold mb-2 text-violet-700">
                {book.title}
            </motion.h1>
                {book.authors && (
                    <p className="text-md font-medium mb-4">
                    {/* getting  */}
                    Author{book.authors.length > 1 ? "es" : ""}:{" "}
                    {book.authors.join(", ")}
                    </p>
                )}

                <hr/>

                <h3 className="text-lg font-semibold mb-2 text-violet-700 mt-3">
                    Description
                </h3>

            <p className="text-sm leading-relaxed">
                {book.description}
            </p>
            </div>
        </div>
        </motion.div>

        {/* Books by the same author section */}
        {book.authors && book.authors.length > 0 && (
        <motion.div
          ref={ref} // Attach the ref to the author section for inView detection
          className="max-w-6xl mx-auto mt-10 p-6"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0,
            transition: { duration: 0.6, ease: "easeOut" }},
          }}>

          <h2 className="text-2xl font-bold mb-6 text-violet-700">
            More by {book.authors[0]}
          </h2>
          
          {/* Related books */}
          {loadingRelated ? ( 
            <div className="flex justify-center">
              <BookLoading />
            </div>
          // If there are books by the same author, display them in a grid layout
          ) : sameAuthorBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sameAuthorBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-violet-600">No other books by this author found.</p>
          )}
          <hr className="mt-20 text-violet-600 border rounded-md"/>
        </motion.div>
      )}


      {/* Same genre section */}
      {/* If the book has categories, display similar books in the same category */}
      {book.categories && book.categories.length > 0 && (
        <motion.div 
          ref={ref}
          className="max-w-6xl mx-auto mt-10 p-6"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.5 }},
          }}>

          {/* The first category is used for filtering similar books */}
          {/* If there are multiple categories, only the first one is displayed */}
          <h2 className="text-2xl font-bold mb-6 text-violet-700">
            Similar books in {book.categories[0]}
          </h2>
          
          {loadingRelated ? (
            <div className="flex justify-center">
              <BookLoading />
            </div>
          // If there are books in the same genre, display them in a grid layout
          ) : sameGenreBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sameGenreBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-violet-600">No similar books in this category found.</p>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default BookDetail;
