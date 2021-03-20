const Joi = require('joi');

class Validator{
    constructor(){
        this.eventSchema = {
            _id : Joi.any(),
            id : Joi.number().integer().min(1).required(),
            name : Joi.string().required(),
            venue : Joi.string().required(),
            date : Joi.string().required()
        };

        this.matchSchema = {
            _id : Joi.any(),
            eventId : Joi.number().integer().min(1).required(),
            id : Joi.number().integer().min(0).required(),
            fighter1: Joi.string().required(),
            fighter2 : Joi.string().required(),
            division : Joi.valid('Flyweight', 'Bantamweight', 'Featherweight', 
            'Lightweight', 'Welterweight', 'Middleweight', 'Light Heavyweight', 'Heavyweight', 
            "Women's Strawweight", "Women's Flyweight", "Women's Bantamweight", "Women's Featherweight").required(),
            championship : Joi.boolean().required()
        };


    }

    validateEvent(event){
        return Joi.validate(event, this.eventSchema);
    }

    validateMatch(match){
        return Joi.validate(match, this.matchSchema);
    }
}

exports.validator = Validator;





