import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-start">
      {/* <Button variant="link" onClick={() => navigate("/admins/profilo/modifica")}>
        Modifica profilo
      </Button> */}
      <Button variant="link" onClick={() => navigate("/admins/profilo/articoli")}>
        Articoli pubblicati
      </Button>
      <Button variant="link" onClick={() => navigate("/admins/profilo/aggiungi-articolo")}>
        Aggiungi articolo
      </Button>
    </div>
  );
}
