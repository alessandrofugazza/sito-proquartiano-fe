import { Figure, Placeholder } from "react-bootstrap";
import sede from "../assets/img/sede.jpg";
import { useState } from "react";

function Dove() {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  return (
    <>
      <p>
        Siamo a <strong className="fw-semibold">Quartiano, frazione di Mulazzano</strong> in provincia di Lodi.
      </p>
      <p>
        La sede e luogo ove si svolgono numerose manifestazioni è in{" "}
        <strong className="fw-semibold">via IV novembre 65</strong> presso le ex scuole elementari.
      </p>
      <div className="my-5 d-flex flex-column align-items-center">
        {!isIframeLoaded && (
          <Placeholder animation="glow">
            <Placeholder style={{ width: "600px", height: "450px" }} />
          </Placeholder>
        )}
        <iframe
          title="Quartiano Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2803.593299008511!2d9.415303576366423!3d45.357021471072336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786d2af729df62f%3A0x5805627dad1c77c0!2sVia%204%20Novembre%2C%2065%2C%2026837%20Quartiano%20LO%2C%20Italia!5e0!3m2!1sit!2sus!4v1701426954190!5m2!1sit!2sus"
          // width="600"
          // height="450"
          style={{ border: 0, width: "600px", height: isIframeLoaded ? "450px" : "0px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsIframeLoaded(true)}
        ></iframe>
      </div>
      <div className="d-flex justify-content-center">
        <Figure>
          <Figure.Image
            width={600}
            // height={180}
            alt="171x180"
            src={sede}
          />
          <Figure.Caption>ex scuole elementari di Quartiano</Figure.Caption>
        </Figure>
      </div>
    </>
  );
}

export default Dove;
