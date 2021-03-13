const Joi = require('joi');

class Validator{
    constructor(){
        this.eventSchema = {
            id : Joi.number().integer().min(0).required(),
            name : Joi.string().required(),
            venue : Joi.string().required(),
            date : Joi.date().required()
        };

        this.matchSchema = {
            eventId : Joi.number().integer().min(0).required(),
            id : Joi.number().integer().min(0).required(),
            fighter1: Joi.string().required(),
            fighter2 : Joi.string().required(),
            division : Joi.any().valid('Flyweight', 'Bantamweight', 'Featherweight', 
            'Lightweight', 'Welterweight', 'Middleweight', 'Light Heavyweight', 'Heavyweight', 
            "Women's Strawweight", "Women's Flyweight", "Women's Bantamweight", "Women's Featherweight").required(),
            championship : Joi.boolean().required()
        };

        this.eventUpdateSchema = {
            id : Joi.number().integer().min(0),
            name : Joi.string(),
            venue : Joi.string(),
            date : Joi.date()
        };

        this.matchUpdateSchema = {
            eventId : Joi.number().integer().min(0),
            id : Joi.number().integer().min(0),
            fighter1: Joi.string(),
            fighter2 : Joi.string(),
            division : Joi.any().valid('Flyweight', 'Bantamweight', 'Featherweight', 
            'Lightweight', 'Welterweight', 'Middleweight', 'Light Heavyweight', 'Heavyweight', 
            "Women's Strawweight", "Women's Flyweight", "Women's Bantamweight", "Women's Featherweight"),
            championship : Joi.boolean()
        };
    }

    validateEvent(event){
        return Joi.validate(event, this.eventSchema);
    }

    validateMatch(match){
        return Joi.validate(match, this.matchSchema);
    }

    validateEventUpdate(event){
        return Joi.validate(event, this.eventUpdateSchema);
    }

    validateMatchUpdate(match){
        return Joi.validate(match, this.matchUpdateSchema);
    }
}

exports.validator = Validator;





