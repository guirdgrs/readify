import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import BookDetail from './components/pages/BookDetail.jsx';
import FaviconManager from './components/utils/FavIconManager.jsx';
import AuthorDetail from './components/pages/AuthorDetail.jsx';
import Authors from './components/pages/Authors.jsx';
import Books from './components/pages/Books.jsx';
import Genres from './components/pages/Genres.jsx';
import GenreDetail from './components/pages/GenreDetail.jsx';
import FavoriteBooks from './components/pages/FavoriteBooks.jsx';

function App() {
  return (

    <Router>
            <FaviconManager />
      <Routes>
        {/* Define the routes for the application */}
        {/* The path "/" renders the Home component */}
        <Route path="/" element={<Home />} />
        {/* The path "/book/:id" renders the BookDetail component */}
        {/* The ":id" part of the path is a route parameter that will match any book ID */}
        <Route path="/book/:id" element={<BookDetail />} />
        {/* The BookDetail component will use this ID to fetch and display the details of the specific book */}
        {/* The path "/auhor/:authorName" renders the AuthorDetail component */}
        <Route path="/author/:authorName" element={<AuthorDetail />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/genredetail/:genre" element={<GenreDetail />} />
        <Route path="/favoritebooks" element={<FavoriteBooks />} />
        <Route path="/genres" element={<Genres />} />
      </Routes>
    </Router>
  );
}

export default App;
