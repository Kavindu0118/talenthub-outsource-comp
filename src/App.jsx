import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import HowWeHire from './pages/HowWeHire';
import OurRoles from './pages/OurRoles';
import Solutions from './pages/Solutions';
import HireWithUs from './pages/HireWithUs';
import TalentApplication from './pages/TalentApplication';
import AboutUs from './pages/AboutUs';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-we-hire" element={<HowWeHire />} />
            <Route path="/our-roles" element={<OurRoles />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/hire-with-us" element={<HireWithUs />} />
            <Route path="/talent-application" element={<TalentApplication />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
