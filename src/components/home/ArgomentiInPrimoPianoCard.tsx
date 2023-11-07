import { Card } from "react-bootstrap";
import img from "../../assets/img/PQ_aprile2023.png";

interface ArgomentiInPrimoPianoCardProps {
  title: string;
  description: string;
}

function ArgomentiInPrimoPianoCard({ title, description }: ArgomentiInPrimoPianoCardProps) {
  return (
    <Card className="shadow argomenti-in-primo-piano-card">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title className="text-center">{title}</Card.Title>
        {/* <Card.Text>{description}</Card.Text> */}
        {/* <Button variant="danger">Vai</Button> */}
      </Card.Body>
    </Card>
  );
}

export default ArgomentiInPrimoPianoCard;
