const captionModel = require("../models/caption.model");
const captionService = require("../services/caption.service");
const { validationResult, cookie } = require("express-validator");
const blacklisttokenModel = require("../models/blacklisttoken.model");

module.exports.registerUserCaption = async (req, res) => {
    console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } =
    req.body;

    const isCaptionalreadyExists = await captionModel.findOne({ email });
    if (isCaptionalreadyExists) {
      return res
        .status(400)
        .json({ message: "Caption with this email already exists" });
    }

  const hashedPassword = await captionModel.hashPassword(password);
  const caption = await captionService.createCaption({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password: hashedPassword,
    color:vehicle.color,
    plate:vehicle.plate,
    capacity:vehicle.capacity,
    vehicleType:vehicle.vehicleType,
  });
  const token = caption.generateAuthToken();

  res.status(200).json({ token, caption });
};


module.exports.loginCaption = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const caption = await captionModel.findOne({ email }).select('+password');
    if (!caption) {
      return res.status(401).json({ message: "Caption not found" });
    }

    const isPasswordValid = await caption.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = caption.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, caption });
}

module.exports.getCaptionProfile=async (req,res,next)=>{
    res.status(200).json({caption:req.caption});
}

module.exports.logoutCaption=async (req,res,next)=>{
    const token=req.cookies.token|| req.headers.authorization.split(' ')[1] || req.headers['x-access-token'];
    await blacklisttokenModel.create({token});
    res.clearCookie('token');
   
   


    res.status(200).json({message:"Logout successful"});
}
