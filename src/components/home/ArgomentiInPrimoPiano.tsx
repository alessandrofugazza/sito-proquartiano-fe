import { Col, Row } from "react-bootstrap";
import ArgomentiInPrimoPianoCard from "./ArgomentiInPrimoPianoCard";
import { Link } from "react-router-dom";
import "../../styles/ArgomentiInPrimoPiano.scss";

function ArgomentiInPrimoPiano() {
  return (
    // fb do we really want this
    <div className="argomenti-in-primo-piano">
      <h2 className="text-center mb-4 h2">Argomenti in primo piano</h2>
      {/* // ? wasnt changing gx bad for the container? */}
      <Row xs="2" lg="4" className="g-lg-4 g-3 ">
        <ArgomentiInPrimoPianoCard title="Associazione" link="/articoli?categoria=associazione" />
        <ArgomentiInPrimoPianoCard title="Concorso cori" link="/manifestazioni/concorso-corale" />
        <ArgomentiInPrimoPianoCard title="Manifestazioni" link="/manifestazioni" />
        <ArgomentiInPrimoPianoCard title="Rassegna stampa" link="/rassegna-stampa" />
      </Row>
    </div>
  );
}

export default ArgomentiInPrimoPiano;
