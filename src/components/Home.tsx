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