const fetch = require('node-fetch');

async function getQuote() {
	return fetch('https://zenquotes.io/api/random')
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			return data[0]['q'] + ' -' + data[0]['a'];
		});
}

async function getMeme() {
	return fetch('https://meme-api.com/gimme')
		.then((res) => res.json())
		.then((data) => data.url || 'Try later my man!');
}

module.exports = {
	getQuote,
	getMeme,
};
