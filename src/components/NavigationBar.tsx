import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../logo.png';
import '../styles/NavigationBar.scss';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


function NavigationBar() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const location = useLocation();
  const [query, setQuery] = useState("");

  const widthBreakpoint1: number = 1070;
  const widthBreakpoint2: number = 1014;
  const widthBreakpoint3: number = 905;
  const widthBreakpoint4: number = 825;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/"><img src={logo} alt="Logo" style={{ height: '30px' }}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Item>
              <Link to="/">
                <Button variant="danger" id='home-btn' className={`${location.pathname === "/" && "bg-danger"}`}>HOME</Button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Link to="/manifestazioni">
                  <Button variant="danger" className={`${location.pathname.startsWith("/manifestazioni") && "bg-danger"}`}>MANIFESTAZIONI</Button>
                </Link>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="manifestazioni/mercatino-dei-libri">Mercatino dei libri</Dropdown.Item>
                  <Dropdown.Item as={Link} to="manifestazioni/sagra">Sagra di Quartiano</Dropdown.Item>
                  <Dropdown.Item as={Link} to="manifestazioni/concorso-corale">Concorso corale</Dropdown.Item>
                  <NavDropdown.Divider />
                  <Dropdown.Item as={Link} to="manifestazioni/">Altro</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Link to="/news">
                  <Button variant="danger" className={`${location.pathname.startsWith("/news") && "bg-danger"}`}>NEWS</Button>
                </Link>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/news/archivio-news">Archivio News</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            {(viewportWidth > widthBreakpoint4 || viewportWidth < 768) &&
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Link to="/chi-siamo">
                  <Button variant="danger" className={`${location.pathname.startsWith("/chi-siamo") && "bg-danger"}`}>CHI SIAMO</Button>
                </Link>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/chi-siamo/mangiacucu">Mangiacucù</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/chi-siamo/statuto">Statuto</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/chi-siamo/rassegna-stampa">Rassegna stampa</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>}
            {(viewportWidth > widthBreakpoint3 || viewportWidth < 768) && 
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Link to="/dove">
                  <Button variant="danger" className={`${location.pathname.startsWith("/dove") && "bg-danger"}`}>DOVE</Button>
                </Link>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/dove/come-raggiungerci">Come raggiungerci</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>}
            {(viewportWidth > widthBreakpoint2 || viewportWidth < 768) && 
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Link to="/contatti">
                  <Button variant="danger" className={`${location.pathname.startsWith("/contatti") && "bg-danger"}`}>CONTATTI</Button>
                </Link>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/contatti/link">Link</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/contatti/crediti">Crediti</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>}
            {(viewportWidth > widthBreakpoint1 || viewportWidth < 768) && 
              <Nav.Item>
                <Dropdown as={ButtonGroup}>
                  <Link to="/info-privacy">
                    <Button variant="danger" className={`${location.pathname.startsWith("/info-privacy") && "bg-danger"}`}>INFO PRIVACY</Button>
                  </Link>
                  <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/info-privacy/info-cookies">Info cookies</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>}
            {(viewportWidth <= widthBreakpoint1 &&  viewportWidth >= 768) && 
              <Nav.Item>
                <Dropdown>
                  <Dropdown.Toggle variant="danger" id="navbar-altro">
                    ALTRO
                  </Dropdown.Toggle>
                  {/* <Link to="/info-privacy">
                    <Button variant="danger" className={`${location.pathname.startsWith("/info-privacy") && "bg-danger"}`}>ALTRO</Button>
                  </Link> */}
                  {/* <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" /> */}
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/info-privacy" className='fw-semibold'>Info privacy</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/info-privacy/info-cookies">Info cookies</Dropdown.Item>
                    {(viewportWidth <= widthBreakpoint2) && 
                      <>
                        <NavDropdown.Divider />
                        <Dropdown.Item as={Link} to="/contatti" className='fw-semibold'>Contatti</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/contatti/link">Link</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/contatti/crediti">Crediti</Dropdown.Item>
                        {(viewportWidth <= widthBreakpoint3) && 
                          <>
                            <NavDropdown.Divider />
                            <Dropdown.Item as={Link} to="/dove" className='fw-semibold'>Dove</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/dove/come-raggiungerci">Come raggiungerci</Dropdown.Item>
                            {(viewportWidth <= widthBreakpoint4) && 
                              <>
                                <NavDropdown.Divider />
                                <Dropdown.Item as={Link} to="/chi-siamo" className='fw-semibold'>Chi siamo</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/chi-siamo/mangiacucu">Mangiacucù</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/chi-siamo/statuto">Statuto</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/chi-siamo/rassegna-stampa">Rassegna stampa</Dropdown.Item>
                              </>
                            }
                          </>
                        }
                      </>
                    }
                  </Dropdown.Menu>
                  {/* <Dropdown.Menu>
                  </Dropdown.Menu> */}
                </Dropdown>
              </Nav.Item>
            }
          </Nav>
          <Form className='ms-auto'>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="search"
                  value={query}
                  onChange={handleChange}
                  placeholder="Cerca qualcosa ..."
                  className=" mr-sm-2"
                />
              </Col>
              {/* <Col xs="auto">
                <Button type="submit" variant='danger'>Cerca</Button>
              </Col> */}
            </Row>
          </Form>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavigationBar;