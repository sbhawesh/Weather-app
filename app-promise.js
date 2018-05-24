const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
.option({
	a:{
		demand:true,
		alias:'address',
		describe:'Address to fetch weather for!',
		string:true
	}
})
.help()
.alias('help','h')
.argv;

 var encodedAddress = encodeURIComponent(argv.address);
 var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

 axios.get(geocodeUrl).then((response) => {
 	if(response["data"]["status"]=='ZERO_RESULTS'){
 		throw new Error('Unable to find that address.');
 	}else if(response["data"]["status"]=='OVER_QUERY_LIMIT')
 	{
 		throw new Error("your query limit exceed");
 	}

    var lat = response["data"]["results"][0]["geometry"]["location"]["lat"];
    var lng = response["data"]["results"][0]["geometry"]["location"]["lng"];

    var weatherUrl = `https://api.darksky.net/forecast/YOUR API KEY/${lat},${lng}`;
	console.log(response["data"]["results"][0]["formatted_address"]);
	return axios.get(weatherUrl);
 }).then((response) => {
 	var temperature = response["data"]["currently"]["temperature"];
    console.log(`temperature is : ${temperature}`);

 }).catch((e) => {
 	if(e.code=='ENOTFOUND'){
 		console.log("Unable to connect API server");
 	}
 	else{
 		console.log(e.message);
 	}
 });

