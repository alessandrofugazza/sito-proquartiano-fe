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
import NavbarButton from "./sub-components/NavbarButton";

interface UserOffCanvasProps extends OffcanvasProps {
  name: string;
}

// todo highlight dropdown btn when hovering over main button. why such a simple feature needs to be so complicated to implement
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
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Area utenti</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex flex-column h-100">
              <ButtonGroup vertical>
                {/* // ! todo BAD but works for 0.1  */}
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
                  <div>
                    <span>Preferiti</span>
                    {/* // ? use ::after */}
                    <i className="bi bi-caret-down-fill ms-1" style={{ fontSize: "0.8rem" }}></i>
                  </div>
                </Button>
                <Collapse in={open}>
                  <div id="example-collapse-text px-0 ">
                    {/* // todo where the fuck is the left padding coming from */}
                    <ButtonGroup vertical className="ps-2 border-start">
                      {favorites.length > 0 ? (
                        favorites.map(favorite => (
                          <Button
                            onClick={() => navigate(favorite.url)}
                            variant="link"
                            key={favorite.url}
                            className="text-start"
                          >
                            {favorite.title}
                          </Button>
                        ))
                      ) : (
                        // todo this
                        <p>
                          <Button variant="light" className="text-start">
                            Per aggiungere una pagina ai preferiti, cliccare sull'icona del segnalibro in alto a destra
                            presente in ogni pagina
                          </Button>
                        </p>
                      )}
                    </ButtonGroup>
                  </div>
                </Collapse>
              </ButtonGroup>
              {localStorage.getItem("loginToken") && (
                <div
                  className=" mt-auto d-flex align-items-center justify-content-end"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    localStorage.setItem("loginToken", "");
                    setTimeout(() => {
                      navigate("/");
                    }, 2000);
                  }}
                >
                  <Button variant="link">Logout</Button>
                  <i className="bi bi-box-arrow-right text-danger"></i>
                </div>
              )}
            </div>
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
              <NavbarButton
                mainSection="manifestazioni"
                subsections={["Mercatino dei libri", "Sagra di Quartiano", "Concorso corale"]}
                altro
              />
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
                <NavbarButton mainSection="news" subsections={["Archivio News"]} />
              )}
              {(viewportWidth > widthBreakpoint4 || viewportWidth < 768) && (
                <NavbarButton mainSection="chi siamo" subsections={["Mangiacucù", "Statuto"]} />
              )}
              {(viewportWidth > widthBreakpoint3 || viewportWidth < 768) && (
                <NavbarButton mainSection="dove" subsections={["Come Raggiungerci"]} />
              )}
              {(viewportWidth > widthBreakpoint2 || viewportWidth < 768) && (
                <NavbarButton mainSection="contatti" subsections={["Link", "Crediti"]} />
              )}
              {(viewportWidth > widthBreakpoint1 || viewportWidth < 768) && (
                <NavbarButton mainSection="info privacy" subsections={["Info Cookies", "Crediti"]} />
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
                        <NavbarButton mainSection="news" subsections={["Archivio News"]} isCollapsed />
                      )}
                      {viewportWidth <= widthBreakpoint4 && (
                        <NavbarButton mainSection="chi siamo" subsections={["Mangiacucù", "Statuto"]} isCollapsed />
                      )}
                      {viewportWidth <= widthBreakpoint3 && (
                        <NavbarButton mainSection="dove" subsections={["Come Raggiungerci"]} isCollapsed />
                      )}

                      {viewportWidth <= widthBreakpoint2 && (
                        <NavbarButton mainSection="contatti" subsections={["Link", "Crediti"]} isCollapsed />
                      )}
                      {viewportWidth <= widthBreakpoint1 && (
                        <NavbarButton
                          mainSection="info privacy"
                          subsections={["Info Cookies", "Crediti"]}
                          isCollapsed
                          isLast
                        />
                      )}
                    </Dropdown.Menu>
                    {/* <Dropdown.Menu>
                    </Dropdown.Menu> */}
                  </Dropdown>
                </Nav.Item>
              )}
            </Nav>
            <Search />
            {/* // ^ ugly as sin but will do for now */}
            <Navbar as="div" className="p-0">
              <UserOffCanvas placement="end" name="right" />
            </Navbar>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
