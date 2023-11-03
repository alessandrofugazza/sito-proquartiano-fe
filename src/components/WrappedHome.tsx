import { Col, Container, Row } from "react-bootstrap";
import img1 from "../assets/img/PQ_sagraW2023.jpg"
import HomeCard from "./home/HomeCard";
import HomeCarousel from "./home/HomeCarousel";
import UltimiEventi from "./home/UltimiEventi";
import ManifestazioniPrincipali from "./home/HomeManifestazioniPrincipali";
import ArgomentiInPrimoPiano from "./home/ArgomentiInPrimoPiano";

function WrappedHome() {
  return(
    <>
      {/* <HomeCarousel /> */}
      <ArgomentiInPrimoPiano />
      <hr />
      <ManifestazioniPrincipali />
      <hr />
      <UltimiEventi />
    </>
  )
}

export default WrappedHome;