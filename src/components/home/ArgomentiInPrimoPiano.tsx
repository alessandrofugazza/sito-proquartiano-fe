import { Col, Row } from "react-bootstrap";
import ArgomentiInPrimoPianoCard from "./ArgomentiInPrimoPianoCard";

function ArgomentiInPrimoPiano() {
  return(
    <>
      <h2 className="text-center mb-4">Argomenti in primo piano</h2>
      <Row xs="4">
        <Col>
          <ArgomentiInPrimoPianoCard title="placeholder" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
        </Col>
        <Col>
          <ArgomentiInPrimoPianoCard title="placeholder" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
        </Col>
        <Col>
          <ArgomentiInPrimoPianoCard title="placeholder" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
        </Col>
        <Col>
          <ArgomentiInPrimoPianoCard title="placeholder" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
        </Col>
      </Row>
    </>
  )
}

export default ArgomentiInPrimoPiano;