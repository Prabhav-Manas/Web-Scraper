const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');

const userRoutes=require("./src/routes/userRoutes");
const storyRoutes=require("./src/routes/storyRoutes");
const scrapeRoutes=require("./src/routes/scrapeRoutes");

const app=express();

const corsOptions={
    origin:['http://localhost:5173', 'https://stirring-malabi-0ccc9d.netlify.app', process.env.FRONTEND_URL],
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

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to DB!');
    } catch (error) {
        console.log('Failed to connect to DB:=>', error.message);
        process.exit(1);  // stop server if DB connection fails
    }
};

app.use("/api/auth", userRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/scrape', scrapeRoutes);

module.exports={app, connectDB };