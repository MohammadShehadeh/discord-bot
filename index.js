require('dotenv').config();

const http = require('http');
const express = require('express');
const path = require('path');
const { Client, Events } = require('discord.js');
const COMMANDS = require('./src/constants/commands.js');
const { IntentOptions } = require('./src/config/intentOptions.js');
const { commands } = require('./src/createCommands.js');
const { Player } = require('discord-player');

const app = express();
app.use(express.json());
app.use(express.static('express'));

const client = new Client({
	intents: IntentOptions,
});

client.commands = commands;
const player = new Player(client);

client.on(Events.ClientReady, async () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.MessageCreate, async (message) => {
	if (message.author.bot) return '';

	if (message.content.startsWith(COMMANDS.PREFIX)) {
		const CMD_NAME = message.content
			.trim()
			.substring(COMMANDS.PREFIX.length);

		if (CMD_NAME === COMMANDS.INSPIRE) {
			return message.channel.send('quote');
		}
	}
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(
			`No command matching ${interaction.commandName} was found.`,
		);
		return;
	}

	try {
		await command.execute(interaction, player);
	} catch (error) {
		await interaction.reply({
			content: 'There was an error while executing this command!',
			ephemeral: true,
		});
	}
});

player.on('error', (queue, error) => {
	console.log(
		`[${queue.guild.name}] Error emitted from the queue: ${error.message}`,
	);
});

player.on('connectionError', (queue, error) => {
	console.log(
		`[${queue.guild.name}] Error emitted from the connection: ${error.message}`,
	);
});

player.on('trackStart', (queue, track) => {
	queue.metadata.send(
		`▶ | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`,
	);
});

player.on('trackAdd', (queue, track) => {
	queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
});

player.on('botDisconnect', (queue) => {
	queue.metadata.send(
		'❌ | I was manually disconnected from the voice channel, clearing queue!',
	);
});

player.on('channelEmpty', (queue) => {
	queue.metadata.send('❌ | Nobody is in the voice channel, leaving...');
});

player.on('queueEnd', (queue) => {
	queue.metadata.send('✅ | Queue finished!');
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

// default URL for website
app.use('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
	console.log('listening at port: ', process.env.PORT || 3000);
});
