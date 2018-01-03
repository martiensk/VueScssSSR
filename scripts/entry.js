import Vue from 'vue';
import Test from './_components/test';
import {two} from './deadimports';
import '../styles/critical.scss';
import '../styles/main.scss';
import '../images/webpack.svg';

// new Vue(Test).$mount('#app');
new Vue({render: (h) => { return h(Test); }}).$mount('#app');

const t = document.createTextNode(two);

document.getElementsByTagName('body')[0].appendChild(t);
