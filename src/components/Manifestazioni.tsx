import AltreManifestazioni from "./manifestazioni/AltreManifestazioni";
import ManifestazioniPrincipali from "./manifestazioni/ManifestazioniPrincipali";

function Manifestazioni() {
  return(
    <>
      <ManifestazioniPrincipali/>
      <hr />
      <AltreManifestazioni/>
    </>
  )
}

export default Manifestazioni;