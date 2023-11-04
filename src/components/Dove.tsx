import { Figure } from "react-bootstrap";
import sede from "../assets/img/sede.jpg"

function Dove() {
  return(
    <>
      <p>Siamo a Quartiano, frazione di Mulazzano in provincia di Lodi.</p>
      <p>La sede e luogo ove si svolgono numerose manifestazioni è in via IV novembre 69 presso le ex scuole elementari.</p>
      <div className="my-5 d-flex justify-content-center">
        <iframe 
          title="Quartiano Google Maps" 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2803.5954727993476!2d9.41326379215727!3d45.356977596484946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786d2af0d5b2359%3A0x7e5661e649fbe9ff!2sVia%204%20Novembre%2C%2069%2C%2026837%20Quartiano%20LO%2C%20Italy!5e0!3m2!1sen!2sus!4v1699067708000!5m2!1sen!2sus" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </>
  )
}

export default Dove;