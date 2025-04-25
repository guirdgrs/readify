import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import BookDetail from './components/pages/BookDetail.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the routes for the application */}
        {/* The path "/" renders the Home component */}
        <Route path="/" element={<Home />} />
        {/* The path "/book/:id" renders the BookDetail component */}
        {/* The ":id" part of the path is a route parameter that will match any book ID */}
        <Route path="/book/:id" element={<BookDetail />} />
        {/* The BookDetail component will use this ID to fetch and display the details of the specific book */}
      </Routes>
    </Router>
  );
}

export default App;
