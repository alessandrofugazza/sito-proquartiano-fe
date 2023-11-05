import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/NavigationButtons.scss'


function NavigationButtons() {
  
  const previousUrl = sessionStorage.getItem('previousUrl');
  if (!previousUrl) {
    sessionStorage.setItem("previousUrl", window.location.href)
  }

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return(
    <div className="d-flex justify-content-center justify-content-md-end gap-4 mt-5 navigation-buttons">
      {previousUrl && 
        <Button variant="danger" onClick={handleGoBack} className="fw-semibold shadow border border-dark">Torna indietro</Button>
      }
      <Link to="/">
        <Button variant="danger" className="fw-semibold shadow border border-dark">Torna alla pagina principale</Button>
      </Link>
    </div>
  )
}

export default NavigationButtons;