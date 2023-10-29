import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


function NavigationButtons() {
  
  const previousUrl = sessionStorage.getItem('previousUrl');
  sessionStorage.setItem("previousUrl", useLocation().pathname)

  return(
    <div className="d-flex justify-content-end gap-4">
      {previousUrl && <Link to={previousUrl}>
        <Button variant="danger">Torna indietro</Button>
      </Link>}
      <Link to="/">
        <Button variant="danger">Torna alla pagina principale</Button>
      </Link>
    </div>
  )
}

export default NavigationButtons;