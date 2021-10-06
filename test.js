const  request  = require('request');
const { twitchClientId, accessToken } = require('./config.json');

let schedule = '';
const getUser = (url, callback) => {
    const options =  {
        url: "https://api.twitch.tv/helix/users?login=briziana",
        json: true,
        headers: { "Authorization": `Bearer ${accessToken}`, "Client-Id": twitchClientId }
    };
    request.get(options, (err, res, body) => {
        if (err) { return console.log(err); }
        callback(res);
    });
};
let bID = "";
getUser("https://api.twitch.tv/helix/users?login=briziana", (res) => {
    console.log(res.body);
    bID = res.body['data'][0]['id'];
    return bID
})

setTimeout(() => {
    const getSchedule = (url, callback) => {
        const options =  {
            url: `https://api.twitch.tv/helix/schedule?broadcaster_id=${bID}&first=7`,
            json: true,
            headers: { "Authorization": `Bearer ${accessToken}`, "Client-Id": twitchClientId }
        };
        request.get(options, (err, res, body) => {
            if (err) { return console.log(err); }
            callback(res);
        });
    };
    getSchedule(`https://api.twitch.tv/helix/schedule?broadcaster_id=${bID}&first=7`, (res) => {
        schedule = res.body['data']['segments'];
        return schedule;
    })
}, 1000)

setTimeout(() => {
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

    days1.sort((a, b) => { return map[a.days] - map[b.days];});
    console.log(days);
    console.log(days1);
}, 2000)