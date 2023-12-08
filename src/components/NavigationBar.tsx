import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../logo.png";
import "../styles/NavigationBar.scss";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "./sub-components/Search";
import { Collapse, Offcanvas } from "react-bootstrap";
import { OffcanvasProps } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

interface UserOffCanvasProps extends OffcanvasProps {
  name: string;
}
function NavigationBar() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const location = useLocation();

  // TODO: this whole thing is horrible but have no idea how to implement it otherwise
  const temp = 43;
  const widthBreakpoint1: number = 1346 + temp;
  const widthBreakpoint2: number = 1285 + temp;
  const widthBreakpoint3: number = 1170 + temp;
  const widthBreakpoint4: number = 1080 + temp;
  const widthBreakpoint5: number = 952 + temp;
  const widthBreakpoint6: number = 863 + temp;

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
  }, []);

  const favorites = useSelector((state: RootState) => state.favorites.content);
  const navigate = useNavigate();

  const UserOffCanvas: React.FC<UserOffCanvasProps> = ({ name, ...props }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);

    return (
      <>
        <div className="ms-3 user-icon" onClick={handleShow}>
          <i className="bi bi-person-circle text-white fs-3"></i>
        </div>
        {/* // ! closing offcanvas causes navbar to transition */}
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Area utenti</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ButtonGroup vertical>
              {/* // todo BAD but works for 0.1  */}
              {localStorage.getItem("loginToken") ? (
                <Button variant="link" className="text-start" onClick={() => navigate("admins")}>
                  Area amministratore
                </Button>
              ) : (
                <Button variant="link" className="text-start" onClick={() => navigate("auth/login")}>
                  Login / Registrazione
                </Button>
              )}
              <Button
                variant="link"
                className="text-start"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                Preferiti<i className="bi bi-caret-down-fill"></i>
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text px-0 ">
                  {/* // todo where the fuck is the left padding coming from */}
                  <ButtonGroup vertical className="ps-2 border-start">
                    {favorites.map(favorite => (
                      <Button
                        onClick={() => navigate(favorite.url)}
                        variant="link"
                        key={favorite.url}
                        className="text-start"
                      >
                        {favorite.title}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </Collapse>
            </ButtonGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  };
  return (
    // todo try this?
    // <Navbar expand="md" bg="light" data-bs-theme="light" sticky="top">
    <>
      <Navbar expand="md" bg="dark" data-bs-theme="dark" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Logo" style={{ height: "30px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Item>
                <Link to="/">
                  <Button variant="danger" className={`no-dropdown ${location.pathname === "/" && "bg-danger"}`}>
                    HOME
                  </Button>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Dropdown as={ButtonGroup}>
                  <Link to="/manifestazioni">
                    <Button
                      variant="danger"
                      className={`${location.pathname.startsWith("/manifestazioni") && "bg-danger"}`}
                    >
                      MANIFESTAZIONI
                    </Button>
                  </Link>
                  <Dropdown.Toggle split variant="danger" />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to="manifestazioni/mercatino-dei-libri"
                      className={`${
                        location.pathname.startsWith("/manifestazioni/mercatino-dei-libri") && "bg-danger fw-semibold"
                      }`}
                    >
                      Mercatino dei libri
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="manifestazioni/sagra"
                      className={`${location.pathname.startsWith("/manifestazioni/sagra") && "bg-danger fw-semibold"}`}
                    >
                      Sagra di Quartiano
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="manifestazioni/concorso-corale"
                      className={`${
                        location.pathname.startsWith("/manifestazioni/concorso-corale") && "bg-danger fw-semibold"
                      }`}
                    >
                      Concorso corale
                    </Dropdown.Item>
                    <NavDropdown.Divider />
                    <Dropdown.Item as={Link} to="manifestazioni/">
                      Altro
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
              {(viewportWidth > widthBreakpoint6 || viewportWidth < 768) && (
                <Nav.Item>
                  <Link to="/rassegna-stampa">
                    <Button
                      variant="danger"
                      className={`no-dropdown ${location.pathname === "/rassegna-stampa" && "bg-danger"}`}
                    >
                      RASSEGNA STAMPA
                    </Button>
                  </Link>
                </Nav.Item>
              )}
              {(viewportWidth > widthBreakpoint5 || viewportWidth < 768) && (
                <Nav.Item>
                  <Dropdown as={ButtonGroup}>
                    <Link to="/news">
                      <Button variant="danger" className={`${location.pathname.startsWith("/news") && "bg-danger"}`}>
                        NEWS
                      </Button>
                    </Link>
                    <Dropdown.Toggle split variant="danger" />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/news/archivio-news"
                        className={`${location.pathname.startsWith("/news/archivio-news") && "bg-danger fw-semibold"}`}
                      >
                        Archivio News
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
              )}
              {(viewportWidth > widthBreakpoint4 || viewportWidth < 768) && (
                <Nav.Item>
                  <Dropdown as={ButtonGroup}>
                    <Link to="/chi-siamo">
                      <Button
                        variant="danger"
                        className={`${location.pathname.startsWith("/chi-siamo") && "bg-danger"}`}
                      >
                        CHI SIAMO
                      </Button>
                    </Link>
                    <Dropdown.Toggle split variant="danger" />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/chi-siamo/mangiacucu"
                        className={`${
                          location.pathname.startsWith("/chi-siamo/mangiacucu") && "bg-danger fw-semibold"
                        }`}
                      >
                        Mangiacucù
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/chi-siamo/statuto"
                        className={`${location.pathname.startsWith("/chi-siamo/statuto") && "bg-danger fw-semibold"}`}
                      >
                        Statuto
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
              )}
              {(viewportWidth > widthBreakpoint3 || viewportWidth < 768) && (
                <Nav.Item>
                  <Dropdown as={ButtonGroup}>
                    <Link to="/dove">
                      <Button variant="danger" className={`${location.pathname.startsWith("/dove") && "bg-danger"}`}>
                        DOVE
                      </Button>
                    </Link>
                    <Dropdown.Toggle split variant="danger" />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/dove/come-raggiungerci"
                        className={`${
                          location.pathname.startsWith("/dove/come-raggiungerci") && "bg-danger fw-semibold"
                        }`}
                      >
                        Come raggiungerci
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
              )}
              {(viewportWidth > widthBreakpoint2 || viewportWidth < 768) && (
                <Nav.Item>
                  <Dropdown as={ButtonGroup}>
                    <Link to="/contatti">
                      <Button
                        variant="danger"
                        className={`${location.pathname.startsWith("/contatti") && "bg-danger"}`}
                      >
                        CONTATTI
                      </Button>
                    </Link>
                    <Dropdown.Toggle split variant="danger" />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/contatti/link"
                        className={`${location.pathname.startsWith("/contatti/link") && "bg-danger fw-semibold"}`}
                      >
                        Link
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/contatti/crediti"
                        className={`${location.pathname.startsWith("/contatti/crediti") && "bg-danger fw-semibold"}`}
                      >
                        Crediti
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
              )}
              {(viewportWidth > widthBreakpoint1 || viewportWidth < 768) && (
                <Nav.Item>
                  <Dropdown as={ButtonGroup}>
                    <Link to="/info-privacy">
                      <Button
                        variant="danger"
                        className={`${location.pathname.startsWith("/info-privacy") && "bg-danger"}`}
                      >
                        INFO PRIVACY
                      </Button>
                    </Link>
                    <Dropdown.Toggle split variant="danger" />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/info-privacy/info-cookies"
                        className={`${
                          location.pathname.startsWith("/info-privacy/info-cookies") && "bg-danger fw-semibold"
                        }`}
                      >
                        Info cookies
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
              )}
              {viewportWidth >= 768 && viewportWidth <= widthBreakpoint1 && (
                <Nav.Item>
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" id="navbar-altro">
                      ALTRO
                    </Dropdown.Toggle>
                    {/* <Link to="/info-privacy">
                      <Button variant="danger" className={`${location.pathname.startsWith("/info-privacy") && "bg-danger"}`}>ALTRO</Button>
                    </Link> */}
                    {/* <Dropdown.Toggle split variant="danger" /> */}
                    <Dropdown.Menu>
                      {viewportWidth <= widthBreakpoint6 && (
                        <>
                          <Dropdown.Item as={Link} to="/rassegna-stampa" className="fw-semibold">
                            Rassegna stampa
                          </Dropdown.Item>
                          <NavDropdown.Divider />
                        </>
                      )}
                      {viewportWidth <= widthBreakpoint5 && (
                        <>
                          <Dropdown.Item as={Link} to="/news" className="fw-semibold">
                            News
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/news/archivio-news">
                            Archivio News
                          </Dropdown.Item>
                          <NavDropdown.Divider />
                        </>
                      )}
                      {viewportWidth <= widthBreakpoint4 && (
                        <>
                          <Dropdown.Item as={Link} to="/chi-siamo" className="fw-semibold">
                            Chi siamo
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/chi-siamo/mangiacucu">
                            Mangiacucù
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/chi-siamo/statuto">
                            Statuto
                          </Dropdown.Item>
                          <NavDropdown.Divider />
                        </>
                      )}
                      {viewportWidth <= widthBreakpoint3 && (
                        <>
                          <Dropdown.Item as={Link} to="/dove" className="fw-semibold">
                            Dove
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/dove/come-raggiungerci">
                            Come raggiungerci
                          </Dropdown.Item>
                          <NavDropdown.Divider />
                        </>
                      )}

                      {viewportWidth <= widthBreakpoint2 && (
                        <>
                          <Dropdown.Item as={Link} to="/contatti" className="fw-semibold">
                            Contatti
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/contatti/link">
                            Link
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/contatti/crediti">
                            Crediti
                          </Dropdown.Item>
                          <NavDropdown.Divider />
                        </>
                      )}
                      {viewportWidth <= widthBreakpoint1 && (
                        <>
                          <Dropdown.Item as={Link} to="/info-privacy" className="fw-semibold">
                            Info privacy
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/info-privacy/info-cookies">
                            Info cookies
                          </Dropdown.Item>
                        </>
                      )}
                    </Dropdown.Menu>
                    {/* <Dropdown.Menu>
                    </Dropdown.Menu> */}
                  </Dropdown>
                </Nav.Item>
              )}
            </Nav>
            <Search />
            <UserOffCanvas placement="end" name="right" />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
