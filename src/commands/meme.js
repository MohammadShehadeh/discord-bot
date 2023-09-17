const { SlashCommandBuilder } = require('discord.js');
const { getMeme } = require('../services');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Take this bi*ch!'),
	async execute(interaction) {
		getMeme().then(meme => interaction.reply({ content: meme }));
	},
};
