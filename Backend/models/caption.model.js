const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const captionSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be atleast 3 characters long']
        },
        lastname:{
            type:String,
            minlength:[3,'Last name must be atleast 3 characters long']
        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be atleast 5 characters long']
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'Password must be atleast 6 characters long']
    },
    socketId:{
        type:String
    },

    status:{
        type:String,
        enum:['active','inactive'],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be atleast 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'Plate must be atleast 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,'Capacity must be atleast 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto'],
        }
    },
    location:{
        ltd:{
            type:Number
        },
        lng:{
            type:Number
        }
    }
    
});


captionSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captionSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

captionSchema.statics.hashPassword=async function(password){  
    return await bcrypt.hash(password,10);
 }

const captionModel=mongoose.model('caption',captionSchema);
module.exports=captionModel;