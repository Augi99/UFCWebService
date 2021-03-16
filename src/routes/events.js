const express = require('express');
const router = express.Router();
const init = require('../initialization.js');
let events = init.eventsArray;


const va = require('../Validator');

const Validator = va.validator;
const validator = new Validator();

const ev = require('../Event');
const Event = ev.event;


router.get('/', (req, res) =>
{
    res.send(events);
});

router.get('/:id', (req, res) =>{
    res.send(events[req.params.id]);
});

router.post('/', (req, res) => { 
    const newEvent = new Event(events.length, req.body.name, req.body.venue, req.body.date);
    const {error} = validator.validateEvent(newEvent);
    if(error)
    {
        res.status(400);
        res.send("Post request must specify name, venue and date");
    }
    events.push(newEvent);
    res.status(200);
    res.send(events);
});

router.put('/:id', (req, res) => {
    let event = events.find(e => e.id === parseInt(req.params.id));
    if(!event)
    {
        res.status(404);
        res.send('Not found');
    }

    const {error} = validator.validateEventUpdate(req.body);

    if(error)
    {
        res.status(400);
        res.send("Invalid update data");
    }

    if(req.body.name)
    {
        event.name = req.body.name;
    }

    if(req.body.venue)
    {
        event.venue = req.body.venue;
    }

    if(req.body.date)
    {
        event.date = req.body.date;
    }
    res.send(events);
});

router.delete('/:id', (req, res) => {
    let event = events.find(e => e.id === parseInt(req.params.id));
    if(!event)
    {
        res.status(400);
        res.send("No such event");
    }

    const index = events.indexOf(event);

    events.splice(index, 1);

    res.send(events);
});

exports.eventsRoute = router;