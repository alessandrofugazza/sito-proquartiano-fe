import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cardImg from '../assets/img/PQ_sagraW2023.jpg';

function HomeCard() {
    return (
        <Card>
            <Card.Img variant="top" src={cardImg} />
            <Card.Body>
                <Card.Title>SAGRA DI QUARTIANO 2023</Card.Title>
                <Card.Text>
                    Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!
                </Card.Text>
                <Button variant="danger">Leggi tutto</Button>
            </Card.Body>
        </Card>
    );
}

export default HomeCard;