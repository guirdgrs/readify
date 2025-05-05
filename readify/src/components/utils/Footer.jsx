function Footer() {
    return (
      <footer 
      className="bg-violet-500 shadow-md text-pink-300 text-sm py-6 mt-auto text-center border-t border-gray-700">

        <p>
          © {new Date().getFullYear()} Readify · Developed by 
          
          <a 
          href="https://github.com/guirdgrs" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white hover:underline"> Guilherme Rodrigues
          </a>

        </p>
        <p><i>Educational project using React</i></p>
      </footer>
    );
  }
  
  export default Footer;
  