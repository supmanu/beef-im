import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleView from './pages/ArticleView';
import ToolsPage from './pages/ToolsPage'; // The Nerd's Laboratory (New)
// import Tools from './pages/Tools'; // The Armory (Old)
import Manifesto from './pages/Manifesto';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import { SearchProvider, useSearchModal } from './context/SearchContext';
import SearchModal from './components/SearchModal';

// Separate Header/Layout component to consume Context if needed, 
// or just render SearchModal inside a wrapper.
// Since SearchModal needs props, we can make a 'GlobalSearch' component 
// or just pass context values if we change SearchModal interface.
// BUT SearchModal currently takes isOpen/onClose props.
// Let's create a small wrapper to connect Context -> Modal Props.

const GlobalSearchModalWrapper = () => {
  const { isSearchOpen, closeSearch } = useSearchModal();
  return <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />;
};

const App: React.FC = () => {
  return (
    <SearchProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#0B1D35] text-slate-200 font-sans selection:bg-[#F59E0B] selection:text-[#0B1D35]">
          <Navbar />
          <GlobalSearchModalWrapper />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleView />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/manifesto" element={<Manifesto />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SearchProvider>
  );
};

export default App;