const express = require('express');
const crud = express();
crud.use(express.json());

const ev = require('./Event');
const Event = ev.event;
let events = [];

const ma = require('./Match');
const Match = ma.match;
let matches = [];

initialize();

const va = require('./Validator');

const Validator = va.validator;
const validator = new Validator();

crud.get('/events', (req, res) => {
    res.send(events);
});

crud.get('/events/:id', (req, res) =>{
    res.send(events[req.params.id]);
});

crud.post('/events', (req, res) => { 
    res.send(new Event().creation(req, res, events, validator));
});

crud.put('/events/:id', (req, res) => {
    res.send(new Event().update(req, res, events, validator));
});

crud.delete('/events/:id', (req, res) => {
    res.send(new Event().deletion(req.params.id, res, events));
});




crud.get('/events/:id/matches', (req, res) => {
    let theseMatches = matches.filter(m => m.eventId === parseInt(req.params.id));
    res.send(theseMatches);
});

crud.get('/events/:id1/matches/:id2', (req, res) => {
    let theseMatches = matches.filter(m => m.eventId === parseInt(req.params.id1) && m.id === parseInt(req.params.id2));
    res.send(theseMatches);
});

crud.post('/events/:id/matches', (req, res) => {
    res.send(new Match().creation(req, res, matches, validator));
});

crud.put('/events/:id1/matches/:id2', (req, res) =>{
    res.send(new Match().update(req, res, matches, validator));
});

crud.delete('/events/:id/matches', (req, res) => {
    res.send(new Match().deletionBody(req, res, matches));
});

crud.delete('/events/:id1/matches/:id2', (req, res) => {
    res.send(new Match().deletion(req, res, matches));
});


function initialize()
{
    events.push(new Event(0,"UFC259", "UFC Apex", "2021:03:06"));

    matches.push(new Match(0, 0, "Jan Błachowicz", "Israel Adesanya", "Light Heavyweight", true));
    matches.push(new Match(0, 1, "Amanda Nunes", "Megan Anderson", "Women's Featherweight", true));
    matches.push(new Match(0, 2, "Petr Yan", "Aljemain Sterling", "Bantamweight", true));
    matches.push(new Match(0, 3, "Islam Makhachev", "Drew Dober", "Lightweight", false));
    matches.push(new Match(0, 4, "Aleksandar Rakić", "Thiago Santos", "Light heavyweight", false));
}

const port = process.env.PORT || 5000;
crud.listen(port, () => console.log(`Listening on port ${port}`));