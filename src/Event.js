class Event{
    constructor(id, name, venue, date){
        this.id = id;
        this.name = name;
        this.venue = venue;
        this.date = date;
    }

    deletion(id, res, events){
        let event = events.find(e => e.id === parseInt(id));
        if(!event)
        {
            res.status(400);
            return "No such event";
        }
    
        const index = events.indexOf(event);
    
        events.splice(index, 1);

        return events;
    }

    update(req, res, events, validator){
        let event = events.find(e => e.id === parseInt(req.params.id));
        if(!event)
        {
            res.status(404);
            return 'Not found';
        }

        const {error} = validator.validateEventUpdate(req.body);

        if(error)
        {
            res.status(400);
            return "Invalid update data";
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
        return events;
    }

    creation(req, res, events, validator){
        const newEvent = new Event(events.length, req.body.name, req.body.venue, req.body.date);
        const {error} = validator.validateEvent(newEvent);
        if(error)
        {
            res.status(400);
            return "Post request must specify name, venue and date";
        }
        events.push(newEvent);
        res.status(200);
        return events;
    }


}

exports.event = Event; 