// TODO: Replace with your actual Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-34WH2PWQ73';
export const initGA = () => {
    if (process.env.NODE_ENV === 'test')
        return;
    // Prevent multiple script injections
    if (document.getElementById('ga-script'))
        return;
    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false, // We will manually track page views if needed, or let history changes handle it
        app_name: 'Premium Cal'
    });
};
export const logEvent = (eventName, params) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
            ...params,
            app_name: 'Premium Cal',
            event_category: 'Premium Calculator'
        });
        // console.log(`[Analytics] ${eventName}`, params); // Uncomment for debugging
    }
};
