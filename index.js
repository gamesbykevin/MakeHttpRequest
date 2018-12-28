const https = require('https')

exports.handler = function(event, context) {
	
	//access server variables
	const customHostname = process.env.HostName;
	const customPath = process.env.Path;
	const connectTimeout = parseInt(process.env.ConnectTimeout);
	const readTimeout = parseInt(process.env.ReadTimeout);
	
	makeRequest(customHostname, customPath, connectTimeout, readTimeout);
};

function makeRequest(customHostname, customPath, connectTimeout, readTimeout) {
    
	console.log("HostName:   " + customHostname);
	console.log("CustomPath: " + customPath);
	console.log("ConnectTimeout: " + connectTimeout);
	console.log("ReadTimeout: " + readTimeout);
    
	const options = {
	  hostname: customHostname,
	  port: 443,
	  timeout: connectTimeout,
	  path: customPath,
	  method: 'GET'
	}

	const req = https.request(options, (res) => {
	  console.log(`statusCode: ${res.statusCode}`)
	  res.on('data', (d) => { process.stdout.write(d) })
	})
	
	//set a read timeout as well so we won't sit and wait for a response
	req.on('socket', function (socket) {
		socket.setTimeout(readTimeout);
		socket.on('timeout', function() { req.abort(); });
	});
	
	//don't do anything on error so lambda will think everything is ok
	req.on('error', (error) => {
		console.log('do nothing - ' + error);
	  //console.error(error)
	})

	req.end()
}
