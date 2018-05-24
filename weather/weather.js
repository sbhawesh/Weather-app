const request = require('request');

var getWeather = (lat,lng,callback)=>{
request({
	url: `https://api.darksky.net/forecast/YOUR API KEY/${lat},${lng}`,
	json:true
},(error,response,body) => {
	if(!error && response.statusCode==200)
	{
		callback(undefined,{
			temperature: body["currently"]["temperature"],
			apparentTemperature:body["currently"]["apparentTemperature"],
			summary: body["currently"]["summary"],
			humidity:body["currently"]["humidity"],
			timezone:body["timezone"]

		});
	}else
	{
		callback("unable to fetch weather");
	}
	

});

};

module.exports.getWeather = getWeather;