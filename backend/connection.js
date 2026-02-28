const mongoose = require('mongoose');

// Replace 'YOUR_MONGODB_URL' with your actual MongoDB connection string
// For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/dispensaryDB
// For local MongoDB: mongodb://localhost:27017/dispensaryDB

mongoose.connect(process.env.MONGO_URL)
    .then(res => {
        console.log("DataBase Connected Successfully");
    }).catch(err => {
        console.log(err);
    });
