const express = require('express');
const router = express.Router();
const init = require('../initialization.js');
let matches = init.matchesArray;


const va = require('../Validator');

const Validator = va.validator;
const validator = new Validator();

const ev = require('../Match');
const Match = ev.match;


router.get('/', (req, res) => {
    let theseMatches = matches.filter(m => m.eventId === req.id);
    res.send(theseMatches);
});


router.get('/:id', (req, res) => {
    let theseMatches = matches.filter(m => m.eventId === req.id && m.id === parseInt(req.params.id));
    res.send(theseMatches);
});

router.post('/', (req, res) => {
    const newMatch = new Match(req.id, matches.length, req.body.fighter1, req.body.fighter2, req.body.division, req.body.championship);

    const {error} = validator.validateMatch(newMatch);
    if(error)
    {
        res.status(400);
        res.send("Post request must specify two fighters, their weight division and whether a title is being defended");
    }

    matches.push(newMatch);
    res.send(matches);
});

router.put('/:id', (req, res) =>{
    let match = matches.find(m =>(m.eventId === req.id && m.id === parseInt(req.params.id)));
    if(!match)
    {
        res.status(404);
        res.send('Not found');
    }

    const {error} = validator.validateMatchUpdate(req.body);

    if(error)
    {
        res.status(400);
        res.send("Invalid update data");
    }

    if(req.body.eventId)
    {
        match.eventId = req.body.EventId;
    }

    if(req.body.fighter1)
    {
        match.fighter1 = req.body.fighter1;
    }

    if(req.body.fighter2)
    {
        match.fighter2 = req.body.fighter2;
    }

    if(req.body.division)
    {
        match.division = req.body.division;
    }

    if(req.body.championship)
    {
        match.championship = req.body.championship;
    }

    res.send(matches);
});

router.delete('/', (req, res) => {
    let match = matches.find(m => (m.eventId === req.id &&  req.body.id === m.id ));
    if(!match)
    {
        res.status(404);
        res.send('Not found');
    }


    const index = matches.indexOf(match);


    matches.splice(index, 1);


    res.send(matches);
});

router.delete('/:id', (req, res) => {
    let match = matches.find(m => (m.eventId === req.id &&  parseInt(req.params.id)=== m.id ));
    if(!match)
    {
        res.status(404);
       res.send('Not found');
    }


    const index = matches.indexOf(match);

    matches.splice(index, 1);


    res.send(matches);
});


exports.matchesRoute = router;