import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/utils/translations';
const LanguageContext = createContext(undefined);
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    useEffect(() => {
        const savedLang = localStorage.getItem('aia_app_lang');
        if (savedLang === 'en' || savedLang === 'th') {
            setLanguage(savedLang);
        }
    }, []);
    const handleSetLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('aia_app_lang', lang);
    };
    const t = (key) => {
        return translations[language][key] || key;
    };
    return (_jsx(LanguageContext.Provider, { value: { language, setLanguage: handleSetLanguage, t }, children: children }));
};
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
