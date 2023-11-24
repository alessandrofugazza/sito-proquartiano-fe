import img1 from "../assets/img/PQ_sagraW2023.jpg";

import { Button, Card, Col, Row } from "react-bootstrap";

export default function TestPage() {
  return (
    <>
      <Row className="gy-4">
        <Col xs={12}>
          <Card className="flex-row">
            <Card.Img variant="top" src={img1} className="img-fluid w-25" style={{ objectFit: "contain" }} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="flex-row">
            <Card.Img variant="top" src={img1} className="img-fluid w-25" style={{ objectFit: "contain" }} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="flex-row">
            <Card.Img variant="top" src={img1} className="img-fluid w-25" style={{ objectFit: "contain" }} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
