export default () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch((registrationError) => {
                throw new Error('SW registration failed: ', registrationError);
            });
        });
    }
};
