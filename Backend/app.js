const dotdev=require("dotenv");
dotdev.config();
const express=require('express');
const cors=require("cors");
const app=express();
const cookieParser=require("cookie-parser");
const userRoutes=require('./routes/user.routes');
const captionRoutes=require('./routes/caption.routes');
const mapRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');

const connectToDb=require("./db/db");
connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/users',userRoutes);
app.use('/caption',captionRoutes);
app.use('/rides',rideRoutes);
app.use('/maps',mapRoutes);



app.get("/",(req,res)=>{    
    res.send("hello");
})



module.exports=app;

