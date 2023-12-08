import Container from "react-bootstrap/Container";
import "../styles/Footer.scss";

function Footer() {
  return (
    <footer>
      <div className="py-3">
        <Container className="d-flex justify-content-between">
          <div>
            <p className="my-0">
              Via IV Novembre 65
              <br />
              26837 - Quartiano di Mulazzano (LO)
              <br />
              Italia
            </p>
          </div>
          <div className="d-flex gap-3">
            <a
              href="https://m.facebook.com/profile.php/?id=100090483283325"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit" }}
            >
              <i className="bi bi-facebook fs-4 text-align-center"></i>
            </a>
            <a
              href="https://www.youtube.com/@proquartiano"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit" }}
            >
              <i className="bi bi-youtube  fs-4 text-align-center"></i>
            </a>
          </div>
        </Container>
      </div>
      <div className="py-3">
        <Container>
          <p className="my-0">Copyright &copy; 2023 Associazione Proquartiano. Tutti i diritti riservati.</p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
