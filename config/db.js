const mongoose = require("mongoose");
const mongodburi = "mongodb+srv://22314078omkar:JhH3caUfIybh58Av@cluster0.4hwx2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB=()=>{
    return mongoose.connect(mongodburi);
}

module.exports={connectDB}