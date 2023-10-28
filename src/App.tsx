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
          <Route path="/news" element={<RouteWrapper element={<News />} />} />
          <Route path="/news/archivio-news" element={<RouteWrapper element={<ArchivioNews />} />} />
          <Route path="/chi-siamo" element={<RouteWrapper element={<ChiSiamo />} />} />
          <Route path="/chi-siamo/mangiacucu" element={<RouteWrapper element={<Mangiacucu />} />} />
          <Route path="/chi-siamo/statuto" element={<RouteWrapper element={<Statuto />} />} />
          <Route path="/chi-siamo/rassegna-stampa" element={<RouteWrapper element={<RassegnaStampa />} />} />
          <Route path="/dove" element={<RouteWrapper element={<Dove />} />} />
          <Route path="/dove/come-raggiungerci" element={<RouteWrapper element={<ComeRaggiungerci />} />} />
          <Route path="/contatti" element={<RouteWrapper element={<Contatti />} />} />
          <Route path="/contatti/link" element={<RouteWrapper element={<Link />} />} />
          <Route path="/contatti/crediti" element={<RouteWrapper element={<Crediti />} />} />
          <Route path="/info-privacy" element={<RouteWrapper element={<InfoPrivacy />} />} />
          <Route path="/info-privacy/info-cookies" element={<RouteWrapper element={<InfoCookies />} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
