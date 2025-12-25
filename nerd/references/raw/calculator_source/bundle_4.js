import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Calculator, LayoutDashboard, Shield, Languages } from 'lucide-react';
import { useLanguage } from '@/services/languageService';
import { logEvent } from '@/services/analyticsService';
const Navigation = ({ currentView, setView }) => {
    const { language, setLanguage, t } = useLanguage();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        // Check for admin query parameter
        const params = new URLSearchParams(window.location.search);
        setIsAdmin(params.get('admin') === 'true');
    }, []);
    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'th' : 'en';
        setLanguage(newLang);
        logEvent('switch_language', { language: newLang });
    };
    const handleViewChange = (view) => {
        setView(view);
        logEvent('view_change', { view });
    };
    return (_jsx("nav", { className: "bg-white border-b border-slate-200 sticky top-0 z-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between h-16", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Shield, { className: "h-8 w-8 text-red-600" }), _jsx("span", { className: "ml-2 text-xl font-bold text-slate-900 tracking-tight", children: t('appTitle') })] }), _jsxs("div", { className: "flex space-x-2 sm:space-x-4 items-center", children: [_jsxs("button", { onClick: () => handleViewChange('calculator'), className: `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'calculator'
                                    ? 'bg-red-50 text-red-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`, children: [_jsx(Calculator, { className: "h-4 w-4 mr-2" }), _jsx("span", { className: "hidden sm:inline", children: t('navCalculator') })] }), isAdmin && (_jsxs("button", { onClick: () => handleViewChange('dashboard'), className: `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'dashboard'
                                    ? 'bg-red-50 text-red-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`, children: [_jsx(LayoutDashboard, { className: "h-4 w-4 mr-2" }), _jsx("span", { className: "hidden sm:inline", children: t('navDashboard') })] })), _jsx("div", { className: "h-6 w-px bg-slate-200 mx-2" }), _jsxs("button", { onClick: toggleLanguage, className: "flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors", title: "Switch Language", children: [_jsx(Languages, { className: "h-4 w-4 mr-2" }), _jsx("span", { className: "uppercase", children: language })] })] })] }) }) }));
};
export default Navigation;
