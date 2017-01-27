const cron = require('node-cron');
const startGrabbing = require('../parsers')

module.exports = function() {
    console.log('crone activated')
    cron.schedule('* * 6 * * *', function() {
        startGrabbing();
    });
}