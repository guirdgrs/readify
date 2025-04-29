import { motion } from "framer-motion";
import { fadeSlideUp } from "../utils/motionConfig";
import { CircleX } from "lucide-react";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content";

function FeedbackSection({onClose, onSend}) {

    // Function to manage the feedback send
    const handleSend = () => {

        const textarea = document.getElementById("feedback-send");

        if(!textarea.value.trim()) {
            withReactContent(Swal).fire({
            title: "Empty feedback",
            text: "Please write something before sending",
            icon: "error",
            confirmButtonColor: "#7c3aed",
            });
                return;
            }
            onSend();
        };

    return(
        <motion.div
        {...fadeSlideUp}
        className="mt-8 p-6 bg-violet-200 rounded-xl shadow-inner text-violet-800 max-w-4xl mx-auto">

            <div 
            className="flex justify-between items-center mb-4">
                
                <h2 
                className="text-2xl font-bold">
                    Feedback
                </h2>

                <button
                onClick={onClose}>
                    <CircleX 
                    size={30} 
                    className="cursor-pointer text-red-400 hover:text-red-600 font-bold text-lg"/>
                </button>

            </div>

                <textarea
                id="feedback-send"
                placeholder="Feedback..."
                className="w-full p-4 rounded-md border-2 border-violet-400 focus:outline-none focus:border-violet-600 resize-none"
                rows="5">
                </textarea>

            <div 
            className="flex justify-end mt-4">
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