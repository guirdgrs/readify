import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// * FaviconManager component to manage the favicon based on the current route
// * This component uses the useLocation hook from react-router-dom to get the current location
function FaviconManager() {
  const location = useLocation();

  useEffect(() => {
    // Check the current pathname and set the favicon accordingly
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = "/public/book-open-text.svg";
    }
  }, [location.pathname]);

  // Return null as this component does not render anything to the DOM
  return null;
}

export default FaviconManager;
