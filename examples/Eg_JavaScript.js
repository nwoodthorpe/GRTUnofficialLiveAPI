//THIS EXAMPLE FINDS THE NUMBER OF SECONDS UNTIL THE NEXT '60' BUS DEPARTS STOP '1368'.
//CREATED ON VERSION 1.0

var stop = "1368";
var route = "60";

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = JSON.parse(xmlhttp.responseText);
        if(response.ERROR_MESSAGE != undefined){
            //We've had an error
            console.log(response);
            return;
        }else{
            //Successful query, now let's figure out when the next bus comes.
            //First select which route we want
            var selectRoute;
            for(var i = 0; i<response.length; i++){
                if(response[i]["routeId"] == route){
                    selectRoute = response[i];
                    break;
                }

            }

            //If route hasn't been set, route '60' doesn't stop here.
            if(selectRoute == undefined){
                console.log("Route " + route + " doesn't stop at bus stop " + stop);
                return;
            }

            var currentTimeInSeconds = selectRoute.time;

            //To grab the next bus time, we can use the departure on the route object, or the first element of stopDetails
            var nextBusInSeconds = selectRoute.departure;

            if((typeof currentTimeInSeconds) !== 'number' || (typeof nextBusInSeconds) !== 'number'){
                console.log("Couldn't grab current time or next bus time.");
                return;
            }

            console.log("Next bus comes in " + (nextBusInSeconds - currentTimeInSeconds) + " seconds.");
        }
    }
}
xmlhttp.open("GET", "http://nwoodthorpe.com/grt/livetime.php?stop=" + stop, true);
xmlhttp.send();