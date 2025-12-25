import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Calculator from '@/components/Calculator';
import Dashboard from '@/components/Dashboard';
import { DataProvider } from '@/services/dataService';
import { LanguageProvider } from '@/services/languageService';
import { initGA } from '@/services/analyticsService';
const App = () => {
    const [currentView, setCurrentView] = useState('calculator');
    useEffect(() => {
        initGA();
    }, []);
    return (_jsx(LanguageProvider, { children: _jsx(DataProvider, { children: _jsxs("div", { className: "min-h-screen bg-slate-50 flex flex-col", children: [_jsx("div", { className: "print:hidden", children: _jsx(Navigation, { currentView: currentView, setView: setCurrentView }) }), _jsx("main", { className: "flex-grow", children: currentView === 'calculator' ? _jsx(Calculator, {}) : _jsx(Dashboard, {}) }), _jsx("footer", { className: "bg-white border-t border-slate-200 mt-auto print:hidden", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8", children: _jsxs("p", { className: "text-center text-sm text-slate-500", children: ["\u00A9 ", new Date().getFullYear(), " Nongfaa.com. All rights reserved."] }) }) })] }) }) }));
};
export default App;
