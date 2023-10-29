import { Col, Container, Row } from "react-bootstrap";
import img1 from "../assets/img/PQ_sagraW2023.jpg"
import HomeCard from "./HomeCard";
import HomeCarousel from "./HomeCarousel";

function WrappedHome() {
  return(
    <main>
        <HomeCarousel />
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
        <Row xs={1} md={2} lg={3} xl={4} className="gy-4">
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
    </main>
  )
}

export default WrappedHome;