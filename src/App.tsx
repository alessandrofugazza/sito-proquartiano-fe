import React from 'react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import NotFound from './components/NotFound';
import RouteWrapper from './components/RouteWrapper';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<RouteWrapper element={<Home />} />} />
          <Route path="*" element={<RouteWrapper element={<NotFound />} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
