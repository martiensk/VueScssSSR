import Vue from 'vue';
import Test from './_components/test';
import {two} from './deadimports';
import '../styles/main.scss';
import '../styles/secondary.scss';
import '../images/webpack.svg';

new Vue(Test).$mount('#app');

const t = document.createTextNode(two);

document.getElementsByTagName('body')[0].appendChild(t);
