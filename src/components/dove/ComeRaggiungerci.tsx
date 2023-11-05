import map from "../../assets/img/OpenStreetMap2-1024x694.jpg";

function ComeRaggiungerci() {
  return (
    <>
      <p>
        Quartiano si trova nelle campagne fra Mulazzano e Tavazzano con Villavesco e gran parte delle strade che lo
        collegano ai borghi circostanti sono insidiosi percorsi fra i campi.
      </p>
      <p>
        Se non siete avvezzi a circolare su strette strade di campagna o siete alla guida di mezzi ingombranti quali
        pullman, camper o furgoni, consigliamo caldamente di NON seguire alla lettera i consigli che possono fornire i
        navigatori ma di transitare da Mulazzano, raggiungendolo lungo la provinciale SP138 Pandina sia da Melegnano che
        dalla provinciale SP16 Montanaso-Zelo Buon Persico.
      </p>
      <p>
        All’altezza della seconda rotonda di Mulazzano, indipendentemente dalla direzione di provenienze, svoltate verso
        Quartiano sulla provinciale SP158 (via Quartiano).
      </p>
      <div className="d-flex flex-column align-items-center gap-3 my-4">
        <img src={map} alt="Mappa località" className="img-fluid" />
        <span>
          - <a href="https://www.openstreetmap.org/copyright">openstreetmap&copy;</a>
        </span>
      </div>
      <p>Le strade evidenziate in giallo sono le più ampie.</p>
      <p>L’ uscita autostradale più prossima è Vizzolo-Predabissi, sulla Tangenziale Est Esterna (TEEM).</p>
      <p>Buon viaggio!</p>
    </>
  );
}

export default ComeRaggiungerci;
