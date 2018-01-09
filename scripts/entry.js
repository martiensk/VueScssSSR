import Vue from 'vue';
import Test from './_components/test';
// import PWA from './pwa';
import '../styles/critical.scss';
import '../styles/main.scss';
import '../images/webpack.svg';

// PWA();

new Vue({render: (h) => { return h(Test); }}).$mount('#app');
