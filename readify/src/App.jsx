import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar.jsx'
import BookCarousel from './components/carousel/Carousel.jsx'

function App() {

  // Array of genres to be used for the book carousels
  const genres = ["fantasy", "romance", "horror", "mystery", "fiction", "drama"]; 

  return (
    <div className="">
          <Navbar/>
          {/* map is use to go into each item of the array */}
          {genres.map((genres => (
            // for each genre, a BookCarousel component is rendered
            // The key prop is used to uniquely identify each component in the list
            <BookCarousel genre={genres} key={genres}/>
          )))}
    </div>
  );
}

export default App