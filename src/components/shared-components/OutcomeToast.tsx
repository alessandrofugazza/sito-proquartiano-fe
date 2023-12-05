import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "../../styles/OutcomeToast.scss";

interface IOutcomeToast {
  showToast: boolean;
  isSuccess: boolean;
}

export default function OutcomeToast({ showToast, isSuccess }: IOutcomeToast) {
  // const [show, setShow] = useState(false);
  return (
    <ToastContainer>
      <Toast className="outcome-toast" show={showToast}>
        <Toast.Header>
          <i className="bi bi-check2 fs-3 me-1"></i>
          <strong className="me-auto">Successo!</strong>
        </Toast.Header>
        <Toast.Body>Operazione effettuata con successo.</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
