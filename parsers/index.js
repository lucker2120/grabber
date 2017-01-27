const grabFinanceCurrency = require('./grabFinanceCurrency');
const grabPrivatCurrency = require('./grabPrivatCurrency');
const grabKursUaCurrency = require('./grabKursUaCurrency');
const startPhantom = require('../phantom/startPhantom');

module.exports = function() {
    startPhantom(grabKursUaCurrency);
    grabFinanceCurrency();
    grabPrivatCurrency();
}