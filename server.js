const path = require('path');
const express = require('express');
const app = express();
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync(path.join(__dirname, '/dist/views/index.html'), 'utf-8')
});

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    const app = new Vue({
        template: `<h1>Hello World!</h1>`
      })
    
      renderer.renderToString(app, (err, html) => {
        if (err) {
          res.status(500).end('Internal Server Error')
          return
        }
        res.end(`${html}`)
      })
});

app.listen(8080);

console.log("Running at Port 8080");