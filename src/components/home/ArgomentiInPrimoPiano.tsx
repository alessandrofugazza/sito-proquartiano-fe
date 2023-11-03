import { Col, Row } from "react-bootstrap";
import ArgomentiInPrimoPianoCard from "./ArgomentiInPrimoPianoCard";

function ArgomentiInPrimoPiano() {
  return(
    <>
      <h2 className="text-center mb-4">Argomenti in primo piano</h2>
      <Row xs="4">
        <Col>
          <ArgomentiInPrimoPianoCard title="Associazione" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
        </Col>
        <Col>
          <ArgomentiInPrimoPianoCard title="Concorso cori" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
        </Col>
        <Col>
          <ArgomentiInPrimoPianoCard title="Manifestazioni" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
        </Col>
        <Col>
          <ArgomentiInPrimoPianoCard title="Rassegna stampa" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
        </Col>
      </Row>
    </>
  )
}

export default ArgomentiInPrimoPiano;