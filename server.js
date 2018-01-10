const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const Vue = require('vue');
const { createBundleRenderer } = require('vue-server-renderer');
//const ssr = require('./scripts/entry.server');

const renderer = createBundleRenderer(ssr, {
  runInNewContext: true,
  template: require('fs').readFileSync('./dist/views/index.html')
})

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    const context = 'Hello World!';
    
      renderer.renderToString(context, (err, html) => {
        if (err) {
          res.status(500).end('Internal Server Error')
          return
        }
        res.end(html);
      })
});

app.listen(8080);

console.log("Running at Port 8080");