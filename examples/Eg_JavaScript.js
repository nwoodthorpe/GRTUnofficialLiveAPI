var stop = "1368";

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = xmlhttp.responseText;
        if(xmlhttp.responseText.ERROR_MESSAGE != undefined){
            //Our query had an error
        }else{
            //Our query succeeded.
        }
    }
}
xmlhttp.open("GET", "http://nwoodthorpe.com/grt/livetime.php?stop=" + stop, true);
xmlhttp.send();