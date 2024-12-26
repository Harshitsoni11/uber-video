const express=require('express');
const router=express.Router();
const {body}=require("express-validator");
const captionController=require("../controllers/caption.controller");
const authMiddleware=require("../middlewares/auth.middleware");

router.post('/register',[body('email').isEmail().withMessage("Email is not valid"),
body('fullname.firstname').isLength({min:3}).withMessage("First name must be atleast 3 characters long"),
body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
body('vehicle.plate').isLength({min:6}).withMessage('Plate must be atleast 3 characters long'),
body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be atleast 1 characters long'),
body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type')

],
captionController.registerUserCaption
);

router.post('/login',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],
captionController.loginCaption)


router.get('/profile',authMiddleware.authCaption,captionController.getCaptionProfile);

router.get('/logout',authMiddleware.authCaption,captionController.logoutCaption);

module.exports=router;