import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeSlideUp, hoverSpring, hoverSpring2 } from "../utils/motionConfig.js";
import Navbar from "../navbar/Navbar.jsx";
import BookLoading from "../bookdetail/BookLoading.jsx";
import BookNotFound from "../bookdetail/BookNotFound.jsx";

function BookDetail() {
  // useParams is a hook from react-router-dom that allows you to access the URL parameters of the current route
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );

        const data = await response.json();
        // Set the book state with the fetched data
        // The data is expected to contain information about the book, including title, authors, description, and image links
        setBook({
          title: data.volumeInfo.title,
          authors: data.volumeInfo.authors,
          // The description is stripped of HTML tags using the stripHtml function
          description: stripHtml(data.volumeInfo.description || "No description."),
          image:
            data.volumeInfo.imageLinks?.thumbnail ||
            "https://placehold.co/200x300?text=Sem+Capa",
          link: data.volumeInfo.infoLink, // Link to the book's page on Google Books
        });
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

                <hr />

                <h3 className="text-lg font-semibold mb-2 text-violet-700 mt-3">
                    Description
                </h3>

            <p className="text-sm leading-relaxed">
                {book.description}
            </p>
            </div>
        </div>
        </motion.div>
    </div>
  );
}

export default BookDetail;
