const  request  = require('request');
// const { twitchClientId, twitchClientSecret } = require('./config.json');
let twitchClientId = "yoa1wnlvurwzkux8n0aia8odq2kqoc";
let AT = "4ggco30iiei14jsmy0c92iwjt6z0na";

// const getToken = (url, callback) => {
//     const options =  {
//         url: "https://id.twitch.tv/oauth2/token",
//         json: true,
//         body: {
//             client_id: twitchClientId,
//             client_secret: twitchClientSecret,
//             grant_type: "client_credentials"
//         }
//     };

//     request.post(options, (err, res, body) => {
//         if (err) {
//             return console.log(err);
//         }
//         // console.log(`Status: ${res.statusCode}`);
//         console.log(body);

//         callback(res);
//     });
// };

// let AT = "";
// getToken("https://id.twitch.tv/oauth2/token", (res) => {
//     // console.log(res.body)
//     AT = res.body.access_token;
//     return AT;
// })

let schedule = '';

// setTimeout(() => {
    const getUser = (url, callback) => {
        const options =  {
            url: "https://api.twitch.tv/helix/users?login=nuratic",
            json: true,
            headers: {
                "Authorization": `Bearer ${AT}`,
                "Client-Id": twitchClientId
            }
        };
    
        request.get(options, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            // console.log(`Status: ${res.statusCode}`);
            // console.log(body);
    
            callback(res);
        });
    };
    let bID = "";
    getUser("https://api.twitch.tv/helix/users?login=nuratic", (res) => {
        // console.log(res.body['data'][0]['id'])
        bID = res.body['data'][0]['id'];
        return bID
    })

    setTimeout(() => {
        const getSchedule = (url, callback) => {
            const options =  {
                url: `https://api.twitch.tv/helix/schedule?broadcaster_id=${bID}&first=7`,
                json: true,
                headers: {
                    "Authorization": `Bearer ${AT}`,
                    "Client-Id": twitchClientId
                }
            };
        
            request.get(options, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }
                // console.log(`Status: ${res.statusCode}`);
                // console.log(body);
        
                callback(res);
            });
        };
        
        getSchedule(`https://api.twitch.tv/helix/schedule?broadcaster_id=${bID}&first=10`, (res) => {
            // console.log(res.body['data']['segments'][1]['start_time']);
            console.log(res.body['data']['segments']);
            // console.log(res.body['data']['segments'][1]['end_time']);
            // schedule = res.body['data'];
            return schedule;
        })
    }, 2000)
// }, 1000);


// https://www.delftstack.com/howto/javascript/javascript-wait-for-function-to-finish/