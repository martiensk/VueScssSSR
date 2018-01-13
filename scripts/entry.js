import Vue from 'vue';
import Main from './_components/main';

/**
 * @description Creates a new Vue instance and with the Main component loaded - the main component being the one at /.
 * @returns {object} A new Vue instance.
 */
const MainComponent = () => {
    const app = new Vue({render: (h) => { return h(Main); }});
    return app;
};

export default MainComponent;
