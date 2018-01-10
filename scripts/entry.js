import Vue from 'vue';
import Test from './_components/Test';

/**
 * @description Creates a new Vue instance and with the Test component loaded.
 * @returns {object} A new Vue instance.
 */
const TestComponent = () => {
    const app = new Vue({render: (h) => { return h(Test); }});
    return app;
};

export default TestComponent;
