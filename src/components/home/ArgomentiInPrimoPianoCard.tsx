import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import placeholder from "../../assets/img/placeholder.png";

interface ArgomentiInPrimoPianoCardProps {
  title: string;
  link: string;
}

// todo make this a square
function ArgomentiInPrimoPianoCard({ title, link }: ArgomentiInPrimoPianoCardProps) {
  return (
    <>
      <Col className="d-none d-lg-block">
        <Card as={Link} to={link} className="shadow argomenti-in-primo-piano-card ">
          <Card.Img variant="top" src={placeholder} className="img-fluid" />
          <Card.Body>
            <Card.Title className="text-center">{title}</Card.Title>
            {/* <Card.Text>{description}</Card.Text> */}
            {/* <Button variant="danger">Vai</Button> */}
          </Card.Body>
        </Card>
      </Col>
      <Col className="d-lg-none">
        <Card as={Link} to={link} className="shadow text-white argomenti-in-primo-piano-card ">
          <Card.Img
            variant="top"
            src={placeholder}
            className="img-fluid"
            style={{ objectFit: "cover", height: "80px" }}
          />
          <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
            {/* // todo turn into scss if its ok */}
            <Card.Title className="text-center m-0" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
              {title}
            </Card.Title>
          </Card.ImgOverlay>
        </Card>
      </Col>
    </>
  );
}

export default ArgomentiInPrimoPianoCard;
