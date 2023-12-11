import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import RouteWrapper from "./components/RouteWrapper";
import Footer from "./components/Footer";
import News from "./components/News";
import ChiSiamo from "./components/ChiSiamo";
import Dove from "./components/Dove";
import Contatti from "./components/Contatti";
import InfoPrivacy from "./components/InfoPrivacy";
import ArchivioNews from "./components/news/ArchivioNews";
import Mangiacucu from "./components/chi-siamo/Mangiacucu";
import Statuto from "./components/chi-siamo/Statuto";
import RassegnaStampa from "./components/RassegnaStampa";
import ComeRaggiungerci from "./components/dove/ComeRaggiungerci";
import Crediti from "./components/contatti/Crediti";
import Link from "./components/contatti/Link";
import InfoCookies from "./components/info-privacy/InfoCookies";
import Manifestazioni from "./components/Manifestazioni";
import ScrollToTop from "./components/ScrollToTop";
import AddArticle from "./components/admin/AddArticle";
import Article from "./components/Article";
import AdminLogin from "./components/AdminLogin";
import Profilo from "./components/admin/AccountPage";
import UltimiEventi from "./components/home/UltimiEventi";
import EditAccount from "./components/admin/EditAccount";
import PublishedArticles from "./components/admin/PublishedArticles";
import FilteredResults from "./components/filtered-results/FilteredResults";
import TestPage from "./components/TestPage";
import Manifestazione from "./components/manifestazioni/Manifestazione";
import EditArticle from "./components/admin/EditArticle";

// todo clean up the goddamn interfaces
// todo implement overlays somewhere
// todo use link instead of usenavigate
// todo use mixins and the like
// ^ better component import https://react-bootstrap.netlify.app/docs/getting-started/introduction/#importing-components
// todo remove things like "comingUpData?"
// todo PLACEHOLDERS
// todo customize icons to make em look less bootstrapy
// todo organize icons import
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <NavigationBar />
        <Routes>
          {/* // todo make component for routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/manifestazioni"
            element={
              <RouteWrapper
                title="Manifestazioni"
                description="In questa pagina potete visualizzare le manifestazioni offerte dalla Proquartiano."
                content={<Manifestazioni />}
              />
            }
          />
          <Route
            path="/manifestazioni/:section"
            element={<RouteWrapper title="Mercatino dei libri" content={<Manifestazione />} />}
          />
          <Route
            path="/rassegna-stampa"
            element={
              <RouteWrapper
                title="Rassegna stampa"
                description="Dal mondo della carta stampata…"
                content={<RassegnaStampa />}
              />
            }
          />
          <Route
            path="/news"
            element={
              <RouteWrapper
                title="News"
                description="In questa pagina potete vedere gli ultimi aggiornamenti del sito."
                content={<News />}
              />
            }
          />
          <Route
            path="/news/archivio-news"
            element={
              <RouteWrapper
                title="Archivio news"
                description="In questa pagina potete cercare le notizie in base a mese ed anno di pubblicazione."
                content={<ArchivioNews />}
              />
            }
          />
          <Route path="/chi-siamo" element={<RouteWrapper title="Chi siamo" content={<ChiSiamo />} />} />
          <Route path="/chi-siamo/mangiacucu" element={<RouteWrapper title="Mangiacucù" content={<Mangiacucu />} />} />
          <Route path="/chi-siamo/statuto" element={<RouteWrapper title="Statuto" content={<Statuto />} />} />
          <Route path="/dove" element={<RouteWrapper title="Dove" content={<Dove />} />} />
          <Route
            path="/dove/come-raggiungerci"
            element={<RouteWrapper title="Come raggiungerci" content={<ComeRaggiungerci />} />}
          />
          <Route path="/contatti" element={<RouteWrapper title="Contatti" content={<Contatti />} />} />
          <Route path="/contatti/link" element={<RouteWrapper title="Link" content={<Link />} />} />
          <Route
            path="/contatti/crediti"
            element={<RouteWrapper title="Crediti" description="placeholder" content={<Crediti />} />}
          />
          <Route path="/info-privacy" element={<RouteWrapper title="Info privacy" content={<InfoPrivacy />} />} />
          <Route
            path="/info-privacy/info-cookies"
            element={<RouteWrapper title="Info cookies" content={<InfoCookies />} />}
          />
          <Route
            path="/auth/login"
            element={<RouteWrapper title="Login" content={<AdminLogin />} breadcrumb={false} />}
          />
          <Route
            path="/admins"
            element={
              <RouteWrapper
                title="Pagina di profilo"
                description={`Benvenuto, ${localStorage.getItem("username")}`}
                content={<Profilo />}
              />
            }
          />
          <Route
            path="/admins/modifica"
            element={<RouteWrapper title="Pagina di profilo" content={<EditAccount />} />}
          />
          <Route
            path="/admins/articoli"
            element={<RouteWrapper title="Articoli pubblicati" content={<PublishedArticles />} />}
          />
          <Route
            path="/admins/articoli/:id"
            element={<RouteWrapper title="Modifica articolo" content={<AddArticle />} />}
          />
          <Route
            path="/admins/aggiungi-articolo"
            element={<RouteWrapper title="Aggiungi articolo" content={<AddArticle />} />}
          />
          <Route path="/articoli/:id" element={<Article />} />
          <Route
            path="/articoli"
            element={<RouteWrapper title="" breadcrumb={false} content={<FilteredResults />} />}
          />
          <Route
            path="/test-page"
            element={
              <RouteWrapper
                title="Test page"
                description="If you are reading this and you are not me, you shouldn't be here."
                breadcrumb={false}
                content={<TestPage />}
              />
            }
          />
          <Route
            path="*"
            element={
              <RouteWrapper
                title="Pagina non trovata"
                description="Questa pagina non esiste."
                content={<NotFound />}
                breadcrumb={false}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
