import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';
import Tools from './pages/Tools';
import Manifesto from './pages/Manifesto';
import Contact from './pages/Contact';
// 1. Import the Scroll Handler
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <HashRouter>
      {/* 2. Activate it inside the Router */}
      <ScrollToTop />
      <div className="min-h-screen bg-[#0B1D35] text-slate-200 font-sans selection:bg-[#F59E0B] selection:text-[#0B1D35]">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleView />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;