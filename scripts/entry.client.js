import createApp from './entry';
// import PWA from './pwa';
import '../styles/critical.scss';
import '../styles/main.scss';
import '../images/webpack.svg';

// PWA();

const app = createApp();

app.$mount('#app');
