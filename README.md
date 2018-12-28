# MakeHttpRequest
Make http get request via NodeJS on AWS

Entire scope of this functionality is to make a single get request

This function will allow you to set timeout values, any timeout exception will be caught so your Lambda function appears to finish successful

This is a great solution when you need to invoke a url endpoint and don't need to wait for the response

To test our functionality you need to specify 4 parameters
1) Host name - specify the host name only. example: "api.nasa.gov"
2) Path - the rest of the url goes here. example: "/planetary/apod?api_key=DEMO_KEY"
3) Connect timeout - how long do we wait to connect to the url (in milliseconds) example: "4500"
4) Read timeout - how long after connecting do we wait for the response (in milliseconds example: "500"

Call this function for testing


```node 
makeRequest('api.nasa.gov', '/planetary/apod?api_key=DEMO_KEY', 4500,  500); 
```
