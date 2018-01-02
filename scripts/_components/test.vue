<template>
    <div>
        <h1>{{ greeting }}</h1>
        <img src="../../images/vue.png" />
    </div>
</template>

<script>
    const test = 'Hello World!';
    export default {
        name: 'Test',

        /**
         * @description: Created the Vue data object
         * @returns {void}
         */
        data () {
            return {greeting: test};
        }
    };
</script>

<style lang="scss" scoped>
    $color: #f00;

    h1 {
        color: $color;
    }
</style>