const express = require('express');
const crud = express();
crud.use(express.json());

const er = require('./routes/events');
const eventsRoute = er.eventsRoute;



crud.use('/events',eventsRoute);

const mr = require('./routes/matches');
const matchesRoute = mr.matchesRoute;

crud.use('/events/:id/matches', passId, matchesRoute);



function passId(req, res, next)
{
    req.id = parseInt(req.params.id);
    next();
}


const port = process.env.PORT || 5000;
crud.listen(port, () => console.log(`Listening on port ${port}`));