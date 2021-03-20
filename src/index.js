const express = require('express');
const crud = express();
crud.use(express.json());

const DBUser = 'mongodb+srv://Dana:White@ufcwebservicedb.icdfo.mongodb.net/UFCWebServiceDataBase?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(DBUser, {useNewUrlParser : true, useUnifiedTopology : true})
    .then((result) => startListening())
    .catch((error) => console.log(error));


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


function startListening()
{
    const port = process.env.PORT || 5000;
    crud.listen(port, () => console.log(`Listening on port ${port}`));
}