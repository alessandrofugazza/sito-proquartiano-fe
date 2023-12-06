import UltimiEventi from "./home/UltimiEventi";
import ArgomentiInPrimoPiano from "./home/ArgomentiInPrimoPiano";
import HomeManifestazioniPrincipali from "./home/HomeManifestazioniPrincipali";
import UpcomingEvents from "./home/UpcomingEvents";

function WrappedHome() {
  return (
    <>
      {/* <HomeCarousel /> */}
      <ArgomentiInPrimoPiano />
      <hr className="my-5" />
      <UpcomingEvents />
      <hr className="my-5" />
      {/* <HomeManifestazioniPrincipali />
      <hr /> */}
      <UltimiEventi />
    </>
  );
}

export default WrappedHome;
