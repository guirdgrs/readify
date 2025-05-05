import { motion } from "framer-motion";
import { fadeSlideUp } from "../utils/motionConfig.js";
import Navbar from "../navbar/Navbar.jsx";
import Footer from "../utils/Footer.jsx";
import BackButton from "../utils/BackButton.jsx";

function About() {
  return (
    <div>
      <Navbar />
      <BackButton />
      <motion.div
      className="bg-gradient-to-br text-white from-purple-400 via-black-300 to-gray-900 relative px-6 py-12 flex flex-col items-center mt-20"
      {...fadeSlideUp}>

      <div 
      className="max-w-4xl w-full space-y-16 text-center">

        <section>

          <h2 
          className="text-4xl font-bold text-purple-300 mb-4">
            About the Project
          </h2>

          <p 
          className="text-lg text-whiteleading-relaxed">
            This project was created as a way to learn and practice building applications using{" "}
            <span 
            className="text-purple-400 font-semibold">
                React
            </span>. It uses modern web development tools and libraries, including:
            </p>
            
            <ul className="list-none list-inside mt-3 text-pink-300 font-bold text-xl">
              <li>React + Vite</li>
              <li>TailwindCSS</li>
              <li>React Router</li>
              <li>SweetAlert2</li>
              <li>Framer Motion</li>
              <li>Lucide Icons</li>
              <li>Fuse.js</li>
              <li>LocalStorage</li>
            </ul>

            <br />
          <p 
          className="text-lg text-whiteleading-relaxed">
            The goal was to build a clean and interactive virtual library interface while learning how to structure components, manage state, and implement animations and routing.
          </p>
        </section>

        <hr
        className="border-t-2 border-violet-300 mt-15"/>

        <section>

          <h2 
          className="text-4xl font-bold text-purple-300 mb-4">
            About Me
          </h2>

          <p 
          className="text-lg text-white leading-relaxed">
            I'm a <span className="text-purple-400 font-semibold">Computer Science student</span> trying to pursue a career as a developer.
            <br /><br />
            React is just one of the many technologies I'm starting to explore. I'm passionate about learning new tools and improving my skills step by step. This project is part of that journey, and I'm excited to keep building and discovering more in the world of web development.
          </p>

          <h2
          className="text-2xl font-bold text-purple-300 mb-4 mt-8">
            My socials
            <br />
              
          </h2>

          <div 
          className="flex justify-center gap-4">
          <img 
          src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" 
          alt="linkedin"
          className="cursor-pointer hover:bg-pink-400 p-2 rounded-md"
          onClick={() => window.open("https://www.linkedin.com/in/guilherme-jrodrigues/", "_blank")} />
          
          <img 
          src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" 
          alt="github"
          className="cursor-pointer hover:bg-pink-400 p-2 rounded-md"
          onClick={() => window.open("https://github.com/guirdgrs", "_blank")} />

          </div>

        </section>
        
      </div>
    </motion.div>
    <Footer/>
    </div>
    
  );
}

export default About;
