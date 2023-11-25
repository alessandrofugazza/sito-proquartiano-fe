import logo from "../../assets/img/logo.png";

function Mangiacucu() {
  return (
    <>
      <div className="d-flex gap-4">
        <div>
          <p>
            Per antica tradizione gli abitanti di ogni paese della zona venivano indicati con un soprannome, per lo più
            denigratorio e motivato da un forte spirito di campanile.
          </p>
          <p>Così la tradizione lega gli abitanti di Quartiano al soprannome di “mangia cucù”.</p>
          <p>
            Esso derivava dalla presenza nei boschi, un tempo molto estesi, attorno a Quartiano di una folta colonia di
            cucù che verso la fine di giugno abbandonava il paese.
          </p>
          <p>
            Il sospetto che anziché migrare finissero nelle padelle durante la festa di S.Pietro, patrono della chiesa
            parrocchiale, diede origine al nome.
          </p>
        </div>
        <img src={logo} alt="Logo Proquartiano" className="w-auto h-100" />
      </div>
      <div
        style={{ height: "100px", background: "linear-gradient(45deg, #A30000 50%, #FCB900 50%)" }}
        className="d-flex flex-column justify-content-center mb-3 mt-4"
      >
        <p className="ms-5 h3 mb-0" style={{ color: "#FCB900" }}>
          Giallo e Rosso
        </p>
      </div>
      <p>Sono i colori del paese</p>
    </>
  );
}

export default Mangiacucu;
