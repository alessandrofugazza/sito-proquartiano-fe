import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";


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
    <div className="d-flex justify-content-end gap-4 mt-5">
      {previousUrl && 
        <Button variant="danger" onClick={handleGoBack} className="fw-semibold">Torna indietro</Button>
      }
      <Link to="/">
        <Button variant="danger" className="fw-semibold">Torna alla pagina principale</Button>
      </Link>
    </div>
  )
}

export default NavigationButtons;