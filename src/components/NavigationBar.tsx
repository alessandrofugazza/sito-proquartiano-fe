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


function NavigationBar() {
  const location = useLocation();
  return (
    <Navbar expand="sm" bg="dark" data-bs-theme="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home"><img src={logo} alt="Logo" style={{ height: '30px' }}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {/* <Nav.Item><Button variant={`${location.pathname === "/" && "danger"}`} id='home-btn'>HOME</Button></Nav.Item> */}
            <Nav.Item><Button variant="danger" id='home-btn' className={`${location.pathname === "/" && "bg-danger"}`}>HOME</Button></Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="danger" className={`${location.pathname === "/news" && "bg-danger"}`}>NEWS</Button>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Archivio News</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="danger" className={`${location.pathname === "/chi-siamo" && "bg-danger"}`}>CHI SIAMO</Button>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Mangiacucù</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Statuto</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Rassegna stampa</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="danger" className={`${location.pathname === "/dove" && "bg-danger"}`}>DOVE</Button>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Come raggiungerci</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="danger" className={`${location.pathname === "/contatti" && "bg-danger"}`}>CONTATTI</Button>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Link</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Crediti</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="danger" className={`${location.pathname === "/info-privacy" && "bg-danger"}`}>INFO PRIVACY</Button>
                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Info cookies</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
          <Form className='ms-auto'>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Cerca qualcosa ..."
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" variant='danger'>Cerca</Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavigationBar;