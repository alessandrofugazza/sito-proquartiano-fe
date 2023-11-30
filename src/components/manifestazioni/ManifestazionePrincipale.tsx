import { useParams } from "react-router-dom";

export default function ManifestazionePrincipale() {
  const { manifestazione } = useParams();
  console.log(manifestazione);
  return <></>;
}
