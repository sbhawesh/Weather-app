const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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

geocode.geocodeAddress(argv.a,(error,results) => {
	if(error)
	{
		console.log(error);
	}
	else{
		console.log(results["address"]);
        weather.getWeather(results["lattitude"],results["longitude"],(error,wResults)=> 
        {
		   if(error)
		   {
		   	console.log(error);
		   }else
		   {
		   	var temperature = (((wResults["temperature"])-32)*5/9).toPrecision(4);
		   	var appTemperature = (((wResults["apparentTemperature"])-32)*5/9).toPrecision(4);


		   	console.log(`current temperature- ${temperature}C`);
		   	console.log(`But feel's like- ${appTemperature}C and ${wResults["summary"]}`);
		   	console.log(`Humidity- ${wResults["humidity"]}`);
		   	console.log(`Timezone- ${wResults["timezone"]}`);
		   }
      });

      }	
 
 });


