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

	const messages = await interaction.channel.messages.fetch({limit:2});
	console.log(messages);

	const { commandName } = interaction;
	
// 	client.channels.fetch('823600382064197673')
//   .then(channel => console.log(channel.name))
//   .catch(console.error);

//   console.log(interaction.createdTimestamp);

	if (commandName === 'schedule') {
		if (interaction.options.getSubcommand('get')) {
			const user = interaction.options.getString('twitch');

			if (user) {
				const scheduleEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setAuthor(`${user}`, 'https://i.imgur.com/AfFp7pu.png', `https://twitch.tv/${user}`)
					.setDescription(`Twtich streaming schedule for ${user}`)
					.addFields(
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Monday', value: 'No Stream', inline: true },
						{ name: 'Tuesday', value: 'Live: 6PM - 9PM', inline: true },
						{ name: 'Wednesday', value: 'Live: 6PM - 9PM', inline: true },
						{ name: 'Thursday', value: 'Live: 11AM - 5PM', inline: true },
						{ name: 'Friday', value: 'No Steam', inline: true },
						{ name: 'Saturday', value: 'No Stream', inline: true },
						{ name: 'Sunday', value: 'No Stream' },
					)
					// .setTimestamp()

				await interaction.reply({ content: `Schedule for: ${user}`, embeds: [scheduleEmbed]});
			} else {
				await interaction.reply('Please specify a user!');
			}
		} else if (interaction.options.getSubcommand('update')) {
			const user = interaction.options.getString('twitch');

			if (user) {
				const scheduleEmbed = new MessageEmbed()
					.setColor('#0099ff')
					.setAuthor(`${user}`, 'https://i.imgur.com/AfFp7pu.png', `https://twitch.tv/${user}`)
					.setDescription(`Twtich streaming schedule for ${user}`)
					.addFields(
						{ name: '\u200B', value: '\u200B' },
						{ name: 'Monday', value: 'No Stream', inline: true },
						{ name: 'Tuesday', value: 'Live: 6PM - 9PM', inline: true },
						{ name: 'Wednesday', value: 'Live: 6PM - 9PM', inline: true },
						{ name: 'Thursday', value: 'Live: 11AM - 5PM', inline: true },
						{ name: 'Friday', value: 'No Steam', inline: true },
						{ name: 'Saturday', value: 'No Stream', inline: true },
						{ name: 'Sunday', value: 'No Stream' },
					)
					// .setTimestamp()

				await interaction.reply({ content: `Schedule for: ${user}`, embeds: [scheduleEmbed]});
			} else {
				await interaction.reply('Please specify a user!');
			}
		}
	}
});

client.login(token);