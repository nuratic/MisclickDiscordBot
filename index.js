const  request  = require('request');
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, GuildMember } = require('discord.js');
const { token, twitchClientId, accessToken } = require('./config.json');
const { time } = require('@discordjs/builders');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
	if (commandName === 'schedule') {
		if (interaction.options.getSubcommand() === "get") {
			const user = interaction.options.getString('twitch');

			if (user) {
				let schedule = '';
				const getUser = (url, callback) => {
					const options =  {
						url: `https://api.twitch.tv/helix/users?login=${user}`,
						json: true,
						headers: { "Authorization": `Bearer ${accessToken}`, "Client-Id": twitchClientId }
					};
					request.get(options, (err, res, body) => {
						if (err) return console.log(err);
						callback(res);
					});
				};
				let bID = "";
				let profPic = "";
				getUser(`https://api.twitch.tv/helix/users?login=${user}`, (res) => {
					if (!res.body['data'].length == 0) {
						bID = res.body['data'][0]['id'];
						profPic = res.body['data'][0]['profile_image_url'];
						return bID, profPic
					} else {
						bID = ""
						profPic = ""
						return bID, profPic
					}
				})

				setTimeout(() => {
					if (bID !== "") {
						const getSchedule = (url, callback) => {
							const options =  {
								url: `https://api.twitch.tv/helix/schedule?broadcaster_id=${bID}&first=7`,
								json: true,
								headers: { "Authorization": `Bearer ${accessToken}`, "Client-Id": twitchClientId }
							};
							request.get(options, (err, res, body) => {
								if (err) return console.log(err);
								callback(res);
							});
						};
						getSchedule(`https://api.twitch.tv/helix/schedule?broadcaster_id=${bID}&first=7`, (res) => {
							if (res.body['error']) {
								schedule = ""
							} else {
								schedule = res.body['data']['segments'];
							}
							return schedule;
						})
					}
				}, 1000)

				setTimeout(() => {
					if (bID !== "" && schedule !== "") {
						let days = [];
						let days1 = [];

						for (let i = 0; i < 7; i++) {
							const day = new Date(schedule[i]["start_time"])
							if (days.includes(Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(day))) break;

							days.push(Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(day));
							let start_time = schedule[i]["start_time"].substring(11).substring(0, schedule[i]["start_time"].substring(11).length-7);
							let end_time = schedule[i]["end_time"].substring(11).substring(0, schedule[i]["end_time"].substring(11).length-7);

							if (parseInt(start_time) >= 12 && parseInt(start_time) <= 23) {
								if (parseInt(start_time) == 12) { start_time += "PM" } else { start_time = (parseInt(start_time)-12) + "PM" }
							} else { start_time += "AM" }

							if (parseInt(end_time) >= 12 && parseInt(end_time) <= 23) {
								if (parseInt(end_time) == 12) { end_time += "PM" } else { end_time = (parseInt(end_time)-12) + "PM"}
							} else { end_time += "AM" }

							days1.push({"days": Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(day), "start_time": start_time, "end_time": end_time});
						}

						const map = {'Monday': 1,'Tuesday': 2,'Wednesday': 3,'Thursday': 4,'Friday': 5,'Saturday': 6,'Sunday': 7};

						const scheduleEmbed = new MessageEmbed().setColor('#cb5284').setTitle(`${capitalizeFirstLetter(user)}'s Schedule`).setURL(`https://twitch.tv/${user}`).setThumbnail(`${profPic}`)


						let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

						for (let i = 0; i < days1.length; i++) {
							const index = weekdays.indexOf(days1[i]['days']);
							if (index > -1) weekdays.splice(index, 1);
						}

						if (weekdays.length > 0) {
							for (let i = 0; i < weekdays.length; i++) {
								days1.push({"days": weekdays[i], "start_time": "No", "end_time": "Stream"});
							}
						}

						days1.sort((a, b) => { return map[a.days] - map[b.days];});

						for (let i = 0; i < days1.length; i++) {
							if (days1[i]['start_time'] == "No") {
								scheduleEmbed.addField(`${days1[i]['days']}`, `${days1[i]['start_time']} ${days1[i]['end_time']}`, true )
							} else {
								scheduleEmbed.addField(`${days1[i]['days']}`, `${days1[i]['start_time']} - ${days1[i]['end_time']}`, true )
							}
						}

						scheduleEmbed.setTimestamp().setFooter('Schedule effective as of');
						interaction.reply({ content: `Schedule for: ${user}`, embeds: [scheduleEmbed]})
					} else {
						if (bID === "") {
							interaction.reply('Please specify a valid user!');
						} else if (schedule === "") {
							interaction.reply('No schedule is available for this user');
						}
					}
				},2000)
			} else {
				await interaction.reply('Please specify a user!');
			}
		} else if (interaction.options.getSubcommand() === 'update') {
			const user = interaction.options.getString('twitch');

			if (user) {
				const messages = await interaction.channel.messages.fetch();
				const filtered = messages.filter(i => i.content === `Schedule for: ${user}`);
				await interaction.channel.bulkDelete(filtered);

				let schedule = '';
				const getUser = (url, callback) => {
					const options =  {
						url: `https://api.twitch.tv/helix/users?login=${user}`,
						json: true,
						headers: { "Authorization": `Bearer ${accessToken}`, "Client-Id": twitchClientId }
					};
					request.get(options, (err, res, body) => {
						if (err) return console.log(err);
						callback(res);
					});
				};
				let bID = "";
				let profPic = "";
				getUser(`https://api.twitch.tv/helix/users?login=${user}`, (res) => {
					if (!res.body['data'].length == 0) {
						bID = res.body['data'][0]['id'];
						profPic = res.body['data'][0]['profile_image_url'];
						return bID, profPic
					} else {
						bID = ""
						profPic = ""
						return bID, profPic
					}
				})

				setTimeout(() => {
					if (bID !== "") {
						const getSchedule = (url, callback) => {
							const options =  {
								url: `https://api.twitch.tv/helix/schedule?broadcaster_id=${bID}&first=7`,
								json: true,
								headers: { "Authorization": `Bearer ${accessToken}`, "Client-Id": twitchClientId }
							};
							request.get(options, (err, res, body) => {
								if (err) return console.log(err);
								callback(res);
							});
						};
						getSchedule(`https://api.twitch.tv/helix/schedule?broadcaster_id=${bID}&first=7`, (res) => {
							if (res.body['error']) {
								schedule = ""
							} else {
								schedule = res.body['data']['segments'];
							}
							return schedule;
						})
					}
				},1000)

				setTimeout(() => {
					if (bID !== "" && schedule !== "") {
						let days = [];
						let days1 = [];

						for (let i = 0; i < 7; i++) {
							const day = new Date(schedule[i]["start_time"])
							if (days.includes(Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(day))) break;

							days.push(Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(day));
							let start_time = schedule[i]["start_time"].substring(11).substring(0, schedule[i]["start_time"].substring(11).length-7);
							let end_time = schedule[i]["end_time"].substring(11).substring(0, schedule[i]["end_time"].substring(11).length-7);

							if (parseInt(start_time) >= 12 && parseInt(start_time) <= 23) {
								if (parseInt(start_time) == 12) { start_time += "PM" } else { start_time = (parseInt(start_time)-12) + "PM" }
							} else { start_time += "AM" }

							if (parseInt(end_time) >= 12 && parseInt(end_time) <= 23) {
								if (parseInt(end_time) == 12) { end_time += "PM" } else { end_time = (parseInt(end_time)-12) + "PM"}
							} else { end_time += "AM" }

							days1.push({"days": Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(day), "start_time": start_time, "end_time": end_time});
						}

						const map = {'Monday': 1,'Tuesday': 2,'Wednesday': 3,'Thursday': 4,'Friday': 5,'Saturday': 6,'Sunday': 7};

						const scheduleEmbed = new MessageEmbed().setColor('#cb5284').setTitle(`${capitalizeFirstLetter(user)}'s Schedule`).setURL(`https://twitch.tv/${user}`).setThumbnail(`${profPic}`)

						let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

						for (let i = 0; i < days1.length; i++) {
							const index = weekdays.indexOf(days1[i]['days']);
							if (index > -1) weekdays.splice(index, 1);
						}

						if (weekdays.length > 0) {
							for (let i = 0; i < weekdays.length; i++) days1.push({"days": weekdays[i], "start_time": "No", "end_time": "Stream"});
						}

						days1.sort((a, b) => { return map[a.days] - map[b.days];});

						for (let i = 0; i < days1.length; i++) {
							if (days1[i]['start_time'] == "No") {
								scheduleEmbed.addField(`${days1[i]['days']}`, `${days1[i]['start_time']} ${days1[i]['end_time']}`, true )
							} else {
								scheduleEmbed.addField(`${days1[i]['days']}`, `${days1[i]['start_time']} - ${days1[i]['end_time']}`, true )
							}
						}

						scheduleEmbed.setTimestamp().setFooter('Schedule effective as of');
						interaction.reply({ content: `Schedule for: ${user}`, embeds: [scheduleEmbed]})
					} else {
						if (bID === "") {
							interaction.reply('Please specify a valid user!');
						} else if (schedule === "") {
							interaction.reply('No schedule is available for this user');
						}
					}
				},2000)
			} else {
				await interaction.reply('Please specify a user!');
			}
		}
	}
});

client.login(token);

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}