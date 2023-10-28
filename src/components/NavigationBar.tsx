import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../logo.png';


function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"><img src={logo} alt="Logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Item><Button variant="success">HOME</Button></Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="success">NEWS</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Archivio News</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="success">CHI SIAMO</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Mangiacucù</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Statuto</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Rassegna stampa</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="success">DOVE</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Come raggiungerci</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="success">CONTATTI</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Link</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Crediti</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
            <Nav.Item>
              <Dropdown as={ButtonGroup}>
                <Button variant="success">INFO PRIVACY</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Info cookies</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;