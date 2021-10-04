const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	// new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	// new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	// new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Replies with the Twitch users Schedule')
        .addSubcommand(subcommand => subcommand
            .setName('get')
            .setDescription('Get schedule for Twitch user')
            .addStringOption(option => option
                .setName('twitch')
                .setDescription('Select desired user')))
        .addSubcommand(subcommand => subcommand
                .setName('update').setDescription('Update schedule for Twitch user')
                .addStringOption(option => option
                    .setName('twitch')
                    .setDescription('Select desired user'))),
        
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);