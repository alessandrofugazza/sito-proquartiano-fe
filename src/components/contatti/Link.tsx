import "../../styles/Link.scss";

function Link() {
  return (
    <>
      <h2>Siti d’interesse:</h2>
      <ul className="siti-di-interesse d-flex flex-column gap-2">
        <li>
          <a href="http://www.comune.mulazzano.lo.it/">Amministrazione Comunale di Mulazzano</a>
        </li>
        <li>
          <a href="http://turismolodi.it/en/">Azienda promozione Turistica</a>
        </li>
        <li>
          <a href="https://www.provincia.lodi.it/">Provincia di Lodi</a>
        </li>
        <li>
          <a href="https://www.regione.lombardia.it/wps/portal/istituzionale/">Regione Lombardia</a>
        </li>
        <li>
          <a href="https://www.ilcittadino.it/">Il Cittadino</a>
        </li>
      </ul>
    </>
  );
}

export default Link;
