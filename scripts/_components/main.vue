<template>
    <div>
        <h1>{{ greeting }}<span class="b">{{transparentDot}}</span>{{dot}}{{char}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'Main',
    
        /**
         * @description: Created the Vue data object
         * @returns {void}
         */
        data () {
            return {
                greeting: 'Coming Soon',
                dot: '',
                transparentDot: '...',
                char: '-',
                a: 0,
                b: 0
            };
        },
    
        /**
         * @description Vue Created lifecycle hook
         * @returns {void}
         */
        created () {
            setInterval(() => {
                this.a = this.a === 3 ? 0 : this.a + 1;
                this.b = this.b === 2 ? 0 : this.b + 1;
                switch (this.a) {
                case 1:
                    this.dot = '.';
                    this.transparentDot = '..';
                    break;
                case 2:
                    this.dot = '..';
                    this.transparentDot = '.';
                    break;
                case 3:
                    this.dot = '...';
                    this.transparentDot = '';
                    break;
                default:
                    this.dot = '';
                    this.transparentDot = '...';
                    break;
                }
                switch (this.b) {
                case 0:
                    this.char = '-';
                    break;
                case 1:
                    this.char = '\\';
                    break;
                case 2:
                    this.char = '/';
                    break;
                default:
                    break;
                }
            }, 800);
        }
    };
</script>

<style lang="scss" scoped>
    $color: #0f0;

    h1 {
        color: $color;
    }
</style>