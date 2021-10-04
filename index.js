const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', message => {
	console.log('test');
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'schedule') {
		if (interaction.options.getSubcommand() === "get") {
			const user = interaction.options.getString('twitch');

			if (user) {
				const scheduleEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setAuthor(`${user}`, 'https://i.imgur.com/AfFp7pu.png', `https://twitch.tv/${user}`)
					.setDescription(`Twtich streaming schedule for ${user}`)
					.addFields(
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Monday', value: 'No Stream', inline: true },
						{ name: 'Tuesday', value: '6PM - 9PM', inline: true },
						{ name: 'Wednesday', value: '6PM - 9PM', inline: true },
						{ name: 'Thursday', value: '11AM - 5PM', inline: true },
						{ name: 'Friday', value: 'No Steam', inline: true },
						{ name: 'Saturday', value: 'No Stream', inline: true },
						{ name: 'Sunday', value: 'No Stream' },
					)
					.setTimestamp()
					.setFooter('Schedule effective as of');

				await interaction.reply({ content: `Schedule for: ${user}`, embeds: [scheduleEmbed]});
			} else {
				await interaction.reply('Please specify a user!');
			}
		} else if (interaction.options.getSubcommand() === 'update') {
			const user = interaction.options.getString('twitch');

			const messages = await interaction.channel.messages.fetch();
			const filtered = messages.filter(i => i.content === `Schedule for: ${user}`);
			await interaction.channel.bulkDelete(filtered);

			if (user) {
				const scheduleEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setAuthor(`${user}`, 'https://i.imgur.com/AfFp7pu.png', `https://twitch.tv/${user}`)
					.setDescription(`Twtich streaming schedule for ${user}`)
					.addFields(
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Monday', value: 'No Stream', inline: true },
						{ name: 'Tuesday', value: '6PM - 9PM', inline: true },
						{ name: 'Wednesday', value: '6PM - 9PM', inline: true },
						{ name: 'Thursday', value: '11AM - 5PM', inline: true },
						{ name: 'Friday', value: 'No Steam', inline: true },
						{ name: 'Saturday', value: 'No Stream', inline: true },
						{ name: 'Sunday', value: 'No Stream' },
					)
					.setTimestamp()
					.setFooter('Schedule effective as of');

				await interaction.reply({ content: `Schedule for: ${user}`, embeds: [scheduleEmbed]});
			} else {
				await interaction.reply('Please specify a user!');
			}
		}
	}
});

client.login(token);