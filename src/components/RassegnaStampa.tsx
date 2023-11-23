import { Accordion } from "react-bootstrap";

function RassegnaStampa() {
  const years = [2023, 2022, 2021, 2020];
  return (
    <Accordion>
      {years.map((year, index) => {
        return (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>{year}</Accordion.Header>
            <Accordion.Body>placeholder</Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default RassegnaStampa;
