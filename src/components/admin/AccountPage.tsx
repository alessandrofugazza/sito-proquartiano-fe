import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-start">
      <Button variant="link" onClick={() => navigate("/modifica")}>
        Modifica profilo
      </Button>
      <Button variant="link" onClick={() => navigate("/articoli")}>
        Articoli pubblicati
      </Button>
    </div>
  );
}
