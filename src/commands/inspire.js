const { SlashCommandBuilder } = require('discord.js');
const { getQuote } = require('../services');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inspire')
		.setDescription('Instant Words of Inspiration!'),
	async execute(interaction) {
		getQuote().then(quote => interaction.reply({ content: quote }));
	},
};
