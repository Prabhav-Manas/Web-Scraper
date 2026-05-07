const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();

const corsOptions={
    origin:['http://localhost:5173', process.env.FRONTEND_URL],
    methods:"GET,POST,HEAD,PUT,PATCH,DELETE,OPTIONS",
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin"
    ],
    credentials:true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to DB!');
}).catch((error)=>{
    console.log('Faild to connect to DB!');
})

module.exports=app;