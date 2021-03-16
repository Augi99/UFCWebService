class Match{
    constructor(eventId, id, fighter1, fighter2, division, championship){
        this.eventId = eventId;
        this.id = id;
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.division = division;
        this.championship = championship;
    }

    deletionBody(req, res, matches)
    {
        console.log(parseInt(req.params.id) + " " + req.body.id );
        let match = matches.find(m => (m.eventId === parseInt(req.params.id) &&  req.body.id === m.id ));
        if(!match)
        {
            res.status(404);
            return 'Not found';
        }

    
        const index = matches.indexOf(match);
    

        matches.splice(index, 1);

    
        return matches;
    }

    deletion(req, res, matches)
    {
        let match = matches.find(m => (m.eventId === parseInt(req.params.id1) &&  parseInt(req.params.id2)=== m.id ));
        if(!match)
        {
            res.status(404);
           return 'Not found';
        }

    
        const index = matches.indexOf(match);

        matches.splice(index, 1);

    
        return matches;
    }

    update(req, res, matches, validator)
    {
        let match = matches.find(m =>(m.eventId === parseInt(req.params.id1) && m.id === parseInt(req.params.id2)));
        if(!match)
        {
            res.status(404);
            return 'Not found';
        }
    
        const {error} = validator.validateMatchUpdate(req.body);
    
        if(error)
        {
            res.status(400);
            return "Invalid update data";
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
    
        return matches;
    }

    creation(req, res, matches, validator)
    {
        const newMatch = new Match(parseInt(req.params.id), matches.length, req.body.fighter1, req.body.fighter2, req.body.division, req.body.championship);

        const {error} = validator.validateMatch(newMatch);
        if(error)
        {
            res.status(400);
            return "Post request must specify two fighters, their weight division and whether a title is being defended";
        }
    
        matches.push(newMatch);
        return matches;
    }

}

exports.match = Match;