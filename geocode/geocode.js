
const request = require('request');

var geocodeAddress = (address,callback) =>
{
	var encodeAddress = encodeURIComponent(address);

request({
	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
	json:true
},(error,response,body) => {
        // console.log(body);
       //  console.log(JSON.stringify(body["results"],undefined,2));

        if(error)
        {
        	callback("Unable to connect google Server");
        }else if(body["status"]=="ZERO_RESULTS")
             {
             	callback("Unable to find address");
             }
	         else if(body["status"]=="OK")
	         { 

	         	 callback(undefined,{
	         	 	address: body["results"][0]["formatted_address"],
	         	 	lattitude: body["results"][0]["geometry"]["location"]["lat"],
	         	 	longitude: body["results"][0]["geometry"]["location"]["lng"]

	         	 });
		         
	         }
	         else if(body["status"]=="OVER_QUERY_LIMIT")
	         {
	         	 callback("Your query limit exceed");
	         }
});

};


module.exports.geocodeAddress = geocodeAddress;



