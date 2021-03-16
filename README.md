# UFC Web Service

## Instructions
* git clone https://github.com/Augi99/UFCWebService
* docker build -t ufc:1.0 .
* docker run -d -p 5000:5000 ufc:1.0

## Test data

### Get

URL: http://localhost:5000/events

URL: http://localhost:5000/events/0

URL: http://localhost:5000/events/0/matches

URL: http://localhost:5000/events/0/matches/2

### POST

URL: http://localhost:5000/events

Body:

{
    "name" : "UFC260",
    "venue": "UFC Apex",
    "date": "2021:03:27"
}

URL: http://localhost:5000/events/0/matches

Body:

{
    "fighter1": "Dominick Cruz",
    "fighter2": "Casey Kenney",
    "division": "Bantamweight",
    "championship": false
}

### PUT

URL: http://localhost:5000/events

Body:

{
    "name" : "UFC260 Błachowicz vs. Adesanya" 
}

URL: http://localhost:5000/events/0/matches/3

Body:

{
    "fighter1": "Drew Dober",
    "fighter2": "Islam Makhachev"
}


### DELETE

URL: http://localhost:5000/events/1

URL: http://localhost:5000/events/0/matches

Body:

{
    "id": 3
}

URL: http://localhost:5000/events/0/matches/4



## Swagger API definition

https://app.swaggerhub.com/apis/Augi99/UFCWebService/0.1#/

