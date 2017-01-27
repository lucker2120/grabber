"use strict";

const express = require('express');
const app = express();
const startGrabbing = require('./parsers')
const grabKursUaCurrency = require('./parsers/grabKursUaCurrency')
const startPhantom = require('./phantom/startPhantom')
    // const {
    //     grabFinanceCurrency,
    //     grabPrivatCurrency,
    //     saveKursToDB
    // } = require('./libs/phantomApi');

const startCron = require('./cron')
    // const path = require('path');
    // const fs = require('fs');
    // const cron = require('node-cron');
const currencyController = require('./controllers/currencyController');


//startPhantom(grabKursUaCurrency);
startGrabbing();
startCron();

app.use((req, res, next) => { // заменить на модуль ноды
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/api', currencyController.getAll);


app.listen(5555, () => {
    console.log('API server listening on port 5555');
})