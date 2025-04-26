import { motion } from "framer-motion";
import { fadeSlideUp } from "../utils/motionConfig";
import { CircleX } from "lucide-react";

function FeedbackSection({onClose, onSend}) {

    // Function to manage the feedback send
    const handleSend = () => {
        onSend();
    }

    return(
        <motion.div
        {...fadeSlideUp}
        className="mt-8 p-6 bg-violet-200 rounded-xl shadow-inner text-violet-800">
            <div 
            className="flex justify-between items-center mb-4">
                <h2 
                className="text-2xl font-bold">
                    Feedback
                </h2>
                <button
                onClick={onClose}
                className="text-violet-600 hover:text-violet-800 font-bold text-lg">
                </button>
                <CircleX className="cursor-pointer"/>
            </div>

            <textarea 
            placeholder="Feedback..."
            className="w-full p-4 rounded-md border-2 border-violet-400 focus:outline-none focus:border-violet-600 resize-none"
            rows="5">
            </textarea>

            <div className="flex justify-end mt-4">
                <button 
                className="bg-violet-500 text-white px-6 py-2 rounded-md hover:bg-violet-600 cursor-pointer"
                onClick={handleSend}>
                    Send Feedback
                </button>
            </div>

        </motion.div>
    )

}

export default FeedbackSection;