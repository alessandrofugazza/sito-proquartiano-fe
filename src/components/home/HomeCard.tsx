import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../../styles/HomeCard.scss"
import ArticleDateAuthorTag from '../sub-components/ArticleDateAuthorTag';

interface HomeCardProps {
  imgSrc: string;
  categories: string[];
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
}

function HomeCard({imgSrc, categories, title, date, author, tags, description}: HomeCardProps) {
    return (
        <Card className='shadow'>
            <Card.Img variant="top" src={imgSrc} className='img-fluid' style={{maxHeight: '400px', objectFit: 'contain'}}/>
            <Card.Body>
                {categories.map(category => (
                    <Button key={category} variant='danger' size="sm" className='category me-1 mb-2 py-0'>{category}</Button>
                ))}
                <Card.Title className='my-2'>{title}</Card.Title>
                <ArticleDateAuthorTag date={date} author={author} tags={tags} />
                <Card.Text className='my-4'>
                    {description}
                </Card.Text>
                <div className="text-end">
                <Button variant="danger" size="sm" >Leggi tutto</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default HomeCard;