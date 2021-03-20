# UFC Web Service

## Instructions
* git clone https://github.com/Augi99/UFCWebService
* cd UFCWebService
* docker-compose up

## Test data

### Get

URL: 
http://localhost:5000/events

URL: 
http://localhost:5000/events/1

URL: 
http://localhost:5000/events/1/matches

URL: 
http://localhost:5000/events/1/matches/3

### POST

URL: 
http://localhost:5000/events

Body:

{
    "name" : "UFC260",
    "venue": "UFC Apex",
    "date": "2021-03-27"
}

URL: 
http://localhost:5000/events/1/matches

Body:

{
    "fighter1": "Dominick Cruz",
    "fighter2": "Casey Kenney",
    "division": "Bantamweight",
    "championship": false
}

### PUT

URL: 
http://localhost:5000/events/2

Body:

{
    "name" : "UFC260 Błachowicz vs. Adesanya" ,
    "venue" : "UFC  Apex",
    "date" : "2021-03-06"
}

URL: 
http://localhost:5000/events/1/matches/4

Body:

{
    "fighter1": "Drew Dober",
    "fighter2": "Islam Makhachev"
    "division" : "Lightweight",
    "championship" : false
}


### DELETE

URL: 
http://localhost:5000/events/2

URL: 
http://localhost:5000/events/1/matches/4



## Swagger API definition

https://app.swaggerhub.com/apis/Augi99/UFCWebService/0.3

