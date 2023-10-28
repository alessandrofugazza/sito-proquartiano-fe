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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<RouteWrapper element={<Home />} />} />
          <Route path="/news" element={<RouteWrapper element={<News />} />} />
          <Route path="/chi-siamo" element={<RouteWrapper element={<ChiSiamo />} />} />
          <Route path="/dove" element={<RouteWrapper element={<Dove />} />} />
          <Route path="/contatti" element={<RouteWrapper element={<Contatti />} />} />
          <Route path="/info-privacy" element={<RouteWrapper element={<InfoPrivacy />} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
