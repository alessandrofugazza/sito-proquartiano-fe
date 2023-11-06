import UltimiEventi from "./home/UltimiEventi";
import ArgomentiInPrimoPiano from "./home/ArgomentiInPrimoPiano";
import HomeManifestazioniPrincipali from "./home/HomeManifestazioniPrincipali";

function WrappedHome() {
  return (
    <>
      {/* <HomeCarousel /> */}
      <ArgomentiInPrimoPiano />
      <hr className="my-5" />
      {/* <HomeManifestazioniPrincipali />
      <hr /> */}
      <UltimiEventi />
    </>
  );
}

export default WrappedHome;
