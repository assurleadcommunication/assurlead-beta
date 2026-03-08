import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { HomePage } from './pages/HomePage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { SimulationPage } from './pages/SimulationPage';
import { SanteSimulationPage } from './pages/SanteSimulationPage';
import { WhatsAppButton } from './components/WhatsAppButton';
import { StickyCTA } from './components/StickyCTA';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export default function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el: any) => {
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 0, opacity: 1, duration: 1, ease: "power3.out"
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
              <Route path="/simulation/sante" element={<SanteSimulationPage />} />
              <Route path="/simulation/:id" element={<SimulationPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <StickyCTA />
          <AIChat />
        </div>
      </Router>
    </HelmetProvider>
  );
}
