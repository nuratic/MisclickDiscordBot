let data = [
	{
		id: 'eyJzZWdtZW50SUQiOiJjNmRlNDEwMS0xOGY3LTQwYTQtODEyYi05YzgxZjIwZDA5ZjQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MH0=',
		start_time: '2021-10-05T01:30:00Z',
		end_time: '2021-10-05T12:30:00Z',
		title: 'test2',
		canceled_until: null,
		category: null,
		is_recurring: true
	},
	{
		id: 'eyJzZWdtZW50SUQiOiIzZTU1NWRmNS1kNTMxLTQ4MzgtYTVkYi1kM2Q0ZmJiYWJhZTgiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MH0=',
		start_time: '2021-10-07T12:00:00Z',
		end_time: '2021-10-07T16:00:00Z',
		title: 'test3',
		canceled_until: null,
		category: null,
		is_recurring: true
	},
	{
		id: 'eyJzZWdtZW50SUQiOiIzZmVjOTVlYi05OWYwLTQ3MTctYmM0MS02MzgyMTcwNDJmMDgiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MH0=',
		start_time: '2021-10-10T12:00:00Z',
		end_time: '2021-10-10T16:00:00Z',
		title: 'test',
		canceled_until: null,
		category: null,
		is_recurring: true
	},
	{
		id: 'eyJzZWdtZW50SUQiOiJhYWRiODkwOC0xNTU4LTQyYzItYjVmMC04NDJmOGE2Mzc1NzEiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=',
		start_time: '2021-10-11T12:00:00Z',
		end_time: '2021-10-11T16:00:00Z',
		title: 'test1',
		canceled_until: null,
		category: null,
		is_recurring: true
	},
	{
		id: 'eyJzZWdtZW50SUQiOiJjNmRlNDEwMS0xOGY3LTQwYTQtODEyYi05YzgxZjIwZDA5ZjQiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=',
		start_time: '2021-10-12T12:30:00Z',
		end_time: '2021-10-12T16:30:00Z',
		title: 'test2',
		canceled_until: null,
		category: null,
		is_recurring: true
	},
	{
		id: 'eyJzZWdtZW50SUQiOiIzZTU1NWRmNS1kNTMxLTQ4MzgtYTVkYi1kM2Q0ZmJiYWJhZTgiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=',
		start_time: '2021-10-14T12:00:00Z',
		end_time: '2021-10-14T16:00:00Z',
		title: 'test3',
		canceled_until: null,
		category: null,
		is_recurring: true
	},
	{
		id: 'eyJzZWdtZW50SUQiOiIzZmVjOTVlYi05OWYwLTQ3MTctYmM0MS02MzgyMTcwNDJmMDgiLCJpc29ZZWFyIjoyMDIxLCJpc29XZWVrIjo0MX0=',
		start_time: '2021-10-17T12:00:00Z',
		end_time: '2021-10-17T16:00:00Z',
		title: 'test',
		canceled_until: null,
		category: null,
		is_recurring: true
	}
];

let days = [];
let days1 = [];

for (let i = 0; i < 7; i++) {
	const day = new Date(data[i]["start_time"])
	if (days.includes(Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(day))) break;

	days.push(Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(day));
	let start_time = parseInt(data[i]["start_time"].substring(11).substring(0, data[i]["start_time"].substring(11).length-7)) + 10;
	let end_time = parseInt(data[i]["end_time"].substring(11).substring(0, data[i]["end_time"].substring(11).length-7)) + 10;
	if (start_time > 24) start_time -= 24;
	if (end_time > 24) end_time -= 24;

	start_time += data[i]["start_time"].substring(13).substring(0, data[i]["start_time"].substring(11).length-6);
	end_time += data[i]["end_time"].substring(13).substring(0, data[i]["end_time"].substring(11).length-6);

	// console.log(start_time.substring(2));

	if (parseInt(start_time) >= 12 && parseInt(start_time) <= 23) {
		if (parseInt(start_time) == 12) { start_time += "PM" } else { start_time = (parseInt(start_time.substring(0, 2))-12) + `${start_time.substring(2)}PM` }
	} else { start_time += "AM" }
	console.log(start_time);

	if (parseInt(end_time) >= 12 && parseInt(end_time) <= 23) {
		if (parseInt(end_time) == 12) { end_time += "PM" } else { end_time = (parseInt(end_time.substring(0, 2))-12) + `${end_time.substring(2)}PM` }
	} else { end_time += "AM" }
	console.log(end_time);

	// if (parseInt(end_time) >= 12 && parseInt(end_time) <= 23) {
	// 	if (parseInt(end_time) == 12) { end_time += "PM" } else { end_time = (parseInt(end_time)-12) + "PM"}
	// } else { end_time += "AM" }

	days1.push({"days": Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(day), "start_time": start_time, "end_time": end_time});
}

const map = {'Monday': 1,'Tuesday': 2,'Wednesday': 3,'Thursday': 4,'Friday': 5,'Saturday': 6,'Sunday': 7};

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

console.log(days);
console.log(days1);
// console.log(start_time);
// console.log(end_time);