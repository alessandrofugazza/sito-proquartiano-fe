import { Col, Container, Row } from "react-bootstrap";
import banner from '../assets/img/cropped-01proquartiano_2012.jpg';
import HomeCard from "./HomeCard";


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
                <Row xs={1} md={2}>
                    <Col><HomeCard /></Col>
                    <Col><HomeCard /></Col>
                    <Col><HomeCard /></Col>
                    <Col><HomeCard /></Col>
                </Row>
            </main>
        </>
    );
}

export default Home;