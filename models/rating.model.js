const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"products",
        require:true
    },
    rating:{
        type:Number,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

const Rating = mongoose.model("ratings", ratingSchema);

module.exports = Rating;