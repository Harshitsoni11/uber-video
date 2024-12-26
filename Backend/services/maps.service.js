const axios=require('axios');
const captainModel=require('../models/caption.model');
module.exports.getAddressCoordinate=async(address)=>{
    const ApiKey=process.env.GOOGLE_MAPS_API;
   const url= `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${ApiKey}`;
    try{
        const response=await axios.get(url);
        console.log(response);
        if(response.data.status==='OK'){ 
            const location=response.data.results[0].geometry.location;
            console.log(location,"location");
            return{
                ltd:location.lat,
                lng:location.lng
            };
         }else{
            throw new Error('Unable to fetch coordinates');
        }
    } catch(err){
        throw new Error('Unable to fetch coordinates');
    }
}


module.exports.getDistanceTime=async(origin,destination)=>{
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }
    const apiKey=process.env.GOOGLE_MAPS_API;
    const url=`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try{
        const response=await axios.get(url);
        console.log(response);
        if(response.data.status==='OK'){

            if(response.data.rows[0].elements[0].status=='ZERO_RESULTS'){
                throw new Error('No route found');
            }
            return response.data.rows[0].elements[0];
           
           
        }
        
    }catch(err){
        console.log(err);
        throw err;
    }
}


module.exports.getAutoCompleteSuggestions=async(input)=>{
    if(!input){
        throw new Error('Query is required');
    }
    const apiKey=process.env.GOOGLE_MAPS_API;
    const url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&key=${apiKey}`;
    try{
        const response=await axios.get(url);
        console.log(response);
        if(response.data.status==='OK'){
            return response.data.predictions;
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}


module.exports.getCaptainsInTheRadius=async(ltd,lng,radius)=>{
    const captains=await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 3963.2]
            }
        }
    });
}