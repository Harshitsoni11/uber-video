const rideService=require('../services/ride.service');
const {validationResult}=require('express-validator');

module.exports.createRide=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); 
    }

    const {pickup,destination,vehicleType}=req.body;
    try{
        const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType});
       return res.status(200).json(ride);
    }catch(err){
            return res.status(400).json({message:err.message});
    }
   
}


module.exports.getFare=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); 
    }
    console.log(req.query);
    const {pickup,destination}=req.query;
    try{
        const fare=await rideService.getFare(pickup,destination);
        console.log("hello");
       return res.status(200).json(fare);
    }catch(err){
            return res.status(400).json({message:err.message});
    }

}