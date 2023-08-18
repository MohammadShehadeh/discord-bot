const fs = require('node:fs');
const path = require('node:path');
const { Collection, REST, Routes } = require('discord.js');

const commands = new Collection();
const commandsToDeploy = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		commands.set(command.data.name, command);
		commandsToDeploy.push(command.data.toJSON());
	} else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
		);
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(
	process.env.DISCORDJS_BOT_TOKEN,
);

// deploy commands!
(async () => {
	try {
		console.log(
			`Started refreshing ${commandsToDeploy.length} application (/) commands.`,
		);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID,
				process.env.GUILD_ID,
			),
			{ body: commandsToDeploy },
		);

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`,
		);
	} catch (error) {
		console.error('Error while deploying commands: ', error);
	}
})();

module.exports = {
	commands,
};
