const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({ 
    eventId : Number,
    id: Number,
    fighter1 : String,
    fighter2: String,
    division : String,
    championship : Boolean
});



const Match = mongoose.model('Match', matchSchema);
exports.Match = Match; 