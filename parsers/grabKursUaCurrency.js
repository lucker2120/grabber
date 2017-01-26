const request = require('request');
const cheerio = require('cheerio');
const Currency = require('../models/Currency');

module.exports.saveKursToDB = function (msg){ // эти разбить на отдельные методы, переименовать этот
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
		currKurs.save(function(err) { // запилить в папку helpers
			if (err) throw err;
			console.log('currency from kurs.com.ua saved');
		})
	}
}