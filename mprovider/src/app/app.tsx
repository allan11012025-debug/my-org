// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import USMap from '../components/map/map';
// import ProviderList from '../components/providerDetails/providerList';
import styles from  './app.module.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StateListing from "../components/listing/state-listing";
import ProviderDetail from "../components/providerdetail/provider-detail";
const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <header>
        <Header />
      </header>
      <div className={styles.mapContainer}>
        <Router>
      <Routes>
        <Route path="/" element={<USMap />} />
        <Route path="/listing/:stateName" element={<StateListing />} />
        <Route path="/provider/:id" element={<ProviderDetail />} />
      </Routes>
    </Router>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;


