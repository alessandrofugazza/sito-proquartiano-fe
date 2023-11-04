import { Col, Row } from "react-bootstrap";
import ArgomentiInPrimoPianoCard from "./ArgomentiInPrimoPianoCard";
import { Link } from "react-router-dom";
import '../../styles/ArgomentiInPrimoPiano.scss';

function ArgomentiInPrimoPiano() {
  return(
    <div className="argomenti-in-primo-piano">
      <h2 className="text-center mb-4">Argomenti in primo piano</h2>
      <Row xs="2" lg="4" className="gy-4">
        <Col>
          <Link to={'/'}>
            <ArgomentiInPrimoPianoCard title="Associazione" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
          </Link>
        </Col>
        <Col>
          <Link to={'/'}>
            <ArgomentiInPrimoPianoCard title="Concorso cori" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
          </Link>
        </Col>
        <Col>
          <Link to={'/'}>
            <ArgomentiInPrimoPianoCard title="Manifestazioni" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
          </Link>
        </Col>
        <Col>
          <Link to={'/'}>
            <ArgomentiInPrimoPianoCard title="Rassegna stampa" description="placeholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholderplaceholder" />
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default ArgomentiInPrimoPiano;