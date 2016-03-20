# GRT Unofficial Live API
This API provides developers a way of retrieving up-to-date bus times for their applications. Both scheduled times and actual live times are available.

To prevent abuse, I'll be keeping the backend closed-source for the time being.

See working examples in `examples/`.

##How to Use
To make a query, send a GET request to the following URL:

`http://nwoodthorpe.com/grt/livetime.php?stop=xxxx`

Replace `xxxx` with a GRT stop ID. Find the stop ID either:

1. On the bus stop sign
2. On the transit schedules located [here](http://www.grt.ca/en/routesSchedules/busschedule.asp).

##Response
Server response is in JSON format.

Response will either be an ERROR object or a DATA object. Both types are fully documented below.

##Full Documentation

###Parameters
**stop**

GRT Stop ID.

Must be a valid ID. Error returned if ID is invalid or if no stop with ID exists.

Examples:

`http://nwoodthorpe.com/grt/livetime.php?stop=1368` -> VALID

`http://nwoodthorpe.com/grt/livetime.php?stop=1` -> ERROR: Stop does not exist

`http://nwoodthorpe.com/grt/livetime.php?stop="1368"` -> ERROR: Malformed stop ID

`http://nwoodthorpe.com/grt/livetime.php?stop=hello` -> ERROR: Malformed stop ID

###Server Response

**DATA Object**

Returned when query was successful.

JSON object with the following structure:

```javascript
Array[ //Each element represents one route that visits this stop
  "routeId" //String denoting what bus route this is. E.g. "200"
  "stopId" //String denoting what bus stop ID this is. E.g. "1368"
  "stopDisplayId" //String denoting the display ID for this bus stop. Usually identical to stopId
  "stopLatitude" //Floating point representing bus stop latitude
  "stopLongitude" //Floating point representing bus stop longitude
  "stopHeadsign" //String representing display name of bus stop. Usually null if not a terminal stop
  "id" //String denoting some sort of ID. Let me know if you know more about this.
  "stop" //String of human-readable description of stop. E.g. "University / King"
  "name" //String of human-readable description of route. E.g. "60 Northview Acres"
  "name_long" //Not sure what this is for. Often null.
   Array "stopDetails" //Array, each element represents a bus
    "departure" //integer LIVE time when bus will arrive at stop, denoted in seconds since midnight. E.g. 81613
    "departureNonRealTime" //Time the bus is scheduled to arrive at stop in seconds since midnight. E.g. 81600
    "hasRealTime" //boolean, true if real time is available. If false, "departure" == "departureNonRealTime"
    "predicted" //boolean, don't know what this means.
    "tripId" //String, Unique ID for every bus trip
    "originalStopId" //Always null as far as I know
    "stopId" //Same as above stopId
    "stopDisplayId" //Same as stopId
    "headsign" //String, What is displayed on bus overhead display. E.g. "60 Northview Acres"
    "routeName" //String, denotes route name E.g. "Northview Acres"
  "distance" //Distance user is from bus stop. Currently unusable as user position is set internally.
  "time" //Current time in seconds since midnight
  "departure" //int, When next bus will arrive in seconds since midnight, LIVE time if below is true
  "hasRealTime" //"departure" is a live time if true
  "predicted" //boolean, don't know
```

Example:

```javascript
[{"routeId":"60",
"stopId":"1368",
"stopDisplayId":"1368",
"stopLatitude":43.3841743,
"stopLongitude":-80.29449,
"stopHeadsign":null,
"id":"131512552",
"stop":"Cowan \/ Wallace",
"name":"60 Northview Acres",
"name_long":null,
"stopDetails":[
  {"departure":81613,
  "departureNonRealTime":81600,
  "hasRealTime":true,
  "predicted":false,
  "tripId":"131512552",
  "originalStopId":null,
  "stopId":"1368",
  "stopDisplayId":"1368",
  "headsign":"60 Northview Acres",
  "routeName":"Northview Acres"
  },{
  "departure":85200,
  "departureNonRealTime":85200,
  "hasRealTime":false,
  "predicted":false,"tripId":"131512452",
  "originalStopId":null,
  "stopId":"1368",
  "stopDisplayId":"1368",
  "headsign":"60 Northview Acres",
  "routeName":"Northview Acres"}],
"distance":16396,
"time":79115,
"departure":81613,
"hasRealTime":true,
"predicted":false}]
```

**ERROR Object**

If an error is thrown, an object will be returned of the following form:

```javascript
{"ERROR_CODE" //integer error code
 "ERROR_MESSAGE" //String describing error
 }
 ```
 
 Currently there are two different error codes:
 
 22 -> "Stop ID formatted incorrectly."
 
 23 -> "Stop ID doesn't exist"
  
##Conclusion
Please don't abuse this API. Every request and the accompanying IP is logged. If I believe an IP is abusing the service, it may be blacklisted.

This API is not affiliated with Grand River Transit or The City of Waterloo in any way. 
