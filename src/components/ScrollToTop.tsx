import { useEffect } from "react";
import { useLocation } from "react-router-dom";



function ScrollToTop() {
  const {pathname} = useLocation();

  // TODO fix scroll behavior to instant
  useEffect(() => {
    // window.moveTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;