import { motion } from "framer-motion";
import { hoverSpring2 } from "../utils/motionConfig";

function BookCard({ book }) {
  return (
    <motion.div 
      className="bg-violet-300 px-5 rounded-lg shadow-md overflow-hidden"
      {...hoverSpring2}>
      <a href={book.link} target="_blank" rel="noopener noreferrer">    
        <img 
          src={book.image}
          alt={book.title} 
          className="mt-5"/>

        <div className="p-3 text-center">
          <h3 className="font-semibold text-sm line-clamp-3">{book.title}</h3>  
        </div>

      </a>
    </motion.div>
  );
}

export default BookCard;