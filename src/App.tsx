import React, { useState } from 'react';
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
          <Route path="/news" element={<RouteWrapper title="News" description="In questa pagina potete vedere gli ultimi aggiornamenti del sito." content={<News />} />} />
          <Route path="/news/archivio-news" element={<RouteWrapper title="Archivio news" description="In questa pagina potete cercare le notizie in base a mese ed anno di pubblicazione." content={<ArchivioNews />} />} />
          <Route path="/chi-siamo" element={<RouteWrapper title="Chi siamo" description="placeholder" content={<ChiSiamo />} />} />
          <Route path="/chi-siamo/mangiacucu" element={<RouteWrapper title="Mangiacucù" description="placeholder" content={<Mangiacucu />} />} />
          <Route path="/chi-siamo/statuto" element={<RouteWrapper title="Statuto" description="placeholder" content={<Statuto />} />} />
          <Route path="/chi-siamo/rassegna-stampa" element={<RouteWrapper title="Rassegna stampa" description="placeholder" content={<RassegnaStampa />} />} />
          <Route path="/dove" element={<RouteWrapper title="Dove" description="placeholder" content={<Dove />} />} />
          <Route path="/dove/come-raggiungerci" element={<RouteWrapper title="Come raggiungerci" description="placeholder" content={<ComeRaggiungerci />} />} />
          <Route path="/contatti" element={<RouteWrapper title="Contatti" description="placeholder" content={<Contatti />} />} />
          <Route path="/contatti/link" element={<RouteWrapper title="Link" description="placeholder" content={<Link />} />} />
          <Route path="/contatti/crediti" element={<RouteWrapper title="Crediti" description="placeholder" content={<Crediti />} />} />
          <Route path="/info-privacy" element={<RouteWrapper title="Info privacy" description="placeholder" content={<InfoPrivacy />} />} />
          <Route path="/info-privacy/info-cookies" element={<RouteWrapper title="Info cookies" description="placeholder" content={<InfoCookies />} />} />
          <Route path="*" element={<RouteWrapper title="Pagina non trovata" description="placeholder" content={<NotFound />} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
