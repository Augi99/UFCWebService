const ev = require('./Event');
const Event = ev.event;
let events = [];

const ma = require('./Match');
const Match = ma.match;
let matches = [];

initialize();

function initialize()
{
    events.push(new Event(0,"UFC259", "UFC Apex", "2021:03:06"));

    matches.push(new Match(0, 0, "Jan Błachowicz", "Israel Adesanya", "Light Heavyweight", true));
    matches.push(new Match(0, 1, "Amanda Nunes", "Megan Anderson", "Women's Featherweight", true));
    matches.push(new Match(0, 2, "Petr Yan", "Aljemain Sterling", "Bantamweight", true));
    matches.push(new Match(0, 3, "Islam Makhachev", "Drew Dober", "Lightweight", false));
    matches.push(new Match(0, 4, "Aleksandar Rakić", "Thiago Santos", "Light heavyweight", false));
}

exports.eventsArray = events;
exports.matchesArray = matches;