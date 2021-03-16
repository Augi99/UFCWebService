class Match{
    constructor(eventId, id, fighter1, fighter2, division, championship){
        this.eventId = eventId;
        this.id = id;
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.division = division;
        this.championship = championship;
    }
}

exports.match = Match;