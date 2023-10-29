import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../styles/HomeCard.scss"
import { Calendar } from 'react-bootstrap-icons';

interface HomeCardProps {
  imgSrc: string;
  tags: string[];
  title: string;
  date: string;
  author: string;
  description: string;
}

function HomeCard({imgSrc, tags, title, date, author, description}: HomeCardProps) {
    return (
        <Card>
            <Card.Img variant="top" src={imgSrc} className='img-fluid' style={{maxHeight: '400px', objectFit: 'contain'}}/>
            <Card.Body>
                {tags.map(tag => (
                    <Button key={tag} variant='danger' size="sm" className='tag me-1 mb-2 py-0'>{tag}</Button>
                ))}
                <Card.Title className='my-2'>{title}</Card.Title>
                <div className='d-flex date-author'>
                    <i className="bi bi-calendar-event"></i>
                    <span className='me-3'>{date}</span>
                    <i className="bi bi-person-fill"></i>
                    <span>{author}</span>
                </div>
                <Card.Text className='my-4'>
                    {description}
                </Card.Text>
                <Button variant="danger" size="sm">Leggi tutto</Button>
            </Card.Body>
        </Card>
    );
}

export default HomeCard;