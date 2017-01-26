var express = require('express');
var app = express();
const path = require('path');
const fs = require('fs');

app.use('/public', express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {

    fs.readFile('public/home.html', function(err, data) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(data);
        res.send();
    });
})

app.listen(3000, function () {
  console.log('static server listening on port 3000!');
});