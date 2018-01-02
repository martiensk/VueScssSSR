module.exports = function(data) {
    return {
        plugins: {
            'postcss-flexbugs-fixes': {},
            'autoprefixer': {},
            'postcss-discard-duplicates': {},
            'postcss-combine-duplicated-selectors': {},
            'postcss-merge-rules': {},
            'postcss-merge-selectors': {}
        }
    }
};