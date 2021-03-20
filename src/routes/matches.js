const express = require('express');
const router = express.Router();


const va = require('../Validator');

const Validator = va.validator;
const validator = new Validator();

const MatchModule = require('../Match');
const Match = MatchModule.Match;


router.get('/', (req, res) => {
    
    Match.find({eventId : req.id ,})
    .then(result => 
    {
        if(result.length > 0)
        {
            res.send(prepareResponseArray(result));
        }else
        {
            res.status(404);
            res.send("No match found");
        }
    })
    .catch(error =>
    {
        console.log(error);
        res.status(404);
        res.send("Error occurred");
    });
});

router.get('/:id', (req, res) => {

    Match.findOne({eventId : req.id ,id : req.params.id})
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
        res.send(error);
    })

});


router.post('/', (req, res) => {
    Match.findOne({eventId : req.id }).sort({id:-1}).limit(1)
    .then(result => 
    {
        const previousId = result.toJSON().id;
        creation(previousId + 1, req, res);
    })
    .catch(error => 
    {
        creation(1, req, res);
    })
});

router.put('/:id', (req, res) =>{

    let updatedMatch = new Match(
    {
        eventId : req.id,
        id : req.params.id,
        fighter1 : req.body.fighter1,
        fighter2 : req.body.fighter2,
        division : req.body.division,
        championship : req.body.championship
    });
    
    updatedMatch = prepareResponse(updatedMatch);

    const {error} = validator.validateMatch(updatedMatch);
    if(error)
    {
        res.status(400);
        console.log(error);
        res.send("Post request must specify two fighters, their weight division and whether a title is being defended");
        return;
    }

    Match.findOneAndReplace({id : req.params.id}, updatedMatch ,null, (err, result) =>
    {
        if(result)
        {
            res.status(200);
            res.location("http:/localhost:5000/events/" + result.eventId + "/matches/" + result.id);
            res.send(prepareResponse(result));
        }else
        {
            res.status(404);
            res.send("Specified id not found");
        }
    });

});

router.delete('/:id', (req, res) => {
    Match.findOneAndDelete({eventId : req.id ,id : req.params.id}, (err, result) =>
    {
        if(result)
        {
            res.status(200);
            res.send(prepareResponse(result));
            
        }else
        {
            res.status(404);
            res.send("The match did not exist");
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
    let newMatch = new Match(
    {
        eventId : req.id,
        id : identificator,
        fighter1 : req.body.fighter1,
        fighter2 : req.body.fighter2,
        division : req.body.division,
        championship : req.body.championship
    });

    const {error} = validator.validateMatch(newMatch.toJSON());
    if(error)
    {
        console.log(error);
        res.status(400);
        res.send("Post request must specify two fighters, their weight division and whether a title is being defended");
        return ;
    }

    newMatch.save()
    .then((result) => {
        
        res.status(201);
        res.location("http:/localhost:5000/events/" + newMatch.eventId + "/matches/" + newMatch.id);
        res.send(prepareResponse(result));
    })
    .catch((err) => {
        res.send("Post failed");
    });
}

exports.matchesRoute = router;