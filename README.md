# GRT Unofficial Live API
This API provides developers a way of retrieving up-to-date bus times for their applications. Both scheduled times and actual live times are available.

To prevent abuse, I'll be keeping the backend closed-source for the time being.

See working examples in `examples/`.

Version specific documentation is available in the associated directory.

##How to Use
To make a query, send a GET request to the API URL. The current URL (Version 2.0) is:
`http://nwoodthorpe.com/grt/V2/livetime.php?stop=xxxx`

Replace `xxxx` with a GRT stop ID. Find the stop ID either:

1. On the bus stop sign
2. On the transit schedules located [here](http://www.grt.ca/en/routesSchedules/busschedule.asp).

##Change Log
See CHANGELOG.md

##Response
Server response is in JSON format.

Response will either be an ERROR object or a DATA object. Both types are outlined in the version specific documentation.

##Conclusion
Please don't abuse this API. Every request and the accompanying IP is logged. If I believe an IP is abusing the service, it may be blacklisted.

This API is not affiliated with Grand River Transit or The City of Waterloo in any way. 

Make a pull request if you want to add more examples, or improve/amend the documentation.
