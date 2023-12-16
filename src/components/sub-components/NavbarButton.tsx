import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { Button, ButtonGroup, Dropdown, NavDropdown } from "react-bootstrap";

const getUrlSubpathFromString = (str: string) => {
  return str.toLowerCase().split(" ").join("-");
};

// ^ use with... for the funcitons
export default function NavbarButton({
  mainSection,
  subsections,
  isCollapsed = false,
  altro = false,
  isLast = false,
}: {
  mainSection: string;
  subsections: string[];
  isCollapsed?: boolean;
  altro?: boolean;
  isLast?: boolean;
}) {
  const location = useLocation();
  const pathifiedMainsection = getUrlSubpathFromString(mainSection);
  return isCollapsed ? (
    <>
      <Dropdown.Item as={Link} to={`/${pathifiedMainsection}`} className="fw-semibold">
        {mainSection.toUpperCase()}
      </Dropdown.Item>
      {subsections.map(subsection => {
        const pathifiedSubsection = getUrlSubpathFromString(subsection);
        return (
          <Dropdown.Item as={Link} to={`${pathifiedMainsection}/${pathifiedSubsection}`}>
            {subsection}
          </Dropdown.Item>
        );
      })}
      {!isLast && <NavDropdown.Divider />}
    </>
  ) : (
    <Nav.Item>
      <Dropdown as={ButtonGroup}>
        <Link to={`/${pathifiedMainsection}`}>
          <Button variant="danger" className={`${location.pathname.startsWith(pathifiedMainsection) && "bg-danger"}`}>
            {mainSection.toUpperCase()}
          </Button>
        </Link>
        <Dropdown.Toggle split variant="danger" />
        <Dropdown.Menu>
          {subsections.map(subsection => {
            const pathifiedSubsection = getUrlSubpathFromString(subsection);
            return (
              <Dropdown.Item
                as={Link}
                to={`${pathifiedMainsection}/${pathifiedSubsection}`}
                className={`${
                  location.pathname.startsWith(`/${pathifiedMainsection}/${pathifiedSubsection}`) &&
                  "bg-danger fw-semibold"
                }`}
              >
                {subsection}
              </Dropdown.Item>
            );
          })}

          {altro && (
            <>
              <NavDropdown.Divider />
              <Dropdown.Item as={Link} to="manifestazioni/">
                Altro
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
}
