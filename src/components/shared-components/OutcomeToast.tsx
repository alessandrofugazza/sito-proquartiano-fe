import { useState } from "react";
import { Toast } from "react-bootstrap";
import "../../styles/OutcomeToast.scss";

interface IOutcomeToast {
  showToast: boolean;
}

export default function OutcomeToast({ showToast }: IOutcomeToast) {
  // const [show, setShow] = useState(false);
  return (
    <Toast className="outcome-toast" show={showToast}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
      </Toast.Header>
      <Toast.Body>Operazione effettuata con successo.</Toast.Body>
    </Toast>
  );
}
