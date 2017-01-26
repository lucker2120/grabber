const cron = require('node-cron');
const {
    grabFinanceCurrency,
    grabPrivatCurrency,
    saveKursToDB
} = require('./libs/phantomApi');

module.exports = function() {
	console.log('crone activated')
    cron.schedule('* * 6 * * *', function() {
        startPhantom(saveKursToDB);
        grabFinanceCurrency();
        grabPrivatCurrency();
    });
}