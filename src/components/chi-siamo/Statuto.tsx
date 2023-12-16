import Alert from "react-bootstrap/Alert";
import "../../styles/Statuto.scss";

function Statuto() {
  return (
    <>
      <Alert className="bg-danger text-white mb-4" style={{ paddingLeft: "4.5em" }}>
        <Alert.Heading>Art. 1 – DENOMINAZIONE – SEDE – DURATA</Alert.Heading>
        <p className="quoted-text">
          E’ costituita l’Associazione culturale denominata “Associazione Proquartiano” con sede nel Comune di Mulazzano
          (LO), regolata a norma del Titolo I, Cap. III, artt. 36 e segg. del codice civile, nonché del presente statuto
          e della Legge Regionale n.1/2008 della Lombardia.
        </p>
        <br />
        <p className="quoted-text">
          L’indirizzo della sede legale dell’Associazione culturale, sita in Mulazzano, è fissato con l’atto costitutivo
          ed il Consiglio Direttivo potrà con propria delibera trasferire la sede nell’ambito dello stesso Comune.
        </p>
        <br />
        <p className="quoted-text">La durata dell’Associazione è illimitata.</p>
      </Alert>
      <h5>Scarica lo statuto:</h5>
      {/* // todo include the actual thing */}
    </>
  );
}

export default Statuto;
