import { Accordion } from "react-bootstrap";
import YearArchive from "./YearArchive";

function ArchivioNews() {
  return(
    <>
      <header>
        <h1>Archivio news</h1>
        <p>In questa pagina potete cercare le notizie in base a mese ed anno di pubblicazione</p>
      </header>
      <main>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>2023</Accordion.Header>
            <Accordion.Body>
              <YearArchive year="2023"/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>2022</Accordion.Header>
            <Accordion.Body>
              <YearArchive year="2022" />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>2021</Accordion.Header>
            <Accordion.Body>
              <YearArchive year="2021" />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>2020</Accordion.Header>
            <Accordion.Body>
              <YearArchive year="2020" />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </main>
    </>
  );
}

export default ArchivioNews;