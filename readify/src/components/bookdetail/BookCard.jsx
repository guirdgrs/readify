import { motion } from "framer-motion";
import { hoverSpring2 } from "../utils/motionConfig";
import { useNavigate, useLocation } from "react-router-dom";

function BookCard({ book }) {

  const navigate = useNavigate(); // Hook to programmatically navigate to a different route
  const location = useLocation(); // Hook to get the current location

  // Function to handle click event on the book card
  // It checks if the current path ends with the book ID, if not, it navigates to the book detail page
  const handleClick = () => {
    if(!location.pathname.endsWith(book.id)){
      navigate(`/book/${book.id}`);
    } else {
      navigate(`/book/${book.id}`, { replace: true });
    }
  };

  return (
    <motion.div 
      className="bg-violet-300 px-5 rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleClick}
      {...hoverSpring2}>

        <img 
          src={book.image}
          alt={book.title} 
          className="mt-5"/>

        <div className="p-3 text-center">
          <h3 className="font-semibold text-sm line-clamp-3">{book.title}</h3>  
        </div>

    </motion.div>
  );
}

export default BookCard;