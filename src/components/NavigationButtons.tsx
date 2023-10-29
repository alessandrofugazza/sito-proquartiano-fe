import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationButtons() {
  return(
    <Link to="/">
      <Button variant="danger">Torna indietro</Button>
    </Link>
    // <Link to="/">
    //   <Button variant="danger">Torna alla pagina principale</Button>
    // </Link>
  )
}

export default NavigationButtons;