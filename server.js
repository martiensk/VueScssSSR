const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const vue = require('vue');
const { createBundleRenderer } = require('vue-server-renderer');
//const ssr = require('./scripts/entry.server');

let html = fs.readFileSync('./dist/views/index.html', 'utf-8');
let serverBundle = path.join(__dirname, 'dist', 'vue-ssr-server-bundle.json');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: true,
  template: html
})

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    const context = {name: 'Hello World!'};
    
      renderer.renderToString(context, (err, html) => {
        if (err) {
          console.log('Server error');
          console.log(err);
          console.log(err.message);
          res.status(500).end('Internal Server Error')
          return
        }
        res.end(html);
      })
});

app.listen(8080);

console.log("Running at Port 8080");
