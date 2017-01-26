const request = require('request');
const cheerio = require('cheerio');
const Currency = require('../models/Currency');
const getUsdCur = require('../helpers/getUsdCurrency')

module.exports.grabFinanceCurrency = function() { // эти разбить на отдельные методы
    request(finaceURL, function(error, response, body) {
        if (!error) {
            const $ = cheerio.load(body);
            const buyCur = $(getUsdCur(2)).text();
            const saleCur = $(getUsdCur(3)).text();
            const nbuCur = $(getUsdCur(4)).text();
            const currFinance = new Currency({
                purchase: +buyCur,
                sale: +saleCur,
                nbu_cur: +nbuCur,
                grabbed_from: 'finance.i.ua',
                created_at: new Date()
            })
            currFinance.save(function(err) { // запилить в папку helpers
                if (err) throw err;
                console.log('currency from finance.i.ua saved');
            })
        }
    })
}