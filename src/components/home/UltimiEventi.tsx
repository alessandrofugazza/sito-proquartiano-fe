import HomeCard from "./HomeCard";
import img1 from "../../assets/img/PQ_sagraW2023.jpg"
import { Col, Row } from 'react-bootstrap';

function UltimiEventi() {
  return(
    <>
      <h3 className="text-center" style={{marginTop: '2em'}}>Ultimi eventi</h3>
        <Row className="mt-5 mb-4">
            <Col>
                <HomeCard 
                    imgSrc={img1} 
                    date="29 Agosto 2023"
                    author="DC"
                    tags={["associazione"]}
                    title="SAGRA DI QUARTIANO 2023" 
                    description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
                />
            </Col>
        </Row>
        <Row xs={1} md={2} lg={3} xxl={4} className="gy-4">
            <Col>
                <HomeCard 
                    imgSrc={img1} 
                    date="29 Agosto 2023"
                    author="DC"
                    tags={["associazione"]}
                    title="SAGRA DI QUARTIANO 2023" 
                    description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
                />
            </Col>
            <Col>
                <HomeCard 
                    imgSrc={img1} 
                    date="29 Agosto 2023"
                    author="DC"
                    tags={["associazione"]}
                    title="SAGRA DI QUARTIANO 2023" 
                    description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
                />
            </Col>
            <Col>
                <HomeCard 
                    imgSrc={img1} 
                    date="29 Agosto 2023"
                    author="DC"
                    tags={["associazione"]}
                    title="SAGRA DI QUARTIANO 2023" 
                    description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
                />
            </Col>
            <Col>
                <HomeCard 
                    imgSrc={img1} 
                    date="29 Agosto 2023"
                    author="DC"
                    tags={["associazione"]}
                    title="SAGRA DI QUARTIANO 2023" 
                    description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
                />
            </Col>
            <Col>
                <HomeCard 
                    imgSrc={img1} 
                    date="29 Agosto 2023"
                    author="DC"
                    tags={["associazione"]}
                    title="SAGRA DI QUARTIANO 2023" 
                    description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
                />
            </Col>
            <Col>
                <HomeCard 
                    imgSrc={img1} 
                    date="29 Agosto 2023"
                    author="DC"
                    tags={["associazione"]}
                    title="SAGRA DI QUARTIANO 2023" 
                    description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
                />
            </Col>
            <Col>
                <HomeCard 
                    imgSrc={img1} 
                    date="29 Agosto 2023"
                    author="DC"
                    tags={["associazione"]}
                    title="SAGRA DI QUARTIANO 2023" 
                    description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
                />
            </Col>
            <Col>
                <HomeCard 
                    imgSrc={img1} 
                    date="29 Agosto 2023"
                    author="DC"
                    tags={["associazione"]}
                    title="SAGRA DI QUARTIANO 2023" 
                    description="Ecco il programma delle iniziative promosse da Proquartiano in occasione ella Sagra 2023. Siamo pronti ad accogliervi!"
                />
            </Col>
            
        </Row>
    </>
  )
}

export default UltimiEventi;