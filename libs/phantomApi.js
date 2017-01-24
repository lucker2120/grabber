
const privatURL = 'https://privatbank.ua/ru/';
const Currency = require('../models/Currency');
const finaceURL = 'http://finance.i.ua/';
const request = require('request');
const cheerio = require('cheerio');

module.exports.saveKursToDB = function (msg){
	if(msg){
		const kursCur = JSON.parse(msg);
		let { buy, nbu, sale } = kursCur;
		const currKurs = new Currency({
			purchase: +buy,
			sale: +sale,
			nbu_cur: +nbu,
			grabbed_from: 'kurs.com.ua',
			created_at: new Date()
		})
		currKurs.save(function(err) {
			if (err) throw err;
			console.log('currency from kurs.com.ua saved');
		})
	}
}

module.exports.grabPrivatCurrency = function() {
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
            currPrivat.save(function(err) {
                if (err) throw err;
                console.log('currency from privatbank.ua saved');
            })
        }
    })
}

module.exports.grabFinanceCurrency = function() {
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
            currFinance.save(function(err) {
                if (err) throw err;
                console.log('currency from finance.i.ua saved');
            })
        }
    })
}

function getUsdCur(num){
	return `.widget-currency_bank tbody tr:first-child td:nth-child(${num}) span.value span:first-child`
}