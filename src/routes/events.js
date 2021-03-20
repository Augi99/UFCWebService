const express = require('express');
const router = express.Router();


const va = require('../Validator');

const Validator = va.validator;
const validator = new Validator();


const EventModule = require('../Event');
const Event = EventModule.Event;


router.get('/', (req, res) =>
{
    Event.find()
    .then(result => 
    {
        if(result.length > 0)
        {
            res.send(prepareResponseArray(result));
        }else
        {
            res.status(404);
            res.send("No events found");
        }
    })
    .catch(error =>
    {
        console.log(error);
        res.status(404);
        res.send("Error occurred");
    });
    
    
});


router.get('/:id', (req, res) =>{
    Event.findOne({id : req.params.id})
    .then(result => 
    {
        if(result == null)
        {
            res.status(404);
            res.send("Not found");
            return;
        }
        res.send(prepareResponse(result));
    })
    .catch(error =>
    {
        res.status(404);
        res.send("An error has occurred");
    })
});

router.post('/', (req, res) => { 
    Event.findOne().sort({id:-1}).limit(1)
    .then(result => 
    {
        const previousId = result.toJSON().id;
        creation(previousId + 1, req, res);
    })
    .catch(error => 
    {
        creation(1, req, res);
    }); 
});

router.put('/:id', (req, res) =>{

    let updatedEvent = new Event(
    {
        id : req.params.id,
        name : req.body.name,
        venue : req.body.venue,
        date : req.body.date
    });

    updatedEvent = prepareResponse(updatedEvent);

    const {error} = validator.validateEvent(updatedEvent);
    if(error)
    {
        res.status(400);
        res.send("Post request must specify name, venue and date");
        return;
    }

    Event.findOneAndReplace({id : req.params.id},updatedEvent, null, (err, result) =>
    {
        if(result)
        {
            res.status(200);
            res.location("http:/localhost:5000/events/" + result.id);
            res.send(prepareResponse(result));
            
        }else
        {
            res.status(404);
            res.send("Specified id not found ");
            console.log(err);
        }
        
            
    });
});

router.delete('/:id', (req, res) => {
    Event.findOneAndDelete({id : req.params.id}, (err, result) =>
    {
        if(result)
        {
            res.status(200);
            res.send(prepareResponse(result));
            
        }else
        {
            res.status(404);
            res.send("The event did not exist");
        }
    });

});



function prepareResponseArray(result)
{
    let responseArray = [];

    for(let  i = 0; i < result.length; i++)
    {
        let response = result[i].toJSON();
        delete response._id;
        delete response.__v;
        responseArray.push(response);
    }
    return responseArray;
}


function prepareResponse(result)
{
    let response = result.toJSON();
    delete response._id;
    delete response.__v;
    
    return response;
}

function creation(identificator, req, res)
{
    let newEvent = new Event(
    {
        id : identificator,
        name : req.body.name,
        venue : req.body.venue,
        date: req.body.date
    });

    const {error} = validator.validateEvent(newEvent.toJSON());
    if(error)
    {
        res.status(400);
        res.send("Post request must specify name, venue and the date");
        return;
    }

    newEvent.save()
    .then((result) => {
        
        res.status(201);
        res.location("http:/localhost:5000/events/" + newEvent.id);
        res.send(prepareResponse(result));
    })
    .catch((err) => {
        res.send("Post failed");
    });
}

exports.eventsRoute = router;