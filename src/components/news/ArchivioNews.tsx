import { Accordion } from "react-bootstrap";
import YearArchive from "./YearArchive";

function ArchivioNews() {
  const years = [2023, 2022, 2021, 2020];
  return (
    // TODO: make shared component
    <Accordion>
      {years.map((year, index) => {
        return (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>{year}</Accordion.Header>
            <Accordion.Body>
              <YearArchive year={year.toString()} />
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default ArchivioNews;
