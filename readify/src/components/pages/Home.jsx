import Navbar from '../navbar/Navbar.jsx'
import BookCarousel from '../carousel/BookCarousel.jsx'
import { motion } from 'framer-motion'; 
import Footer from '../utils/Footer.jsx'; 

function App() {

  // Array of genres to be used for the book carousels
  const genres = [
    "fantasy", "romance", "horror", "mystery", "fiction", "drama"
  ]; 

  return (
    <div 
    className="flex flex-col min-h-screen bg-gradient-to-br from-purple-400 via-black-300 to-gray-900 text-white mt-20">
          <Navbar />

            {/* About Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4 md:px-20 py-12">

              <h2 
              className="text-4xl font-bold mb-4 text-pink-400 text-shadow-black text-shadow-2xs">
                About the project
              </h2>

              <p 
              className="text-lg max-w-3xl mx-auto text-violet-200  text-shadow-black text-shadow-2xs">
                This is a virtual library developed as a personal project to practice and deepen my knowledge in
                <span 
                className="text-pink-400 font-semibold"> React</span>, 
                <span className="text-pink-400 font-semibold"> TailwindCSS </span> 
                and API consumption, such as the
                <span className="text-pink-400 font-semibold"> Google Books API</span>. 
                The goal is to combine learning with a friendly and modern interface.
              </p>
            </motion.section>

          {/* map is use to go into each item of the array */}
          {genres.map((genres => (
            // for each genre, a BookCarousel component is rendered
            // The key prop is used to uniquely identify each component in the list
            <BookCarousel 
            genre={genres} 
            key={genres} 
            delay={500}/>
          )))}

          <Footer />
    </div>
  );
}

export default App