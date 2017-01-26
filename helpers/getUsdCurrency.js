module.exports = function getUsdCur(num){ // это в хелперс
	return `.widget-currency_bank tbody tr:first-child td:nth-child(${num}) span.value span:first-child`
}



