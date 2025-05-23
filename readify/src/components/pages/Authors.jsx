import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthorNotFound from "../authordetail/AuthorNotFound";
import { fadeSlideUp } from "../utils/motionConfig";
import Navbar from "../navbar/Navbar";
import Loading from "../utils/Loading";
import Fuse from "fuse.js";
import BackButton from "../utils/BackButton";
import SeeMoreButton from "../utils/SeeMoreButton";
import Footer from "../utils/Footer";

function Authors() {
  // State for authors
  const [authors, setAuthors] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const authorsPerPage = 20;

  // State for popular authors
  const [popularAuthors, setPopularAuthors] = useState([]);

  // State for loading
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // State for search authors
  const [searchQuery, setSearchQuery] = useState("");

  // State for search results
  const [searchResults, setSearchResults] = useState([]);

  // State for no results found
  const [noResultsFound, setNoResultsFound] = useState(false);

  // Predefined popular authors
  const predefinedPopularAuthors = [
    {
      name: "J.K. Rowling",
      image: "https://placehold.co/200x300?text=Rowling",
    },
    { name: "Stephen King", image: "https://placehold.co/200x300?text=King" },
    {
      name: "Agatha Christie",
      image: "https://placehold.co/200x300?text=Christie",
    },
    {
      name: "George R.R. Martin",
      image: "https://placehold.co/200x300?text=Martin",
    },
    {
      name: "J.R.R. Tolkien",
      image: "https://placehold.co/200x300?text=Tolkien",
    },
    { name: "Dan Brown", image: "https://placehold.co/200x300?text=Brown" },
    {
      name: "Suzanne Collins",
      image: "https://placehold.co/200x300?text=Collins",
    },
    {
      name: "Rick Riordan",
      image: "https://placehold.co/200x300?text=Riordan",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchAuthors() {

      setLoading(true);

      try {
        // Fetch authors
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=a&maxResults=40"
        );

        const data = await response.json();

        // Extract authors
        let authorsData = [];

        data.items?.forEach((item) => {
          const authorName = item.volumeInfo?.authors?.[0];
          const authorImage = item.volumeInfo?.imageLinks?.thumbnail;

          if (authorName && !authorsData.find((a) => a.name === authorName)) {
            authorsData.push({
              name: authorName,
              image:
              authorImage || "https://placehold.co/200x300?text=No+Image",
              shortName: authorName.length > 15 ? authorName.substring(0, 15) + "..." : authorName,
            });
          }
        });

         // Shuffle and set authors
        authorsData = authorsData.sort(() => 0.5 - Math.random());

        setAllAuthors(authorsData);
        setAuthors(authorsData.slice(0, authorsPerPage));
        setPopularAuthors(predefinedPopularAuthors);

      } catch {
        <AuthorNotFound />;
      } finally {
        setLoading(false);
      }
    }
    fetchAuthors();
  }, []);

  const loadMoreAuthors = async () => {
    setLoadingMore(true);
    
    try {
      // First check if there are more authors to load
      const nextPage = currentPage + 1;
      const startIndex = nextPage * authorsPerPage;
      
      if (startIndex < allAuthors.length) {
        // If there are more authors to load, show them
        setAuthors(allAuthors.slice(startIndex, startIndex + authorsPerPage));
        setCurrentPage(nextPage);
        
      } else {
        // In the end, fetch more random authors
        const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));

        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${randomChar}&maxResults=${authorsPerPage}&langRestrict=en`
        );
        
        const data = await response.json();
  
        if (data.items) {
          const newAuthors = [];
          
          data.items.forEach((item) => {
            const authorName = item.volumeInfo?.authors?.[0];
            const authorImage = item.volumeInfo?.imageLinks?.thumbnail;
  
            if (authorName && !allAuthors.find(a => a.name === authorName)) {
              newAuthors.push({
                name: authorName,
                image: authorImage || "https://placehold.co/200x300?text=No+Image",
                shortName: authorName.length > 15 ? `${authorName.substring(0, 15)}...` : authorName,
              });
            }
          });
  
          if (newAuthors.length > 0) {
            // Add new authors to allAuthors
            const updatedAuthors = [...allAuthors, ...newAuthors];
            setAllAuthors(updatedAuthors);
            
            // Show new authors
            setAuthors(newAuthors);
            setCurrentPage(0); // Reset current page
          }
        }
      }

      // Scroll to top
      document.getElementById('popular-authors-section')?.scrollIntoView({ behavior: 'smooth' });
      
    } catch {
      <AuthorNotFound/>;
    } finally {
      setLoadingMore(false);
    }
  };

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setNoResultsFound(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {

      // If search query is less than 3 characters, don't search
      if (searchQuery.trim().length < 3) {
        return;
      }

      setLoading(true);
      try {
        // First try exact matches from existing authors
        const fuse = new Fuse([...allAuthors, ...popularAuthors], {
          keys: ["name"],
          threshold: 0.5,
          includeScore: true,
          minMatchCharLength: 1,
          ignoreLocation: true,
          shouldSort: true,
          findAllMatches: true,
          distance: 100,
          useExtendedSearch: true,
        });

        const results = fuse.search(searchQuery, {
          limit: 20,
        });
        
        const matchedAuthors = results.map((result) => result.item);

        if (matchedAuthors.length > 0) {
          setSearchResults(matchedAuthors);
          setNoResultsFound(false);
          setLoading(false);
          return;
        }

        // If no local matches, try API search
        fetch (
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(
            searchQuery
          )}&maxResults=20`
        )
          .then((response) => response.json())
          .then((data) => {
            let apiResults = [];
            data.items?.forEach((item) => {
              const itemAuthors = item.volumeInfo?.authors;
              const authorImage = item.volumeInfo?.imageLinks?.thumbnail;

              if (itemAuthors) {
                itemAuthors.forEach((authorName) => {
                  if (!apiResults.find((a) => a.name === authorName)) {
                    apiResults.push({
                      name: authorName,
                      image: authorImage || "https://placehold.co/200x300?text=No+Image",
                    });
                  }
                });
              }
            });

            if (apiResults.length > 0) {
              setSearchResults(apiResults);
              setNoResultsFound(false);
            } else {
              setNoResultsFound(true);
            }
          });

      } catch {
        setNoResultsFound(true);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, allAuthors, popularAuthors]);

  const displayedAuthors = searchQuery.trim().length > 0 ? searchResults : authors;

  return (
    <div>
      <Navbar />
      <BackButton />
      <motion.div
      className="max-w-7xl mx-auto p-6 mt-25 text-center" 
      {...fadeSlideUp}>

        <h1 
        className="text-4xl font-bold text-violet-700 mb-8">
          Authors
        </h1>

        <hr 
        className="border-t-2 border-violet-300 mb-8"/>

        {/* Popular authors section */}
        {loading ? (
          <Loading />
        ) : authors.length > 0 ? (
          <>
            <div 
            className="mb-12">
              <h2 
              className="text-2xl font-semibold text-violet-600 mb-6">
                Most Popular Authors
              </h2>

              <div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
              id="popular-authors-section">
                {popularAuthors.map((author, index) => (
                  <Link
                    key={index}
                    to={`/author/${encodeURIComponent(author.name)}`}
                    className="flex flex-col items-center bg-pink-200 p-4 rounded-lg shadow hover:bg-pink-300 text-center">

                    <img
                      src={author.image}
                      alt={author.name}
                      className="w-24 h-24 object-cover rounded-full mb-2"/>

                    <p 
                    className="font-medium">
                      {author.name}
                    </p>

                  </Link>
                ))}
              </div>
            </div>

            <hr 
            className="border-t-2 border-violet-300 mb-8"/>

            <h2 
            className="text-2xl font-semibold text-violet-600 mb-6 mt-10">
              {searchQuery.trim().length > 0 ? "Search Results" : "All Authors"}
            </h2>

            {/* Search bar */}
            <div 
            className="mb-6">

              <input
                type="text"
                placeholder="Search author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border-2 border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-600"/>

            </div>

            {/* Authors */}
            <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {noResultsFound ? (
                <div 
                className="col-span-full flex justify-center items-center h-64">
                  <AuthorNotFound />
                </div>
              ) : (
                displayedAuthors.map((author, index) => (
                  <Link
                    key={index}
                    to={`/author/${encodeURIComponent(author.name)}`}
                    className="flex flex-col items-center bg-violet-200 p-4 rounded-lg shadow hover:bg-violet-300 text-center">
                    {author.image ? (
                      <img 
                      src={author.image} 
                      alt={author.name} 
                      className="w-24 h-24 object-cover rounded-full mb-2"/>
                    ) : (
                      <div 
                      className="w-24 h-24 bg-violet-400 rounded-full flex items-center justify-center text-white mb-2">
                        ?
                      </div>
                    )}
                    <p 
                    className="font-medium">
                      {author.shortName || author.name}
                    </p>
                    
                  </Link>
                ))
              )}
            </div>
            {!searchQuery && (
              <div className="mt-8 flex justify-center">

                <SeeMoreButton 
                onClick={loadMoreAuthors} 
                loading={loadingMore}/>

              </div>
            )}
          </>
        ) : (
          <AuthorNotFound />
        )}
      </motion.div>

      <Footer />

    </div>
  );
}

export default Authors;
