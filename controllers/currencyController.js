const Currency = require('../models/Currency');

module.exports = {
    getAll: function(req, res, next) {
        Currency.find({}, function(err, currencies) {
            if (err) throw err;
            res.send(currencies);
        });
    }
}