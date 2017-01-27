const request = require('request');
const cheerio = require('cheerio');
const Currency = require('../models/Currency');
const privatURL = 'https://privatbank.ua/ru/';

module.exports = function() { // эти разбить на отдельные методы
    request(privatURL, function(error, response, body) {
        if (!error) {
            const $ = cheerio.load(body);
            const buyCur = $('table#course-table-pb tbody#selectByPB tr:nth-child(3) td:nth-child(2)').text();
            const saleCur = $('table#course-table-pb tbody#selectByPB tr:nth-child(3) td:nth-child(3)').text();
            const currPrivat = new Currency({
                purchase: +buyCur,
                sale: +saleCur,
                nbu_cur: 0,
                grabbed_from: 'privatbank.ua',
                created_at: new Date()
            })
            currPrivat.save(function(err) { // запилить в папку helpers
                if (err) throw err;
                console.log('currency from privatbank.ua saved');
            })
        }
    })
}