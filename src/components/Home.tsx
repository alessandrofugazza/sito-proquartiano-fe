// import { Col, Container, Row } from "react-bootstrap";
import banner from '../assets/img/cropped-01proquartiano_2012.jpg';
import HomeCard from "./HomeCard";
import img1 from "../assets/img/PQ_sagraW2023.jpg"
import img2 from "../assets/img/image.png"
import img3 from "../assets/img/PQ_aprile2023.png"
import img4 from "../assets/img/PROQUARTIANO-libri-2023.png"
import "../styles/Home.scss"
import WrappedHome from "./WrappedHome";
import RouteWrapper from "./RouteWrapper";
import { Container } from 'react-bootstrap';

function Home() {
    return (
        <>
            <header>
                <div id="hero">
                    <Container className='py-5'>
                        <h1 className="mb-0">Associazione Proquartiano</h1>
                        <span >mangiacucù</span>
                    </Container>
                </div>
            </header>
            <RouteWrapper title="" description='' content={<WrappedHome />} />
        </>
    );
}

export default Home;