import React from 'react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import NotFound from './components/NotFound';
import RouteWrapper from './components/RouteWrapper';
import Footer from './components/Footer';
import News from './components/News';
import ChiSiamo from './components/ChiSiamo';
import Dove from './components/Dove';
import Contatti from './components/Contatti';
import InfoPrivacy from './components/InfoPrivacy';
import ArchivioNews from './components/news/ArchivioNews';
import Mangiacucu from './components/chi-siamo/Mangiacucu';
import Statuto from './components/chi-siamo/Statuto';
import RassegnaStampa from './components/chi-siamo/RassegnaStampa';
import ComeRaggiungerci from './components/dove/ComeRaggiungerci';
import Crediti from './components/contatti/Crediti';
import Link from './components/contatti/Link';
import InfoCookies from './components/info-privacy/InfoCookies';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<RouteWrapper elementTitle="News" elementContent={<News />} />} />
          <Route path="/news/archivio-news" element={<RouteWrapper elementTitle="Archivio news" elementContent={<ArchivioNews />} />} />
          <Route path="/chi-siamo" element={<RouteWrapper elementTitle="Chi siamo" elementContent={<ChiSiamo />} />} />
          <Route path="/chi-siamo/mangiacucu" element={<RouteWrapper elementTitle="Mangiacucù" elementContent={<Mangiacucu />} />} />
          <Route path="/chi-siamo/statuto" element={<RouteWrapper elementTitle="Statuto" elementContent={<Statuto />} />} />
          <Route path="/chi-siamo/rassegna-stampa" element={<RouteWrapper elementTitle="Rassegna stampa" elementContent={<RassegnaStampa />} />} />
          <Route path="/dove" element={<RouteWrapper elementTitle="Dove" elementContent={<Dove />} />} />
          <Route path="/dove/come-raggiungerci" element={<RouteWrapper elementTitle="Come raggiungerci" elementContent={<ComeRaggiungerci />} />} />
          <Route path="/contatti" element={<RouteWrapper elementTitle="Contatti" elementContent={<Contatti />} />} />
          <Route path="/contatti/link" element={<RouteWrapper elementTitle="Link" elementContent={<Link />} />} />
          <Route path="/contatti/crediti" element={<RouteWrapper elementTitle="Crediti" elementContent={<Crediti />} />} />
          <Route path="/info-privacy" element={<RouteWrapper elementTitle="Info privacy" elementContent={<InfoPrivacy />} />} />
          <Route path="/info-privacy/info-cookies" element={<RouteWrapper elementTitle="Info cookies" elementContent={<InfoCookies />} />} />
          <Route path="*" element={<RouteWrapper elementTitle="Pagina non trovata" elementContent={<NotFound />} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
