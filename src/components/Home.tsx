import { Col, Container, Row } from "react-bootstrap";
import banner from '../assets/img/cropped-01proquartiano_2012.jpg';
import HomeCard from "./HomeCard";
import img1 from "../assets/img/PQ_sagraW2023.jpg"
import img2 from "../assets/img/image.png"
import img3 from "../assets/img/PQ_aprile2023.png"
import img4 from "../assets/img/PROQUARTIANO-libri-2023.png"

function Home() {
    return (
        <>
            <header>
                <div className="mb-5">
                    <h1 className="mb-0">Associazione Proquartiano</h1>
                    <span>mangiacucù</span>
                </div>
                <img src={banner} alt="Proquartiano ponte Muzza" className="img-fluid"/>
            </header>
            <main className="my-5">
                <Row xs={1} md={2} lg={3} className="gy-4">
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
        </>
    );
}

export default Home;