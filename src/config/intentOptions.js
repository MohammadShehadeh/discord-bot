const { GatewayIntentBits } = require('discord.js');

const IntentOptions = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates
];

module.exports = {
	IntentOptions
}
