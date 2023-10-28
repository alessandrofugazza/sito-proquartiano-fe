import Container from 'react-bootstrap/Container';
import "../styles/Footer.scss"

function Footer() {
    return(
        <footer>
            <div className="py-3">
                <Container   >
                    <p className='my-0'>
                        Via IV Novembre 69<br />
                        26837 - Quartiano di Mulazzano (LO)<br />
                        Italia<br />
                        Iscritta al registro provinciale delle associazioni
                    </p>
                </ Container>
            </div>
            <div  className="py-3">
                <Container   >
                    <p className='my-0'>Copyright © 2023 Associazione Proquartiano. Tutti i diritti riservati.</p>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;