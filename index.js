"use strict";

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');;
const {
    grabFinanceCurrency,
    grabPrivatCurrency,
    saveKursToDB
} = require('./libs/phantomApi');
const currencyController = require('./controllers/currencyController');
const startPhantom = require('./startPhantom');

startPhantom(saveKursToDB);
grabFinanceCurrency();
grabPrivatCurrency();

cron.schedule('* * 6 * * *', function() {
    startPhantom(saveKursToDB);
    grabFinanceCurrency();
    grabPrivatCurrency();
});


app.use('/public', express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {

    fs.readFile('views/home.html', function(err, data) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(data);
        res.send();
    });
})

app.get('/api', currencyController.getAll);

app.listen(5555, () => {
    console.log('server stars on port 5555');
})