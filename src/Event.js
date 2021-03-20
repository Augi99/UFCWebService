const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({ 
    id: Number,
    name : String,
    venue: String,
    date : String
});

const Event = mongoose.model('Event', eventSchema);
exports.Event = Event; 