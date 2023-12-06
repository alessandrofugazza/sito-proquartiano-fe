import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ? review
function ScrollToTop() {
  const { pathname } = useLocation();

  // TODO fix scroll behavior to instant
  useEffect(() => {
    // window.moveTo(0, 0);
    window.scrollTo(0, 0);
    const h1Element = document.querySelector("h1");
    document.title =
      pathname !== "/" && h1Element && h1Element.textContent
        ? h1Element.textContent.concat(" - Associazione Proquartiano")
        : "Associazione Proquartiano";
  }, [pathname]);

  return null;
}

export default ScrollToTop;
